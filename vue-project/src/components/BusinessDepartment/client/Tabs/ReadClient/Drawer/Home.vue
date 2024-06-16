<template>
    <a-button type="primary" @click="showDrawer">查看合同</a-button>
    <a-drawer
      v-model:open="open"
      title="合同列表"
      width="820"
      :closable="false"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
    <PlanView></PlanView>
      <a-button type="primary" @click="showChildrenDrawer">查看支付明细</a-button>
      <a-drawer v-model:open="childrenDrawer" title="支付明细" width="720" :closable="false">
        <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button>
      </a-drawer>
  
      <template #footer>
        <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
        <a-button type="primary" @click="onClose">Submit</a-button>
      </template>
    </a-drawer>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import PlanView from '@/components/BusinessDepartment/client/Tabs/ReadClient/Drawer/Plan/Home.vue';
  
  const open = ref<boolean>(false);
  
  const childrenDrawer = ref<boolean>(false);
  
  const showDrawer = () => {
    open.value = true;
    // 逻辑梳理
    // 传递ID
  };
  const onClose = () => {
    open.value = false;
  };
  const showChildrenDrawer = () => {
    childrenDrawer.value = true;
  };
  </script>
  
  