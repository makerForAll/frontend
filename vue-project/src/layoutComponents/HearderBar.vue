<template>
    <a-layout-header class="header">
        <div class="logo">
            <span>商铺->运营->租、卖</span>
        </div>
        <a-menu mode="horizontal" style="float:right">
            <a-sub-menu key="sub1">
                <template #title>用户设置</template>
                <a-menu-item key="setting:1">

                    <!-- <RouterLink :to="`/staticResourceManagementHome`"
                        class="link-dark d-inline-flex text-decoration-none rounded">
                        静态文件综合</RouterLink> -->
                </a-menu-item>
                <a-menu-item key="setting:2">
                    <!-- <RouterLink :to="`/ossFiles`" class="link-dark d-inline-flex text-decoration-none rounded">
                        OSS源文件差异管理</RouterLink> -->
                </a-menu-item>
                <a-menu-item key="setting:3">个人信息</a-menu-item>
                <a-menu-item key="setting:4" @click="onLogout"> 退出登录</a-menu-item>
            </a-sub-menu>

        </a-menu>

    </a-layout-header>
</template>
<script setup lang="ts">
import { defineComponent, onMounted, ref, toRefs, watch } from 'vue';
import router from '@/router'
import useHeaderStore from '@/stores/header'
import useUserStore from '@/stores/user';
import { message } from 'ant-design-vue';
const headerStore = useHeaderStore();
const userStore = useUserStore();
const { companyCode, lastSegment } = toRefs(headerStore);

const getUrl = ref(window.location.href);
const segments = ref(getUrl.value.split('/'));

const onLogout = () => {
    userStore.logout();
    message.success("退出登录成功");
    router.push('/login');
}
</script>
<style>
.logo {
    float: left;
    width: 150px;
    height: 31px;
    margin: 16px 0px 16px 0;
    background: rgba(255, 255, 255, .3);
    display: flex;
    justify-content: center;
    align-items: center;
    color: gold;
}

.header{
    padding-inline: 24px!important;
    
}
/* .logo>span{
    position: relative;
    color: coral;
    padding: 20px;
} */
/* .logo:before{
    content: "This is before text.";
    margin: 16px 24px 16px 0;
    position: relative;
    bottom: 0;
}  */
</style>