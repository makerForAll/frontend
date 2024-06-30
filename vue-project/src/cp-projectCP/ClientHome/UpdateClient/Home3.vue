<template>
        <DrawerSlotView
        :action="'更新'"
        :entityType="''"
        :type="'update'"
        v-model="clientForm" 
        :fields="clientFields" 
        :rules="rules" 
        @handleSubmit="handleSubmit"
        @showDrawer="showDrawer"
        >
        </DrawerSlotView>
</template>

<script setup lang="ts">
import DrawerSlotView from '@/cp-v1/cp-GCP/Drawer/DrawerSlot3.vue'
import { useClientStore } from '@/stores/client';
import type { Rule } from 'ant-design-vue/es/form';
import {initClientForm, type Client} from '@/api/client';
import { onMounted, reactive } from 'vue';
// ----------------------------
let clientForm:Client = reactive({...initClientForm})
const myType = 'update'

// onMounted(async ()=>{

// })

const clientFields = [
  { name: 'name', label: 'Client Name', component: 'a-input', props: { placeholder: 'Enter client name' } },
  { name: 'phonenumber', label: 'Phone Number', component: 'a-input', props: { placeholder: 'Enter phone number' } },
  { name: 'emergencycontact', label: 'emergencycontact Number', component: 'a-input', props: { placeholder: 'Enter phone number' } },
  { name: 'emergencycontactphone', label: 'Phone Number', component: 'a-input', props: { placeholder: 'Enter phone number' } },
  { name: 'marks', label: 'marks', component: 'a-input', props: { placeholder: 'Enter phone number' } },
  // 其他字段可以按需添加
];

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter client name' }],
  phonenumber: [{ required: true, message: 'Please enter phone number' }],
  emergencycontact: [{ required: false, message: 'Please enter phone number' }],
  emergencycontactphone: [{ required: false, message: 'Please enter phone number' }],
  marks: [{ required: false, message: 'Please enter phone number' }],
  // 其他字段的验证规则可以按需添加
};



// --------------------------------------
const clientStore = useClientStore();
const handleSubmit = async(form: any) =>{
    // console.log("UpdateClient--------------------------------",clientStore.currentSelectObjID,form);
    await clientStore.update(clientStore.currentSelectObjID,form);
    // console.log("readByIdforFormLoad: ",clientStore.page.item.name); 
}

const showDrawer = async() => {
     await clientStore.readById(clientStore.currentSelectObjID);
      // console.log("showDrawer-clientStore:",clientStore.page.updateItem);
      Object.assign(clientForm,clientStore.page.updateItem);
      // console.log("showDrawer-clientForm:",clientForm);
}
</script>

<style scoped>

</style>