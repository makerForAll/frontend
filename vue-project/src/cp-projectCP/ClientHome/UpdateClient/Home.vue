<template>
    <DrawerSlot
      entityType="Client"
      action="更新"
      :form="clientForm"
      :fields="clientFields"
      :rules="rules"
      @submit="handleSubmit"
      :updateId="selectedClientId"
    />
  </template>
  
  <script lang="ts" setup>
  import { ref, reactive, watch } from 'vue';
  // import UpdateEntityDrawer from './UpdateEntityDrawer.vue';
  import DrawerSlot from '@/cp-v1/cp-GCP/Drawer/DrawerSlot.vue';
  import type { Rule } from 'ant-design-vue/es/form';
import { useClientStore } from '@/stores/client';
  
  const clientForm = reactive({
    name: '',
    phonenumber: '',
    // 其他字段可以按需添加
  });
  
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
  
  const selectedClientId = ref<string>('');
  
  const fetchAndUpdateForm = async (id: string) => {
    const data = await fetchClientById(id);
    Object.assign(clientForm, data);
  };
  
  watch(selectedClientId, async (newId) => {
    if (newId) {
      await fetchAndUpdateForm(newId);
    } else {
      // 如果没有选中 ID，则重置表单
      Object.keys(clientForm).forEach(key => {
        clientForm[key] = '';
      });
    }
  });
  

  const clientStore = useClientStore();
  const handleSubmit = async (form: Record<string, any>, id?: string) => {
    // await updateClient(id!, form);
    await clientStore.update(id as string, form);
  };
  
  // window.addEventListener('updateData', (event: CustomEvent) => {
  //   fetchAndUpdateForm(event.detail);
  // });
  
  const openUpdateDrawer = (id: string) => {
    selectedClientId.value = id;
  };
  </script>
  