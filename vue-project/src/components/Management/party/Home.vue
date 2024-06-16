<template>
  <div>
    <a-space>
        <CreateParty></CreateParty>
    </a-space>
     <a-space style="float:right; margin-right: 50px;margin-bottom: 20px;">

        <a-button>登录客户信息</a-button>
    </a-space>
    <ReadParty></ReadParty>
  </div>
</template>

<script setup lang="ts">
import CreateParty from "@/components/Management/party/CreateParty/Home.vue"
import ReadParty from "@/components/Management/party/ReadParty/Home.vue"
</script>

<style scoped>
</style>