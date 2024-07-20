<template>
       <TableSlotView 
        :handleMouseOver="handleMouseOver"
        :handleMouseLeave="handleMouseLeave"
        :queryData = "queryData"
        :clientStore="clientStore"
        >
       <template #operations>
          <slot name="operations-chlid"></slot>
      </template>
        </TableSlotView> 
</template>

<script setup lang="ts">
// 提供1个插槽


// import TableSlotView from '@/cp-v1/cp-ReadMB-data/Table/TableSlot2.vue'

// import { useClientStore } from '@/stores/client';
// const clientStore = useClientStore();

// const handleMouseOver = async (event:MouseEvent,id:string) =>{
//   console.log('Hovered over row with ID:', id);
//   // 需要优化
//   clientStore.updateState.selectID = id;
//   clientStore.deleteState.selectID = id;
// }

// const handleMouseLeave = () => {
//   console.log('Mouse left the row');
// };

// const queryData = async (params: APIParams):Promise<void> => {
//   // 需要优化
//   await clientStore.read(params);
// };

</script>

<style scoped>

</style>