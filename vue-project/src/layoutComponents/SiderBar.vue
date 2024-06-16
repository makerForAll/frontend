<template>
    <a-layout-sider width="200" style="background: #fff">
        <a-menu v-model:selectedKeys="selectedKeys" mode="inline"
            :style="{ height: '100%', borderRight: 0 }">
            <a-menu-item key="home">
                <RouterLink :to="`/`">仪表盘</RouterLink>
            </a-menu-item>
            <a-sub-menu key="sub1"> <!-- 管理层 --------------------------------------------------- -->
                <template #title>
                    <span>
                        管理层
                    </span>
                </template>
                <a-menu-item key="1-1">
                    <RouterLink :to="`/party`">甲方管理</RouterLink>
                </a-menu-item>
            </a-sub-menu>
            <a-sub-menu key="sub2"> <!-- 业务部 --------------------------------------------------- -->
                <template #title>
                    <span>
                        业务部
                    </span>
                </template>
                <a-menu-item key="2-1">
                    <RouterLink :to="`/client`">客户管理</RouterLink>
                </a-menu-item>
                <!-- <a-menu-item key="2-2">
                    <RouterLink :to="`/${companyCode}/contractsSystemHome`">合同系统</RouterLink>
                </a-menu-item>
                <a-menu-item key="2-3">
                    <RouterLink :to="`/${companyCode}/reportingSystem`">报告系统</RouterLink>
                </a-menu-item> -->
            </a-sub-menu>
            <a-sub-menu key="sub3"> <!-- 财务部 --------------------------------------------------- -->
                <template #title>
                    <span>
                        财务部
                    </span>
                </template>
                <!-- <a-menu-item key="3-1">
                    <RouterLink :to="`/${companyCode}/customerManagement`">财务报告</RouterLink>
                </a-menu-item> -->
            </a-sub-menu>
            <a-sub-menu key="sub4"> <!-- 工程部 --------------------------------------------------- -->
                <template #title>
                    <span>
                        工程部
                    </span>
                </template>
                <!-- <a-menu-item key="4-1">
                    <RouterLink :to="`/${companyCode}/problemRegistration`">问题登记</RouterLink>
                </a-menu-item>
                <a-menu-item key="4-2">
                    <RouterLink :to="`/unitiesSystemHome`">物理单元管理</RouterLink>
                </a-menu-item>
                <a-menu-item key="4-3">
                    <RouterLink :to="`/${companyCode}/infoManagementHome`">资料管理</RouterLink>
                </a-menu-item> -->
            </a-sub-menu>
        </a-menu>
    </a-layout-sider>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import useHeaderStore from '@/stores/header';
import { reactive } from 'vue';

const headerStore = useHeaderStore();
const { companyCode } = toRefs(headerStore);

const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['home']);

</script>