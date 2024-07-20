<template>
  <TableSlotView
    :columns="clientColumns"
    :dataSource="client"
    :editableColumns="clientColumnsArr"
    @update="handleUpdate"
  >
    <template #operation="{ record }">
      <!-- <PopconfirmView :id="record.id"></PopconfirmView> -->
      <!-- <a-button type="primary" @click="showDrawerView(record.id)">查看合同</a-button> -->
    </template>
  </TableSlotView>
  <!-- <DrawerView ref="drawerref" /> -->
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import TableSlotView from '@/cp-v1/cp-GCP/Table/TableSlot2.vue';
// import DrawerView from '@/components/BusinessDepartment/client/Tabs/ReadClient/Drawer/Home.vue';
// import PopconfirmView from '@/components/PopconfirmView.vue';
// import { clientColumns, clientColumnsArr, type FrontEndClientType } from '@/api/services/client';
import { useClientStore } from '@/stores/client';

const clientStore = useClientStore();
const client = ref<FrontEndClientType[]>([]);
const drawerref = ref<any>(null);

onMounted(async () => { // 组件加载时 发生的操作
  try {
    client.value = await clientStore.read();
    console.log("client data fetched:", client.value);
  } catch (error) {
    console.error("Error during fetchClient:", error);
  }
});

const handleUpdate = async (id: string, data: FrontEndClientType) => {
  await clientStore.update(id, data);
};

// const showDrawerView = (id: string) => {
//   if (drawerref.value) {
//     clientStore.selectID = id;
//     drawerref.value.showDrawer();
//   }
// };
</script>
