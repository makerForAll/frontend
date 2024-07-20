<script setup lang="ts">
// diy.vue  -> CreateClient


import DrawerSlotView from '@/cp-v1/cp-GCP/Drawer/DrawerSlot4.vue'
import { useClientStore } from '@/stores/client';
import type { Rule } from 'ant-design-vue/es/form';
// import { reactive } from 'vue';

// ----------------------------
// const clientForm = reactive({...initClientForm})

// --------------------------  表单配置 ------------------------------------------------------------------------------

const clientFields = [
  { name: 'name', label: '乙方', component: 'a-input', props: { placeholder: '请输入乙方名称' } },
  { name: 'contact', label: '联系人', component: 'a-input', props: { placeholder: '请输入联系人名称' } },
  { name: 'phonenumber', label: '联系人号码', component: 'a-input', props: { placeholder: '请输入联系人号码' } },
  { name: 'emergencycontact', label: '紧急联系人', component: 'a-input', props: { placeholder: '请输入紧急联系人名称' } },
  { name: 'emergencycontactphone', label: '紧急联系人号码', component: 'a-input', props: { placeholder: '请输入紧急联系人号码' } },
  { name: 'marks', label: '备注', component: 'a-input', props: { placeholder: '请输入备注信息' ,disabled:true}, },
  // 其他字段可以按需添加
];

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: '请输入正确的名称' }],
  contact: [{ required: true, message: '请输入号码' }],
  phonenumber: [{ required: true, message: '请输入正确的名称' }],
  emergencycontact: [{ required: false, message: '请输入正确的名称' }],
  emergencycontactphone:[{ required: false, message: '请输入号码' }],
  marks: [{ required: false, message: '请输入备注信息' }],
  // 其他字段的验证规则可以按需添加
};

// --------------------------  表单配置 ------------------------------------------------------------------------------

// -------------------------------------  pinia层 数据交互 -------------------------------------------------------------------
const clientStore = useClientStore();

const handleSubmit = async (form: any) =>{
 await clientStore.create(form);
}

const showDrawer = async() => { // 重置form
  // await clientStore.initCreateState();
}

const fieldChange = async (form:any) =>{
  console.log("form123:",form);
  clientStore.createState.item = form;
  console.log("state:",clientStore.createState.item);
}


// -------------------------------------  pinia层 数据交互 -------------------------------------------------------------------
</script>
<template>
    <div>
        <DrawerSlotView 
        :action="'录入'"
        :entityType="'客户信息'"
        v-model="clientStore.createState.item" 
        :fields="clientFields" 
        :rules="rules" 
        @handleSubmit="handleSubmit"
        @fieldChange="fieldChange"
        @showDrawer="showDrawer"
        >
        </DrawerSlotView>
    </div>
</template>

<style scoped>
</style>