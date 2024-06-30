<template>
    <ButtonSlotView 
    :Confirm="handleConfirm"
    >

    </ButtonSlotView>
</template>

<script setup lang="ts">
  import ButtonSlotView from '@/cp-v1/cp-GCP/Button/ButtonSlot.vue'
  import { useClientStore } from "@/stores/client";
import message from 'ant-design-vue/es/message';

  const clientStore = useClientStore();



  const handleConfirm = async (password: string) => {
  if (password === '8888') {
    await clientStore.delete(clientStore.currentSelectObjID as string);
    await clientStore.read();
  } else {
    await message.error('密码错误，删除失败');
  }
};
</script>

<style scoped>

</style>