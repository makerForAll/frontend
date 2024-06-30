<template>
  <!-- 按钮 -->
  <a-button type="link" @click="showDrawer"> {{ action }}{{ entityType }} </a-button>
  <!-- 抽屉 -->
  <a-drawer
    v-if="isDelete"
    title="Drawer"
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
      123
      <a-row :gutter="24">
        <template v-for="field in fields" :key="field.name">
          <a-col :span="field.span || 24">
            <a-form-item :label="field.label" :name="field.name">
              <component
                :is="field.component"
                v-model:value="internalForm[field.name]"
                v-bind="field.props"
              >
                <!-- a-select begin -->
                <!-- 确保只有 Select 组件才有 Option 子组件 -->
              <template v-if="field.component === 'a-select'">
                <a-select-option v-for="option in field.props?.options" :key="option.value" :value="option.value">
                  {{ option.label }}
                </a-select-option>
              </template>
                <!-- a-select end -->
              </component>
            </a-form-item>
          </a-col>
        </template>
      </a-row>
      {{ modelValue }}
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
import { PlusOutlined } from '@ant-design/icons-vue/'
import { reactive, ref, watch } from 'vue'
import { initClientForm } from '@/api/client'
import dayjs from 'dayjs'  // 引入 dayjs
// import {useCPStore} from '@/stores/cp'
// const cpStore = useCPStore();

const isOpen = ref<boolean>(false)
const isDelete = ref<boolean>(!false)

const props = defineProps<{
  entityType: string;
  action: string;
  modelValue: Record<string, any>;
  fields: Array<{
    name: string;
    label: string;
    component: string;
    props?: {
      placeholder?: string;
      options?: Array<{ value: string; label: string }>; // 修改这里的类型
      disabled?: boolean;
    };
    span?: number;
  }>;
  rules: Record<string, Rule[]>;
  type: string;
}>();

// const props = defineProps({
//   entityType: String,
//   action: String,
//   modelValue: Object,
//   fields: Array,
//   rules: Object,
//   type: String,
// });

// const props = defineProps({
//   entityType: String,
//   action: String,
//   modelValue: Object,
//   fields: Array,
//   rules: Object,
//   type: String,
// });

let internalForm = reactive({ ...props.modelValue })

const emit = defineEmits(['handleSubmit', 'showDrawer'])

// 监听 props.modelValue 的变化

watch(
  () => props.modelValue,
  (newValue) => {
    for (const key in newValue) {
      internalForm[key] = newValue[key]
    }
    console.log('internalForm watch--------------------------:', internalForm)
  },
  { deep: true ,
    // immediate: true
  } // 深度监听
)

const showDrawer = async () => {
  // console.log(props.fields);

  await resetForm()
  emit('showDrawer')
  // await cpStore.openDrawer();
  isOpen.value = true
  isDelete.value = !false
}

const deleteDrawer = () => {
  if (isOpen.value == false) {
    isDelete.value = !true
  }
}

const closeDrawer = async () => {
  isOpen.value = false
  // await cpStore.closeDrawer();
  deleteDrawer()
}

const handleSubmit = () => {
  emit('handleSubmit', internalForm)
  closeDrawer()
}

const resetForm = async () => {
  await Object.assign(internalForm, initClientForm)
  // internalForm = reactive({...initClientForm})
}
</script>

<style scoped></style>
