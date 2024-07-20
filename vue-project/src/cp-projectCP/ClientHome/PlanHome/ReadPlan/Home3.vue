<template>
  <!-- <TabsReadView
  @tabClick="tabClick"
  :handleMouseOver="handleMouseOver"
  :handleMouseLeave="handleMouseLeave"
  :queryData = "queryData"
  :store="planStore.readState.formatItems"
  >
  </TabsReadView> -->
</template>
<script setup lang="ts">
// import type { APIParams } from '@/api/services/plan';
import TabsReadView from '@/cp-v1/cp-MB/Tabs/TabsRead.vue';
// import { usePlanStore } from '@/stores/plan';
import { markRaw, onMounted, ref } from 'vue';
import testVIew from './test.vue';
// const planStore = usePlanStore();

const store2 = ref([{ title: `1`, content: markRaw(testVIew), key: '6477765d-7a97-461f-ba50-2b240799723c' },{ title: `2`, content: "a-input", key: '6477765d-7a97-461f-ba50-2b2407997232c' }])
// const getData = planStore.readState.items;
const store = ref<{ title: string; content: any; key: string }[]>([]);


// const handleMouseOver = async (event:MouseEvent,id:string) =>{
//   console.log('Hovered over row with ID:', id);
//   // 需要优化
// }

// const handleMouseLeave = () => {
//   console.log('Mouse left the row');
// };


// const queryData = async (params: APIParams):Promise<void> => {
//   // 需要优化
//   await planStore.read(params);
//   await planStore.changeFormat();
//   console.log("store222:",planStore.readState.formatItems);
//   console.log("sotre333:",store2);
  
// //   store.value = planStore.readState.items.map((item)=>{
// //   return { title: `${item.name}`, content: `Content of Tab Pane `, key: `${item.id}`}
// // })
  
// };

// const tabClick = async (id:any) =>{
//   console.log("zujian:",id);
//   planStore.updateState.selectID = id;
//   planStore.deleteState.selectID = id;
// }

</script>

<style scoped>

</style>