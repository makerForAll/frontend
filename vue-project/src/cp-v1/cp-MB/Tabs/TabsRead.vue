<template>
<a-button type="link" @click="showDrawer">查看方案</a-button>

<!-- 以下内容，应该 进行动态加载 -->
<a-drawer
  v-model:open="open"
  title="合同列表"
  width="820"
  :closable="false"
  :footer-style="{ textAlign: 'right' }"
  @close="onClose"
>
  <slot name="header">
    <!-- <a-button type="primary" @click="showAddDrawer">添加方案</a-button> -->
  </slot>

  <div>
      <a-tabs v-model:activeKey="activeKey" hide-add @change="(key:any) => tabClick(key)" type="editable-card" @edit="onEdit">
        <a-tab-pane v-for="pane in planStore.readState.formatItems" :key="pane.key" :tab="pane.title" :closable="pane.closable" @click="() => tabClick(pane.key)">
          {{ pane.key }}
          <component :is="pane?.content" />
        </a-tab-pane>
      </a-tabs>
    </div>


  <slot name="operations">
    <!-- <a-button type="primary" @click="showAddDrawer">添加方案</a-button> -->
  </slot>

  <hr />
  <template #footer>
    <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
    <a-button type="primary" @click="onClose">Submit</a-button>
  </template>
</a-drawer>


 
  </template>
  <script lang="ts" setup>
  // import type { APIParams } from '@/api/services/plan';
import { onMounted, reactive, ref, watch } from 'vue';
  import { usePagination } from 'vue-request';
  
//   const props = defineProps<{
//   // tabClick:(id: string) => void;
//   handleMouseOver: (event: MouseEvent,id: string) => void;
//   handleMouseLeave: () => void;
//   queryData: (params: APIParams) => Promise<void>;
//   store: any;
// }>()

  let activeKey = ref(''); // 当前 正在显示的 一栏
  // let internalForm = reactive({ ...props.store })

  const onEdit = (targetKey: string) => {
    // remove(targetKey);
  };


  // --------------------------------------------------
  import { usePlanStore } from '@/stores/plan';
  const planStore = usePlanStore();

const handleMouseOver = async (event:MouseEvent,id:string) =>{
  console.log('Hovered over row with ID:', id);
  // 需要优化
}

const handleMouseLeave = () => {
  console.log('Mouse left the row');
};


const queryData = async (params: APIParams):Promise<void> => {
  // 需要优化
  await planStore.read(params);
  await planStore.changeFormat();
  console.log("store222:",planStore.readState.formatItems);
  // console.log("sotre333:",store2);
  
//   store.value = planStore.readState.items.map((item)=>{
//   return { title: `${item.name}`, content: `Content of Tab Pane `, key: `${item.id}`}
// })
  
};

const tabClick = async (id:any) =>{
  console.log("zujian:",id);
  planStore.updateState.selectID = id;
  planStore.deleteState.selectID = id;
}
// ----------------------------------------


const {
  run,
  loading,
  current,
  pageSize,
} = usePagination(queryData, {
  onSuccess(data, params) {
  },
  pagination: {
    currentKey: 'current',
    pageSizeKey: 'pagesize',
  },
});

// watch(
//   () => planStore.readState.formatItems,
//   (newValue) => {
//     for (const key in newValue) {
//       internalForm[key] = newValue[key]
//       activeKey.value = newValue[key].key;
//       console.log("打印：",activeKey.value);
//     }
//     console.log('internalForm watch--------------------------:', internalForm)
//   },
//   {
//     deep: true,
//     // immediate: true
//   } // 深度监听
// )
// ----------

const open = ref<boolean>(false)
const showDrawer = () => {
  open.value = true
  // 逻辑梳理
}

// const onCloseAddDrawer = () => {
//   addDrawer.value = false
// }

const onClose = () => {
  open.value = false
}
  </script>
  
  