<script lang="ts" setup>
// ------------- 使用说明:
// 名称：Tab 插槽板
// 已有插槽：
  // <slot name="1-header">
  //   1
  // </slot>
  // <slot name="1-container">
  //   2
  // </slot>
  // <slot name="2-container">
  //   2-1
  // </slot>
  // <slot name="3-container">
  //   3-1
  // </slot>
  // <slot name="4-container">
  //   4-1
  // </slot>

// ------------- 数据流转
// 本插槽板 属于 一次开发组件 元板 禁止 pinia 数据 与 请求数据。
// 数据请放在 cp-projectCP 中的 二次开发 组件中。

//  ------------ 使用方法：
  // 通过调用 import TabsSlotView from 'cp-v1/Tabs/TabsSlot.vue'
  // 调用组件:
  // <TabsSlotView>
  //     <template #1-header>

  //     </template>
  //     <template #1-container>

  //     </template>
  //     <template #2-container>
  //           2-
  //     </template>
  //     <template #3-container>
  //           3-
  //     </template>
  //     <template #4-container>
  //           4-
  //     </template>
  // </TabsSlotView>


import { ref } from 'vue';
// import ReadClientView from "@/components/BusinessDepartment/client/Tabs/ReadClient/Home.vue"
// import CreateClientView from "@/components/BusinessDepartment/client/Tabs/CreateClient/Home.vue"
// import TabFordailyView from "@/components/BusinessDepartment/client/Tabs/TabFordaily/Home.vue"
// import TestView from './Test/Home.vue'
// import PopconfirmView from '@/components/BusinessDepartment/client/Tabs/'

// ------------------ 实现懒加载，按需加载 ---------------------------------
const activeKey = ref('1'); // 默认激活的标签页
const loadedTabs = ref<string[]>(['1']); // 已加载内容的标签页

const handleChange = (key: string) => {
  activeKey.value = key;
  if (!loadedTabs.value.includes(key)) {
    loadedTabs.value.push(key);
  }
};
</script>
<template>
    <a-tabs v-model:activeKey="activeKey" type="card" @change="handleChange">
      <a-tab-pane key="1" tab="客户(待开发客户)">
        <div v-if="loadedTabs.includes('1')">
         
          <!-- container -->
          <slot name="1-container">
            2
          </slot>
        </div>
      </a-tab-pane>
      <!-- <a-tab-pane key="2" tab="客户(合同履行中)">
        1.每期费用提前一个月 提醒租户 缴纳该期租金 <br>
        2.日常消费安全提醒
      </a-tab-pane> -->
      <a-tab-pane key="2" tab="客户(近期关注客户)">
        <div v-if="loadedTabs.includes('2')">
          <slot name="2-container">
            2-1
          </slot>
          <!-- 1.每期费用提前一个月 提醒租户 缴纳该期租金 <br>
          2.日常消费安全提醒
          <hr>
          <TabFordailyView></TabFordailyView> -->
          
        </div>
      </a-tab-pane>
      <!-- <a-tab-pane key="3" tab="客户(合同欠款中)">
        1.和客户沟通，欠款原因<br>
        2.根据原因提出解决方案<br>
        3.如果初步协商无法解决，及时核算 所欠金额，做成资料【联系函】<br>
        4.如果多次协商无果，及时打包该租户的资料，转交给法务。
      </a-tab-pane>
      <a-tab-pane key="5" tab="客户(办理退租手续中)">
        1.给要办理退租的租户，办理相关退租手续。<br>
        2.租金退还情况掌握<br>
        3.商铺场地清场情况掌握
      </a-tab-pane> -->
      <a-tab-pane key="3" tab="客户(预计签合同)">
        <div v-if="loadedTabs.includes('3')">
          <slot name="3-container">
            3-1
          </slot>
          <!-- 1.掌握 法务状态 的合同进度<br>
          2.最快 速度及时清退场地。<br>
          3.当所有完结，及时转入归档。
          <hr> -->
        </div>
      </a-tab-pane>
  
      <a-tab-pane key="4" tab="客户(近期已签)">
        <div v-if="loadedTabs.includes('4')">
          <slot name="4-container">
            4-1
          </slot>
          <!-- 归档信息<br>
          1.所有的已经完结的旧合同信息，这里都可以查询的到。
          <hr> -->
        </div>
        
      </a-tab-pane>
    </a-tabs>
  </template>
