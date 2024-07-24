<template>
  <a-button type="link" @click="showDrawer">查看方案</a-button>

  <a-drawer
    v-model:open="open"
    title="合同列表"
    width="820"
    :closable="false"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <slot name="header"></slot>
    <!-- 相当于 table -->
    <div>
      <a-tabs
        v-model:activeKey="activeKey"
        hide-add
        @change="(key: any) => tabClick(key)"
        type="editable-card"
        @edit="onEdit"
      >
        <a-tab-pane
          v-for="pane in planStore.data.items"
          :key="pane.key"
          :tab="pane.title"
          :closable="pane.closable"
          @click="() => tabClick(pane.key)"
        >
          {{ pane.key }}
          <component :is="pane?.content" />
          <slot name="operations"></slot>
        </a-tab-pane>
      </a-tabs>
    </div>

    <hr />
    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onClose">Submit</a-button>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
// import type { APIParams } from '@/api/services/plan'
import { onMounted, reactive, ref, watch } from 'vue'
import { usePagination } from 'vue-request'

let activeKey = ref('') // 当前 正在显示的 一栏

const onEdit = (targetKey: string) => {
  // remove(targetKey);
}

// --------------------------------------------------
import { usePlanStore } from '@/stores/plan'
const planStore = usePlanStore()



const tabClick = async (id: any) => {
  console.log('zujian:', id)
  planStore.data.selectID = id
  planStore.data.selectID = id
}
// ----------------------------------------


const open = ref<boolean>(false)
const showDrawer = async() => {
  open.value = true
  // 逻辑梳理
  await planStore.read()
  await planStore.changeFormat()
}

const onClose = () => {
  open.value = false
}
</script>
