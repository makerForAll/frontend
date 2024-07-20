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

    <slot name="container">
      <!-- <a-button type="primary" @click="showAddDrawer">添加方案</a-button> -->
    </slot>

    <hr />

    <!-- <slot name="pay">
      支付明细
    </slot> -->
    <!-- <a-button type="primary" @click="showChildrenDrawer">查看支付明细</a-button>
    <a-drawer v-model:open="childrenDrawer" title="支付明细" width="720" :closable="false">
      <a-button type="primary" @click="showChildrenDrawer">This is two-level drawer</a-button>
    </a-drawer> -->

    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">Cancel</a-button>
      <a-button type="primary" @click="onClose">Submit</a-button>
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue'
// import PlanView from '@/components/BusinessDepartment/client/Tabs/ReadClient/Drawer/Plan/Home.vue'
// import PlanAddFormView from '@/components/BusinessDepartment/client/Tabs/ReadClient/Drawer/Plan/PlanAddForm/Home.vue'
// import { useClientStore } from '@/stores/client'

// const clientStore = useClientStore()

onMounted(() => {
  console.log('加载了Drawer组件')
})

const open = ref<boolean>(false)
// const addDrawer = ref<boolean>(false)
// const childrenDrawer = ref<boolean>(false)

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

// const showChildrenDrawer = () => {
//   childrenDrawer.value = true
// }
// ---------- 调用子组件的方法 --------------
const planaddformref = ref<any>(null)

// const showAddDrawer = () => {
//   if (planaddformref.value) {
//     planaddformref.value.showDrawer()
//   }
//   // addDrawer.value = true;
// }

// ------------------------
// defineExpose({ showDrawer })
</script>
