<template>
  <a-tabs v-model:activeKey="activeKey" type="card" @change="handleChange">
    <!-- <a-tab-pane key="0" tab="分析页面">Content of Tab Pane 2</a-tab-pane> -->
    <a-tab-pane key="1" tab="客户(来访-未签约)">
      <div v-if="loadedTabs.includes('1')">
        <!-- header left-->
        <a-space>
          <CreateClientView></CreateClientView>
        </a-space>
        <!-- header right -->
        <a-space style="float:right; margin-right: 50px;margin-bottom: 20px;">
          <a-button>新功能待开发</a-button>
        </a-space>
        <hr>
        <!-- container -->
        <ReadClientView>  <!-- 读取 10条 客户信息 -->
            <!-- client删除-组件 需要: 每个顾客的 id-->
             <!-- <template  v-slot="clientStore">
                {{ clientStore.currentSelectObjID }} -->
            
            <!-- <DeleteClient v-slot="clientStore">
              
                {{ clientStore.currentSelectObjID }}
              
            </DeleteClient> -->
      
            <!-- 查看plan-组件  需要：每个顾客的 id -->
              <!-- 增加plan-组件 需要 每个顾客的 id-->
        </ReadClientView>
      </div>
    </a-tab-pane>
    <!-- <a-tab-pane key="2" tab="客户(合同履行中)">
      1.每期费用提前一个月 提醒租户 缴纳该期租金 <br>
      2.日常消费安全提醒
    </a-tab-pane> -->
    <a-tab-pane key="2" tab="客户(已入驻-日常维护)">
      <div v-if="loadedTabs.includes('2')">
        <CreateClientView></CreateClientView>
        1.每期费用提前一个月 提醒租户 缴纳该期租金 <br>
        2.日常消费安全提醒
        <hr>
        <TabFordailyView></TabFordailyView>
        
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
    <a-tab-pane key="3" tab="客户(法务状态中)">
      <div v-if="loadedTabs.includes('3')">
        1.掌握 法务状态 的合同进度<br>
        2.最快 速度及时清退场地。<br>
        3.当所有完结，及时转入归档。
        <hr>
      </div>
    </a-tab-pane>

    <a-tab-pane key="4" tab="已归档的客户(合同完结)">
      <div v-if="loadedTabs.includes('4')">
        归档信息<br>
        1.所有的已经完结的旧合同信息，这里都可以查询的到。
        <hr>
        <TestView></TestView>
      </div>
      
    </a-tab-pane>
  </a-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import ReadClientView from "@/components/BusinessDepartment/client/Tabs/ReadClient/Home.vue"
import CreateClientView from "@/components/BusinessDepartment/client/Tabs/CreateClient/Home.vue"
import TabFordailyView from "@/components/BusinessDepartment/client/Tabs/TabFordaily/Home.vue"
import TestView from './Test/Home.vue'
import DeleteClient from '@/components/BusinessDepartment/client/Tabs/DeleteClient/Home.vue'

import { useClientStore } from '@/stores/client';
const clientStore = useClientStore();
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