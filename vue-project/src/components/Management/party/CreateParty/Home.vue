<template>
    <div>
         <a-button type="primary" @click="showModal">甲方创建</a-button>
         <a-modal v-model:open="open" title="创建合同" ok-text="创建" cancel-text="取消" @ok="onOk">
             <a-form ref="formRef" :model="formState" layout="vertical" name="form_in_modal">
              
                 <a-form-item name="name" label="甲方名称" :rules="[{ required: true, message: 'Please input your username!' }]">
                  {{ formState.name }}
                     <a-input v-model:value="formState.name" />
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
 import { type FormInstance, message } from 'ant-design-vue';  
 import request from '@/utils/request' // 请求
 
//  import type { PartyType } from '@/types'; // 类型
//  import type { PartyType } from '@/types'; // 类型
import type { FrontEndPartyType } from '@/api/party'; 
import { usePartyStore } from '@/stores/party'

 // 定义响应式变量和引用
 const formRef = ref();
 const open = ref(false);
 const getRadioValue = ref(0);
 const ChangeCanUseArr = ref<any[]>([]);
 
 const partyStore = usePartyStore();
 

 const formState = reactive<FrontEndPartyType>({
   // _id: '',
   name: '',
 });
 
 // 方法定义
 const onOk = () => {
  formRef.value
    .validate()
    .then(async() => {
      // console.log('values', formState, toRaw(formState));
      await partyStore.createParty(formState);
      open.value = false;
      formState.name = '';
    })
    .catch((_error: any) =>{
      console.log("验证错误失败");
    });
 };
 
 // const useCreateNameFun = (name: string) => {
 //   console.log("ChangeCanUseArr.value", ChangeCanUseArr.value);
 //   const filteredArr = ChangeCanUseArr.value
 //     .filter(obj => obj.contractCode.slice(0, 6) === name)
 //     .map(obj => {
 //       const num = parseInt(obj.contractCode.slice(6));
 //       return { ...obj, num };
 //     })
 //     .sort((a, b) => a.num - b.num);
 
 //   const nextNum = filteredArr[filteredArr.length - 1]?.num + 1 || 1;
 //   const nextContractCode = `${name}${nextNum.toString().padStart(2, '0')}`;
 // };
 
 // const btnClickFun = () => {
 //   visible.value = true;
 //   request({
 //     method: 'get',
 //     url: '/contracts/',
 //     params: {
 //       current: 1,
 //       pageSize: 999
 //     }
 //   }).then(res => {
 //     console.log("res.data", res.data);
 //     ChangeCanUseArr.value = res?.data?.results;
 //   });
 // };
 
 const showModal = () => {
  open.value = true;
 };
 
 </script>
 <style>
 .collection-create-form_last-form-item {
     margin-bottom: 0;
 }
 </style>
 