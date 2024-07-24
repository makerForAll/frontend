<template>
    <!-- 按钮 -->
    <a-button type="link" @click="showDrawer"> {{ action }}{{ entityType }} </a-button>
   
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
  
  // -----------------  抽屉功能 自身需要的基本功能 ---------------------------------
  const props = defineProps<{
    entityType: string,              // 案例：客户信息  ，作用：作为title标识
    action: string,                   // 案例： 创建  ，作用：作为title标识
    modelValue: Record<string, any> , // 获取从 diy.vue 传递来的 form数据 
    fields: Array<Field>,
    // rules: Record<string, Rule[]> ,   // 表单规则
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
  // ----  测试区域
  
  
  </script>
  
  
  
  <style scoped></style>
  