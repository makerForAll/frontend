<template>
  <div>
      <DrawerSlotView 
      :action="'录入'"
      :entityType="'客户信息'"
      v-model="clientStore.data.item" 
      :fields="clientFields" 
      :rules="rules" 
      @handleSubmit="handleSubmit"
      @fieldChange="fieldChange"
      @showDrawer="showDrawer"
      >
      </DrawerSlotView>
  </div>
</template>

<script setup lang="ts">
// diy.vue  -> CreateClient


import type { APIforBackEnd } from '@/api';
import DrawerSlotView from '@/cp-v1/cp-GCP/Drawer/DrawerSlot4.vue'
import { useClientStore } from '@/stores/client';
import type { Rule } from 'ant-design-vue/es/form';
import type {Field} from '@/cp-v1/cp-GCP/Drawer/DrawerSlot4.vue';
import type { Dayjs } from 'dayjs';
import { onMounted, reactive, toRaw } from 'vue';
// import {ClientBackEndDTO} from '@/api'
// import { reactive } from 'vue';
// ----------------------------
// const clientForm = reactive({...initClientForm})

// --------------------------  表单配置 ------------------------------------------------------------------------------

const clientFields:Field[] = [
  { name: 'name', label: '乙方', component: 'a-input', props: { placeholder: '请输入乙方名称' } },
  { name: 'contact', label: '联系人', component: 'a-input', props: { placeholder: '请输入联系人名称' } },
  { name: 'phonenumber', label: '联系人号码', component: 'a-input', props: { placeholder: '请输入联系人号码' } },
  { name: 'emergencycontact', label: '紧急联系人', component: 'a-input', props: { placeholder: '请输入紧急联系人名称' } },
  { name: 'emergencycontactphone', label: '紧急联系人号码', component: 'a-input', props: { placeholder: '请输入紧急联系人号码' } },
  { name: 'marks', label: '备注', component: 'a-input', props: { placeholder: '请输入备注信息' }, },
  { name: 'createdAt', label: '注册时间', component: 'a-date-picker', props: { placeholder: '请输入备注信息',disabled:true},},
  // 其他字段可以按需添加
];

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入正确的名称' }],
  contact: [{ required: false, message: '请输入号码' }],
  phonenumber: [{ required: false, message: '请输入正确的名称' }],
  emergencycontact: [{ required: false, message: '请输入正确的名称' }],
  emergencycontactphone:[{ required: false, message: '请输入号码' }],
  marks: [{ required: false, message: '请输入备注信息' }],
  createdAt: [{ required: false, message: '请输入备注信息' }],
  // 其他字段的验证规则可以按需添加
};

// --------------------------  表单配置 ------------------------------------------------------------------------------

// -------------------------------------  pinia层 数据交互 -------------------------------------------------------------------
const clientStore = useClientStore();

// onMounted(()=>{
//   clientStore.initStateItem();
// })

const handleSubmit = async (form: APIforBackEnd) =>{
  console.log("form:-----------",form);
  // console.log("form:-----------",form.name);
  // console.log("form:-----------",form.createdAt.toISOString());
  // form.createdAt
 await clientStore.create(form);
//  await clientData.; // 初始化表单
}
reactive

const showDrawer = async() => { // 重置form
  // clientStore.initStateItem();
  // await clientStore.initCreateState();
  // await clientStore.addTodayTime(clientStore.clientData.item);
}

const fieldChange = async (form:any) =>{
  // console.log("form123:",form);
  // clientStore.clientData.item = form;
  // console.log("state:",clientStore.clientData.item);
}


// -------------------------------------  pinia层 数据交互 -------------------------------------------------------------------
</script>


<style scoped>
</style>