<template>
    <DrawerSlotView
      entityType="Client"
      action="更新"
      :form="clientForm"
      :fields="clientFields"
      :rules="rules"
      @submit="handleSubmit"
      :updateId="updateId"
    />
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref, onMounted } from 'vue';
  import DrawerSlotView from '@/cp-v1/cp-GCP/Drawer/DrawerSlot.vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { useClientStore } from '@/stores/client';
  
  const initClientForm = () => ({
    name: '',
    phonenumber: '',
    emergencycontact: '',
    emergencycontactphone: '',
    marks: '',
    createdAt: new Date(),
  });
  
  const clientForm = reactive(initClientForm());
  
  const clientFields = [
    { name: 'name', label: 'Client Name', component: 'a-input', props: { placeholder: 'Enter client name' } },
    { name: 'phonenumber', label: 'Phone Number', component: 'a-input', props: { placeholder: 'Enter phone number' } },
    { name: 'emergencycontact', label: 'Emergency Contact', component: 'a-input', props: { placeholder: 'Enter emergency contact' } },
    { name: 'emergencycontactphone', label: 'Emergency Contact Phone', component: 'a-input', props: { placeholder: 'Enter emergency contact phone' } },
    { name: 'marks', label: 'Marks', component: 'a-input', props: { placeholder: 'Enter marks' } },
  ];
  
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: 'Please enter client name' }],
    phonenumber: [{ required: true, message: 'Please enter phone number' }],
    emergencycontact: [{ required: true, message: 'Please enter emergency contact' }],
    emergencycontactphone: [{ required: true, message: 'Please enter emergency contact phone' }],
    marks: [{ required: true, message: 'Please enter marks' }],
  };
  
  const clientStore = useClientStore();
  const updateId = ref<string | undefined>(undefined);
  
  const handleSubmit = async (form: Record<string, any>, id?: string) => {
    if (id) {
      await clientStore.update(id, form);
      Object.assign(clientForm, initClientForm());
      console.log("clientForm:", clientForm);
    }
  };
  
  const loadClientData = async (id: string) => {
    const clientData = await clientStore.readById(id);
    Object.assign(clientForm, clientData);
  };
  
  const handleUpdateDataEvent = async (event: Event) => {
    const customEvent = event as CustomEvent;
    updateId.value = customEvent.detail;
    
    if (updateId.value) {
    console.log("------------updateId:",updateId);
    
      await loadClientData(updateId.value);
    }
  };
  
  onMounted(() => {
    window.addEventListener('updateData', handleUpdateDataEvent as EventListener);
  });
  
  </script>
  