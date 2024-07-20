
<template>
    <div>
        <DrawerSlotView 
        :action="'录入'"
        :entityType="'客户信息'"
        v-model="clientForm" 
        :fields="clientFields" 
        :rules="rules" 
        @handleSubmit="handleSubmit"
        @fieldChange="fieldChange">
        </DrawerSlotView>
    </div>
</template>
<script setup lang="ts">
import DrawerSlotView from '@/cp-v1/cp-GCP/Drawer/DrawerSlot4.vue'
import { useClientStore } from '@/stores/client';
import type { Rule } from 'ant-design-vue/es/form';
import { reactive } from 'vue';
// import {initClientForm} from '@/api/services/client';
// ----------------------------
const clientForm = reactive({...initClientForm})

const clientFields = [
  { name: 'name', label: 'Client Name', component: 'a-input', props: { placeholder: 'Enter client name' } },
  { name: 'phonenumber', label: 'Phone Number', component: 'a-input', props: { placeholder: 'Enter phone number' } },
  // 其他字段可以按需添加
];

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter client name' }],
  phonenumber: [{ required: true, message: 'Please enter phone number' }],
  // 其他字段的验证规则可以按需添加
};


// --------------------------------------
const clientStore = useClientStore();

const handleSubmit = async (form: any) =>{ // Create / Update
 await clientStore.create(form);
}

const fieldChange = async (form:any) =>{
  console.log("form:",form);
  
}
</script>
<style scoped>
</style>