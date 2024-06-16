<template>
    <!-- <a @click="edit(record.key)">Edit</a> -->
    <div class="editable-row-operations">
          <span v-if="editableData[record.key]">
            <a-typography-link @click="save(record.key)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.key)">Edit</a>
          </span>
        </div>
  
        {{ message }}
 </template>
 
 <script setup lang="ts">
 
 import { cloneDeep } from 'lodash-es';
 import { onMounted, reactive, ref } from 'vue';
 import type { UnwrapRef } from 'vue';
 
// 使用 defineProps 来接收父组件传递的 props
const props = defineProps<{
  record: string;
  data:any;
  message: string;
}>();
// console.log("title:",props.title);

onMounted(() => { // 加载租金后 再执行
  console.log('Message from Parent:', props.message);
});

 const dataSource = ref(data);
 const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
 
 const edit = (key: string) => {
   editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
 };

 const save = (key: string) => {
   Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
   delete editableData[key];
 };

 const cancel = (key: string) => {
   delete editableData[key];
 };
 </script>
 
 <style scoped>
 
 </style>