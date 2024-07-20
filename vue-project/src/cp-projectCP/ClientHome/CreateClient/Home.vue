<template>
  <DrawerSlotView
    entityType="Client"
    action="创建"
    :form="clientForm"
    :fields="clientFields"
    :rules="rules"
    @submit="handleSubmit"
  />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import DrawerSlotView from '@/cp-v1/cp-GCP/Drawer/DrawerSlot2.vue';
import type { Rule } from 'ant-design-vue/es/form';
import { useClientStore } from '@/stores/client';
// useClientStore



const initClientForm = () => ({
  name: '',
  phonenumber: '',
  // 其他字段可以按需添加
})

const clientForm = reactive(initClientForm());

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

const clientStore = useClientStore()
const handleSubmit = async (form: Record<string, any>) => {
  // await createClient(form);
  await clientStore.create(form);
  Object.assign(clientForm,initClientForm());
  console.log("clientForm:",clientForm);
};


</script>
