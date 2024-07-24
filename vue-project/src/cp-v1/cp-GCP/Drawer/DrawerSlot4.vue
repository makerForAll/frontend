<template>
  <!-- 按钮 -->
  <a-button type="link" @click="showDrawer"> {{ action }}{{ entityType }} </a-button>
  <!-- 抽屉 -->
  <a-drawer
    v-if="isDelete"
    :title="action+entityType"
    :width="720"
    :open="isOpen"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="closeDrawer"
    @AfterOpenChange="deleteDrawer"
  >
    <!-- 尝试组件 -->
    <!-- {{ form }} -->
    <a-form :model="internalForm" :rules="rules" layout="vertical">
      <a-row :gutter="24">
        <template v-for="(field) in fields" :key="`${field.name}`">
          <a-col :span="field.span || 24">
            <a-form-item :label="field.label" :name="`${field.name}`" :for="`${field.name}`" :style="field?.props?.style">
               <!-- input 组件 -->
              <template v-if="field.component === 'a-input'">
                <a-input :id="`form_item_${field.name}`" :name="`form_item_${field.name}`" @input="fieldChange" @change="fieldChange" v-model:value="internalForm[field.name]" v-bind="field.props" />
              </template>
              <!-- input 组件  数字相关处理-->
              <template v-else-if="field.component === 'a-input-number'">
                <a-input-number :id="`form_item_${field.name}`" :name="`form_item_${field.name}`"  @input="fieldChange" @change="fieldChange" v-model:value="internalForm[field.name]" v-bind="field.props"/>
                <!-- <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" /> -->
              </template>
         
                 <!-- input 组件  动态 字段添加-->
                 <!-- <template v-else-if="field.component === 'a-input-dynamic'">
                <a-input @input="fieldChange" @change="fieldChange" v-model:value="internalForm[field.name]" v-bind="field.props"/>
                <a-input-number id="inputNumber" v-model:value="value" :min="1" :max="10" />
              </template> -->
              <!-- ------a-input-dynami ------------------------------------------------------ -->
              <!-- <template v-else-if="field.component === 'a-input-dynamic'">
                
                <template v-for="(domain,key) in internalForm.dynamic_field" :key="`${field.name}_${key}`">
                  {{ domain }}
                  <a-input
                    :id="`${field.name}_${key}`"
                    :name="`${field.name}_${key}`"
                    v-model:value="internalForm[field.name][key].name"
                    placeholder="name"
                    style="width: 30%; margin-right: 8px"
                    @input="fieldChange"
                    @change="fieldChange"
                  />
                  <a-input-number
                    :id="`${field.name}_${key}`"
                    :name="`${field.name}_${key}`"
                    v-model:value="internalForm[field.name][key].area"
                    placeholder="area"
                    style="width: 30%; margin-right: 8px"
                    @input="fieldChange"
                    @change="fieldChange"
                  />
                  <a-input-number
                    :id="`${field.name}_${key}`"
                    :name="`${field.name}_${key}`"
                    v-model:value="internalForm[field.name][key].price"
                    placeholder="price"
                    style="width: 30%; margin-right: 8px"
                    @input="fieldChange"
                    @change="fieldChange"
                  />
                  <MinusCircleOutlined
                    v-if="internalForm.dynamic_field!.length > 1"
                    class="dynamic-delete-button"
                    @click="removeDomain(domain)"
                  />
                </template>
                <a-button type="dashed" style="width: 100%" @click="addDomain(field.name)">
                  <PlusOutlined />
                  添加字段
                </a-button>
              </template> -->
                <!-- ------a-input-dynami ------------------------------------------------------ -->  <!-- ------a-input-dynami ------------------------------------------------------ -->
              <!-- Select 组件 -->
              <template v-else-if="field.component === 'a-select'">
                <a-select :id="`form_item_${field.name}`" :name="`form_item_${field.name}`" v-model:value="internalForm[field.name]" v-bind="field.props">
                  <a-select-option
                    v-for="option in field.props?.options_str"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>
              </template>

              <template v-else-if="field.component === 'a-select-number'">
                <a-select :id="`form_item_${field.name}`" :name="`form_item_${field.name}`" v-model:value="internalForm[field.name]" v-bind="field.props">
                  <a-select-option
                    v-for="option in field.props?.options_num"
                    :key="option.value"
                    :value="option.value"
                  >
                    {{ option.label }}
                  </a-select-option>
                </a-select>
              </template>

              <!-- Switch 组件 -->
              <template v-else-if="field.component === 'a-switch'">
                <a-switch :id="`form_item_${field.name}`" :name="`form_item_${field.name}`"  v-model:checked="internalForm[field.name]" v-bind="field.props" />
              </template>

              <template v-else-if="field.component === 'a-range-picker'">
               
               <a-space direction="vertical" :size="12">
              
                <a-range-picker :id="`form_item_${field.name}`" :name="`form_item_${field.name}`" v-model:value="internalForm[field.name]" :presets="rangePresets" @calendarChange="onRangeChange"/>
              </a-space>
                
                  <!-- <span>总天数：{{ totalDays }} 天</span> -->
              </template>

              <template v-else-if="field.component === 'a-date-picker'">
                <a-date-picker :id="`form_item_${field.name}`" :name="`form_item_${field.name}`" v-model:value="internalForm[field.name]" v-bind="field.props" @change="getFun"/>
                  <!-- <p>总天数：{{ dayjs(internalForm[field.name]) }} 天</p> -->
                  <p>总天数：{{ internalForm[field.name]}}天</p>
              </template>
              <template v-else-if="field.component === 'forInput'">
                <!-- <a-divider style="height: 10px;border-color: #7cb305" dashed>{{ field.name }}</a-divider> -->
                <!-- <a-divider  /> -->
                <!-- <a-input :id="`form_item_${field.name}`" :name="`form_item_${field.name}`" @input="fieldChange" @change="fieldChange" v-model:value="internalForm[field.name]" v-bind="field.props" /> -->
                <input>
              </template>
              <template v-else-if="field.component === 'hr'">
                <a-divider style="height: 10px;border-color: #7cb305" dashed>{{ field.name }}</a-divider>
                <!-- <a-divider  /> -->
              </template>
              <!-- <template v-else>
                <component
                  :is="field.component"
                  v-model="internalForm[field.name]"
                  v-bind="field.props"
                />
              </template> -->
            </a-form-item>
            <!-- <hr> -->
            <!-- <a-divider style="border-color: #7cb305" dashed /> -->
          </a-col>
        </template>
      </a-row>
      {{ internalForm }}
    </a-form>

    <!-- 操作区域 -->
    <template #extra>
      <a-space>
        <a-button @click="closeDrawer">关闭</a-button>
        <a-button type="primary" @click="handleSubmit">提交</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>

<script setup lang="ts">
import type { Rule } from 'ant-design-vue/es/form'
// import { PlusOutlined } from '@ant-design/icons-vue/'
import { reactive, ref, toRaw, watch, type PropType } from 'vue'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons-vue';
// import dayjs from 'dayjs' // 引入 dayjs
// import {useCPStore} from '@/stores/cp'
// const cpStore = useCPStore();




// ----------- 汉化??? -------------------
import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs, {type Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
// import type { Plan } from '@/api/services/plan';

// import type{CreatePlanDTO, DynamicField} from '@/generated/api';
dayjs.locale('cn');
// ----

const getFun = async() =>{
  console.log("value:",internalForm);
}

// ----- a-date-picker 组件的功能 -------
type RangeValue = [Dayjs, Dayjs];

const totalDays = ref(0);
// const state = ref(''); // 状态 【明确用户交换状态】

const arrRange = [
      { label: '1年', value: [dayjs(),dayjs().add(1, 'y')] },
      { label: '2年', value: [dayjs(),dayjs().add(2, 'y')] },
      { label: '3年', value: [dayjs(),dayjs().add(3, 'y')] },
      { label: '4年', value: [dayjs(),dayjs().add(4, 'y')] },
      { label: '5年', value: [dayjs(),dayjs().add(5, 'y')] },
      { label: '6年', value: [dayjs(),dayjs().add(6, 'y')] },
      { label: '7年', value: [dayjs(),dayjs().add(7, 'y')] },
      { label: '8年', value: [dayjs(),dayjs().add(8, 'y')] },
      { label: '9年', value: [dayjs(),dayjs().add(9, 'y')] },
      { label: '10年', value: [dayjs(),dayjs().add(10, 'y')] },
      { label: '11年', value: [dayjs(),dayjs().add(11, 'y')] },
      { label: '12年', value: [dayjs(),dayjs().add(12, 'y')] },
    ]
const rangePresets = ref(arrRange);

const onRangeChange = async(dates: RangeValue|null, dateStrings: string[]) => {
  // 重置
  // Object.assign(rangePresets.value,arrRange);
  // console.log("dates:",dates);
  // console.log("dayjs:",dayjs());
  if (dates && dates[0]) {
    // console.log("dates内");
     // --- 打印 多少天，日期范围
     if(dates[0]&&dates[1] == null){
      console.log("只有1个数据");
        const startDate = dates[0];
        const newArrRange = [
          { label: '1年', value: [startDate,startDate.add(1, 'y').subtract(1,'d')] },
          { label: '2年', value: [startDate,startDate.add(2, 'y').subtract(1,'d')] },
          { label: '3年', value: [startDate,startDate.add(3, 'y').subtract(1,'d')] },
          { label: '4年', value: [startDate,startDate.add(4, 'y').subtract(1,'d')] },
          { label: '5年', value: [startDate,startDate.add(5, 'y').subtract(1,'d')] },
          { label: '6年', value: [startDate,startDate.add(6, 'y').subtract(1,'d')] },
          { label: '7年', value: [startDate,startDate.add(7, 'y').subtract(1,'d')] },
          { label: '8年', value: [startDate,startDate.add(8, 'y').subtract(1,'d')] },
          { label: '9年', value: [startDate,startDate.add(9, 'y').subtract(1,'d')] },
          { label: '10年', value: [startDate,startDate.add(10, 'y').subtract(1,'d')] },
          { label: '11年', value: [startDate,startDate.add(11, 'y').subtract(1,'d')] },
          { label: '12年', value: [startDate,startDate.add(12, 'y').subtract(1,'d')] },
        ]
        // --  覆盖操作  --
        Object.assign(rangePresets.value,newArrRange);
     }
     if(dates[1]){
      totalDays.value = dates[1].diff(dates[0], 'day');
      
      // 存入 表单中
      internalForm.contract_duration_days = dates[1].diff(dates[0], 'day');
     }
    console.log('From: ', dateStrings[0], ', to: ', dateStrings[1]);
    // console.log("");
    
  } else {
    console.log("dates外");
    // --- 重置 展示的天数
    totalDays.value = 0;
    Object.assign(rangePresets.value,arrRange);
  }
};
// ---------------------- a-date-picker 组件的功能   -----------------------------

export type Field = {                  // 表单 配置信息
    name: string, 
    label?: string,
    type?: string,
    component: string,
    props?: {
      placeholder?: string,
      options_str?: Array<{ value: string; label: string }>, // 修改这里的类型
      options_num?: Array<{ value: number; label: string }>, // 修改这里的类型
      addonAfter?:string,
      disabled?: boolean,
      style?: {}
    },
    span?: number                  // 空间划分
  };

// -----------------  抽屉功能 自身需要的基本功能 ---------------------------------
const props = defineProps<{
  entityType: string,              // 案例：客户信息  ，作用：作为title标识
  action: string,                   // 案例： 创建  ，作用：作为title标识
  modelValue: Record<string, any> , // 获取从 diy.vue 传递来的 form数据 
  fields?: Array<Field>,
  rules?: Record<string, Rule[]> ,   // 表单规则
}>()



let internalForm = reactive<any>({...props.modelValue})

const isOpen = ref<boolean>(false)
const isDelete = ref<boolean>(!false)


// 监听 props.modelValue 的变化

watch(
  () => props.modelValue,
  (newValue) => {
    // for (const key in newValue) {
    //   internalForm[key] = newValue[key]
    // }
    // Object.assign()
    Object.assign(internalForm, newValue);
    console.log('internalForm watch--------------------------:', internalForm)
  },
  {
    deep: true,
    // immediate: true
  } // 深度监听
)


const deleteDrawer = () => {
  if (isOpen.value == false) {
    isDelete.value = !true
  }
}

const closeDrawer = async () => {
  isOpen.value = false
  deleteDrawer()
}

// ------------------------  触发 --------------------------------------------------

const emit = defineEmits(['handleSubmit', 'showDrawer','fieldChange'])

const showDrawer = async () => {
  // await resetForm()
  emit('showDrawer')
  isOpen.value = true
  isDelete.value = !false
  // internalForm
}

const handleSubmit = () => { // 提交到 diy.vue来 进行 数据库互动。  // Create / Update
  emit('handleSubmit', internalForm)
  closeDrawer()
}

const fieldChange = () => { // input相关 表单 每次 @input时都会触发它，来更新本地的pinia数据。
  emit('fieldChange', internalForm);
};
// ---------- 动态表单 -------------
interface Domain {
  value: string;
  key: number;
}

const dynamicValidateForm = reactive<{ domains: Domain[] }>({
  domains: [],
});

const removeDomain = (item: Domain) => {
  const index = dynamicValidateForm.domains.indexOf(item);
  if (index !== -1) {
    dynamicValidateForm.domains.splice(index, 1);
  }
};
const addDomain = (fieldname: string | number) => {
  console.log("fieldname:",fieldname);
  internalForm[fieldname] = [];
  internalForm[fieldname].push({
    name: '',
    area:0,
    price:0,
  });
};
// ----  支付明细内容



</script>



<style scoped></style>
