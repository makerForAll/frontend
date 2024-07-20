<script lang="ts" setup>
// ------------- 使用说明:
// 名称：Table 
//  特点是保留 【1个插槽口】【ant样式与组件功能纯封装，数据剥离管理】【可二次开发】
// 已有插槽：
// <slot name="operations">

// </slot>

// ------------- 数据流转
// 本插槽板 属于 一次开发组件 元板 禁止 pinia 本地状态数据 与 服务器请求数据。
// 数据请放在 cp-projectCP 中的 二次开发 组件中。

//  ------------ 2次开发的 使用方法：
// 通过调用 import TableSlotView from '@/cp-v1/cp-GCP/Table/TableSlot2.vue'
// 调用组件:
// <TableSlotView 
//         :handleMouseOver="handleMouseOver"
//         :handleMouseLeave="handleMouseLeave"
//         :queryData = "queryData"
//         :clientStore="clientStore"
//         >
//         <template #operations>
//           <slot name="operations"></slot>
//       </template>
// </TableSlotView>



import { computed } from 'vue';
import type { TableProps } from 'ant-design-vue';
import { usePagination } from 'vue-request';
// import { clientColumns, type APIParams, type Client } from '@/api/services/client'

import dayjs from 'dayjs';

const props = defineProps<{
  handleMouseOver: (event: MouseEvent,id: string) => void;
  handleMouseLeave: () => void;
  queryData: (params: APIParams) => Promise<void>;
  clientStore: any;
}>()

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

const pagination = computed(() => ({
  total: props.clientStore.readState.total,
  current: current.value,
  pageSize: pageSize.value,
}));

const handleTableChange: TableProps['onChange'] = (
  pag: any,
  filters: any,
  sorter: any,
) => {
  run({
    pagesize: pag.pagesize,
    current: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};
</script>

<template>
  <a-table :scroll="{ x: 1200, y: 500 }" :columns="clientColumns" :row-key="(record: Client) => record.id"
    :data-source="clientStore.readState.items" :pagination="pagination" :loading="loading" @change="handleTableChange">

    <template #bodyCell="{ column, text, index, record }">
      <div @mouseover="event=>handleMouseOver(event,record.id)" @mouseleave="handleMouseLeave">
        <template v-if="column.dataIndex === 'index'">{{ index + 1 }}
        </template>
        <template v-if="column.dataIndex === 'createdAt'">
            {{ dayjs(text).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.dataIndex === 'operation'">
          <div class="editable-row-operations">
            <slot name="operations">
            </slot>
          </div>
        </template> <!-- 操作阶段 end -->
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>


  </a-table>
</template>
