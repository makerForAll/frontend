<template>
  <a-table :columns="columns" :data-source="party" bordered>
    <template #bodyCell="{ column, text, record }">
      <!-- 打印 属性 -->
      <template v-if="['id', 'name', 'marks'].includes(column.dataIndex)">
        <div>
          <a-input v-if="editableData[record.id]"
            v-model:value="editableData[record.id][column.dataIndex as keyof PartyType]" style="margin: -5px 0" />
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
            <a-popconfirm v-if="party.length" title="Sure to delete?" @confirm="onDelete(record.id)">
              <a style="color:red">删除</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>
<script lang="ts" setup>
import axios from '@/api/request';
import { cloneDeep } from 'lodash-es';
import { onMounted, reactive, ref } from 'vue';
import type { UnwrapRef } from 'vue';

// 字段 配置区域 ------------------------------------------------------

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    width: '8%',
  },
  {
    title: '甲方名称',
    dataIndex: 'name',
    width: '35%',
  },
  {
    title: '备注',
    dataIndex: 'marks',
    width: '40%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
  },
];
// 字段 配置区域 ------------------------------------------------------

// 数据 配置区域 ------------------------------------------------------
interface PartyType {
  id: number;
  name: string;
  marks: string;
}
// const data: PartyType[] = [];
// for (let i = 0; i < 100; i++) {
//   data.push({
//     id: i.toString(),
//     name: `Edrward ${i}`,
//     remarks: `London Park no. ${i}`,
//   });
// }
// ----- pinia 配置数据
import { usePartyStore } from "@/stores/party";
const partyStore = usePartyStore();
const party = ref<any[]>([]);
onMounted(async () => {
  try {
    const readData = await partyStore.readParty();
    party.value = readData.results;
  } catch (error) {
    console.error("Error during fetchParty:", error);
  }
})

// 数据 配置区域 ----------------------- end  -------------------------------

// data 数据格式@ --------------------------- 参考 ----------------------------------
const data1 = [{
  id: 1,
  name: "银海龙城",
  marks: "20240613添加"
}, {
  id: "2",
  name: "银龙管业公司",
  marks: "20240613添加"
}]
// data 数据格式@ --------------------------- end ----------------------------------

// 编辑 功能实现 --------------------------------------------------------------------
// const dataSource = ref(party);
const editableData: UnwrapRef<Record<string, PartyType>> = reactive({}); // 创建 储存编辑状态的变量

const edit = (id: string) => {
  editableData[id] = cloneDeep(party.value.filter(item => id === item.id)[0]); // 储存 要编辑的内容。
};
const save = async (id: string) => {
  await partyStore.updateParty(id,editableData[id]); // 完成编辑与更新本地state数据【pinia层】
  delete editableData[id]; // 完成保存后删除编辑状态中的数据
};
const cancel = (id: string) => {
  delete editableData[id]; // 把想退出编辑状态的数据，从 eritableData中删除。
};

const onDelete = async (id: string) => {
  await partyStore.deleteParty(id);
  // dataSource.value = dataSource.value.filter(item => item.id !== id);
  // 返回一个新的数组，这个数组包含了 dataSource.value 中所有 id 不等于给定 id 的元素。
};
// 编辑 功能实现 ---------------------------  end  -----------------------------------------

</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
