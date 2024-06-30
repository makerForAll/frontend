<template>
  <a-table :columns="clientColumns" :data-source="client" bordered>
    <template #bodyCell="{ column, text, record,index }">
      <!-- 打印 属性 -->
      <template v-if="clientColumnsArr.includes(column.dataIndex)">
        <div>
          <!-- {{ editableData }} -->
          <template v-if="column.dataIndex === 'index'">
        {{ index + 1 }}
      </template>
          <a-input v-if="editableData[record.id] && column.dataIndex !== 'index'"
            v-model:value="editableData[record.id][column.dataIndex as keyof FrontEndClientType]" style="margin: -5px 0" />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <!-- 打印 属性 结束 -->
      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.id]">
            <a-typography-link @click="save(record.id)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="edit(record.id)">编辑</a>
            <!-- <slot :currentSelectObjID="record.id"></slot> -->
            <PopconfirmView :id="record.id"></PopconfirmView>
            <a-button type="primary" @click="showDrawerView(record.id)">查看合同</a-button>
          </span>
        </div>
      </template>
    </template>
  </a-table>
  <DrawerView ref="drawerref" />
</template>
<script lang="ts" setup>
import { cloneDeep } from 'lodash-es';
import { computed, defineAsyncComponent, markRaw, onMounted, reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';
import { clientColumns, type FrontEndClientType ,clientColumnsArr } from '@/api/client'
import DrawerView from '@/components/BusinessDepartment/client/Tabs/ReadClient/Drawer/Home.vue'


// ------ 测试
// import testView from './testView/Home.vue';
// const childRef = ref<any>();
//   const getChild = () => {
//     // 第三步： 调用子组件的方法或者变量，通过value
//     childRef.value.doSth();
// }


// ----- pinia 配置数据
import { useClientStore } from "@/stores/client";
const clientStore = useClientStore();
const client = ref<any[]>([]);
const openDrawer = ref<boolean>(false);
const drawerref = ref<any>(null);

onMounted(async () => {
  try {
    client.value = await clientStore.read();
    console.log("client data fetched:", client.value);
  } catch (error) {
    console.error("Error during fetchClient:", error);
  }
})

// 编辑 功能实现 --------------------------------------------------------------------
// const dataSource = ref(party);
const editableData: UnwrapRef<Record<string, FrontEndClientType>> = reactive({}); // 创建 储存编辑状态的变量

const edit = (id: string) => {
  editableData[id] = cloneDeep(client.value.filter(item => id === item.id)[0]); // 储存 要编辑的内容。
};
const save = async (id: string) => {
  await clientStore.update(id,editableData[id]); // 完成编辑与更新本地state数据【pinia层】
  delete editableData[id]; // 完成保存后删除编辑状态中的数据
};
const cancel = (id: string) => {
  delete editableData[id]; // 把想退出编辑状态的数据，从 eritableData中删除。
};


// 编辑 功能实现 ---------------------------  end  -----------------------------------------

const showDrawerView = (id:string)=>{
  if(drawerref.value){
    clientStore.currentSelectObjID = id;
    drawerref.value.showDrawer();
  }
}

// 在按钮点击事件中调用子组件的方法
// const callChildMethod = () => {
//   if (childRef.value) {
//     childRef.value.childMethod();
//   }
// };

</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
