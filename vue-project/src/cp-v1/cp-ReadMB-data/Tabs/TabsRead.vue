<template>
    <div>
      <!-- <div :style="{ marginBottom: '16px' }">
        <a-button @click="add">ADD</a-button>
      </div> -->
      <a-tabs v-model:activeKey="activeKey" hide-add @change="(key:any) => tabClick(key)" type="editable-card" @edit="onEdit">
        <a-tab-pane v-for="pane in props.store" :key="pane.key" :tab="pane.title" :closable="pane.closable" @click="() => tabClick(pane.key)">
          {{ pane.key }}
          <component :is="pane?.content" />
        </a-tab-pane>
      </a-tabs>
      <!-- <a-tabs v-model:activeKey="activeKey" hide-add type="editable-card" @edit="onEdit">
    <a-tab-pane v-for="pane in props.store" :key="pane.key" :tab="pane.title" :closable="pane.closable">
      <component :is="pane.content" />
    </a-tab-pane>
  </a-tabs> -->
    </div>
  </template>
  <script lang="ts" setup>
  // import type { APIParams } from '@/api/services/plan';
import { onMounted, reactive, ref, watch } from 'vue';
  import { usePagination } from 'vue-request';
  
  const props = defineProps<{
  // tabClick:(id: string) => void;
  handleMouseOver: (event: MouseEvent,id: string) => void;
  handleMouseLeave: () => void;
  queryData: (params: APIParams) => Promise<void>;
  store: any;
}>()
  // const panes = ref<{ title: string; content: string; key: string; closable?: boolean }[]>(
  //   new Array(2).fill(null).map((_, index) => {
  //     const id = String(index + 1);
  //     return { title: `Tab ${id}`, content: `Content of Tab Pane ${id}`, key: id };
  //   }),
  // );



  let activeKey = ref(''); // 当前 正在显示的 一栏
  let internalForm = reactive({ ...props.store })

  watch(
  () => props.store,
  (newValue) => {
    for (const key in newValue) {
      internalForm[key] = newValue[key]
      activeKey.value = newValue[key].key;
      console.log("打印：",activeKey.value);
    }
    console.log('internalForm watch--------------------------:', internalForm)
  },
  {
    deep: true,
    // immediate: true
  } // 深度监听
)
onMounted(()=>{
  // if(activeKey.value){
    // console.log("打印：",activeKey.value);
  // }
})

  const {
  run,
  loading,
  current,
  pageSize,
} = usePagination(props.queryData, {
  onSuccess(data, params) {
  },
  pagination: {
    currentKey: 'current',
    pageSizeKey: 'pagesize',
  },
});
  // const newTabIndex = ref(0);
  
  // const add = () => {
  //   activeKey.value = `newTab${newTabIndex.value++}`;
  //   panes.value.push({
  //     title: `New Tab ${activeKey.value}`,
  //     content: `Content of new Tab ${activeKey.value}`,
  //     key: activeKey.value,
  //   });
  // };
  
  // const remove = (targetKey: string) => {
  //   let lastIndex = 0;
  //   panes.value.forEach((pane, i) => {
  //     if (pane.key === targetKey) {
  //       lastIndex = i - 1;
  //     }
  //   });
  //   panes.value = panes.value.filter(pane => pane.key !== targetKey);
  //   if (panes.value.length && activeKey.value === targetKey) {
  //     if (lastIndex >= 0) {
  //       activeKey.value = panes.value[lastIndex].key;
  //     } else {
  //       activeKey.value = panes.value[0].key;
  //     }
  //   }
  // };
  const emits = defineEmits(['tabClick']);

  const tabClick = (id:any) =>{
    emits('tabClick',id);
    // console.log("activeKey:",activeKey);
  }

  const onEdit = (targetKey: string) => {
    // remove(targetKey);
  };
  </script>
  
  