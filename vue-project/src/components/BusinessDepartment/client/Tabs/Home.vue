<template>
  <a-tabs v-model:activeKey="activeKey" type="card">
    <a-tab-pane key="1" tab="客户(来访未签约)">
      <a-space>
        <CreateClientView></CreateClientView>
      </a-space>
      <a-space style="float:right; margin-right: 50px;margin-bottom: 20px;">

        <a-button>新功能待开发</a-button>
      </a-space>
      <ReadClientView></ReadClientView>
    </a-tab-pane>
    <a-tab-pane key="2" tab="客户(合同履行中)">Content of Tab Pane 2</a-tab-pane>
    <a-tab-pane key="3" tab="客户(合同欠款中)">Content of Tab Pane 3</a-tab-pane>
    <a-tab-pane key="4" tab="客户(合同法务状态中)">Content of Tab Pane 4</a-tab-pane>
    <a-tab-pane key="5" tab="已归档的客户(合同完结)">Content of Tab Pane 5</a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ReadClientView from "@/components/BusinessDepartment/client/Tabs/ReadClient/Home.vue"
import CreateClientView from "@/components/BusinessDepartment/client/Tabs/CreateClient/Home.vue"
const activeKey = ref('1');
</script>