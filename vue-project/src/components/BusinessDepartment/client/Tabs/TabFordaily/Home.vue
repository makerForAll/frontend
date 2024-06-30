<template>
    <div>
      <!-- <a-radio-group v-model:value="mode" :style="{ marginBottom: '8px' }">
        <a-radio-button value="top">Horizontal</a-radio-button>
        <a-radio-button value="left">Vertical</a-radio-button>
      </a-radio-group> -->
      <a-tabs
        v-model:activeKey="activeKey"
        :tab-position="mode"
        :style="{ height: 'auto' }"
        @tabScroll="callback"
      >
        <a-tab-pane key="1" :tab="`正常履行中`">
        <TableView></TableView>
        </a-tab-pane>
        <a-tab-pane key="2" :tab="`欠租金-协商中`">12</a-tab-pane>
        <a-tab-pane key="3" :tab="`欠租金-有其他合同没结算`">12</a-tab-pane>
        <a-tab-pane key="4" :tab="`欠租金-另外分时间段还当期租金`">12</a-tab-pane>
        <a-tab-pane key="5" :tab="`中途退租-办理手续中`">12</a-tab-pane>
        <a-tab-pane key="6" :tab="`正常退租-办理手续中`">12</a-tab-pane>
        <a-tab-pane key="7" :tab="`借用与占用中`">12</a-tab-pane>
        <a-tab-pane key="8" :tab="`销售合同客户(门面)`">12</a-tab-pane>
      </a-tabs>
    </div>
  </template>
  <script lang="ts" setup>
  import { ref } from 'vue';
  import type { TabsProps } from 'ant-design-vue';
  import TableView from "@/components/BusinessDepartment/client/Tabs/TabFordaily/TableView/Home.vue"

  const mode = ref<TabsProps['tabPosition']>('left');
  const activeKey = ref(1);
  const callback: TabsProps['onTabScroll'] = val => {
    console.log(val);
  };
  </script>
  
  