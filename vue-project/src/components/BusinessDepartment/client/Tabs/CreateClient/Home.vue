<template>
    <div>
         <a-button type="primary" @click="showModal">录入来访客户信息</a-button>
         <a-modal v-model:open="open" title="创建客户信息" ok-text="创建" cancel-text="取消" @ok="onOk">
             <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
              
                 <a-form-item name="name" label="客户名称" :rules="[{ required: true, message: 'Please input your username!' }]">
                  {{ formState.name }}
                     <a-input v-model:value="formState.name" />
                 </a-form-item>
                 <a-form-item name="phonenumber" label="电话号码" :rules="[{ required: true, message: 'Please input your number!' }]">
                  {{ formState.name }}
                     <a-input v-model:value="formState.phonenumber" />
                 </a-form-item>
                 <a-form-item name="marks" label="备注" :rules="[{ required: true, message: 'Please input your marks' }]">
                  {{ formState.marks }}
                     <a-input v-model:value="formState.marks" />
                 </a-form-item>
             </a-form>
         </a-modal>
     </div>
 </template>
 <script setup lang="ts">
 import { reactive, ref, toRaw} from 'vue';
 
import type { FrontEndClientType } from '@/api/client'; 
import { useClientStore } from '@/stores/client'

 // 定义响应式变量和引用
 const formRef = ref();
 const open = ref(false);
 const getRadioValue = ref(0);
 const ChangeCanUseArr = ref<any[]>([]);
 
 const clientStore = useClientStore();
 

 const formState = reactive<FrontEndClientType>({
   name: ''
 });
 
 // 方法定义
 const onOk = () => {
  formRef.value
    .validate()
    .then(async() => {
      // ----------------------------------------------
      await clientStore.create(formState);

      open.value = false;
      formState.name = '';
    })
    .catch((_error: any) =>{
      console.log("验证错误失败");
    });
 };
 
 const showModal = () => {
  open.value = true;
 };
 
 </script>
 <style>
 .collection-create-form_last-form-item {
     margin-bottom: 0;
 }
 </style>
 