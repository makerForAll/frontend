<template>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane key="1" tab="默认模式[无免租]">默认模式[无免租]</a-tab-pane>
      <a-tab-pane key="2" tab="免租模式[头部免租]" force-render>免租模式[尾部免租]</a-tab-pane>
      <a-tab-pane key="3" tab="免租模式[尾部免租]">Content of Tab Pane 3</a-tab-pane>
    </a-tabs>
  </template>
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  export default defineComponent({
    setup() {
      return {
        activeKey: ref('1'),
      };
    },
  });
  </script>