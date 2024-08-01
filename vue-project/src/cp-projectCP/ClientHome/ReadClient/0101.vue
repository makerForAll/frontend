
<template>
  <div>
    <slot name="headerHandle">
    </slot>
  </div>
  <hr>
  <a-table :scroll="{ x: 1200, y: 500 }" :columns="clientColumns" :row-key="(record: any) => record.id"
    :data-source="clientStore?.data?.items" :pagination="pagination" :loading="loading" @change="handleTableChange">

    <template #bodyCell="{ column, text, index, record }">
      <div @mouseover="event=>handleMouseOver(event,record.id)" @mouseleave="handleMouseLeave">
        <template v-if="column.dataIndex === 'index'">{{ index + 1 }}
        </template>
        <template v-if="column.dataIndex === 'createdAt'">
          <!-- {{ dayjs(text) }} -->
            {{ dayjs(text).format('YYYY-MM-DD HH:mm:ss') }}
            <!-- {{ text }} -->
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

<script lang="ts" setup>

import { computed, onMounted } from 'vue';
import type { TablePaginationConfig, TableProps } from 'ant-design-vue';
import { usePagination } from 'vue-request';
// import { clientColumns, type APIParams, type Client,  } from '@/api/services/client'
// import apiClient from '@/api/services/client'


const clientColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: '6%',
    fixed: 'left'
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    sorter: true,
    width: '10%',
    fixed: 'left'
  },{
    title: '联系方式',
    dataIndex: 'phonenumber',
    width: '10%',
  },{
    title: '紧急联系人',
    dataIndex: 'emergencycontact',
    width: '12%',
  },{
    title: '紧急联系人电话',
    dataIndex: 'emergencycontactphone',
    width: '15%',
  },{
    title: '标签',
    dataIndex: 'tags',
    width: '15%',
    // key:'tags!',
    filters: [
      {
        value: '1',
        text: '待开发',
      },
      {
        value: '2',
        text: '关注的客户',
      }],
      // onFilter: (value: any, record: { tags: string | any[]; }) => record.tags.indexOf(value) === 1,
  },{
    title: '注册时间',
    dataIndex: 'createdAt',
    width:'25%',
    // customRender: ({ text }: { text: string }) => formatDate(new Date(text)) // 本地化显示
  },
  {
    title: '备注',
    dataIndex: 'marks',
    width: '15%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: '30%',
  },
];

// import axios from '@/api/request'
// import { APIforBackEnd} from '@/api'
// import {AxiosHttpRequest } from '@/api/core/AxiosHttpRequest';
// const api = new APIforBackEnd({},AxiosHttpRequest);

import { useClientStore } from '@/stores/client';
const clientStore = useClientStore();

// onMounted(async ()=>{
//   await clientStore.initStateItem(); // 初始化
//   // console.log("data::-------------",clientStore.clientData.items);
// })
const props = defineProps<{ url: string }>();

import dayjs from 'dayjs';
import axios from 'axios';

// const props = defineProps<{
  // handleMouseOver: (event: MouseEvent,id: string) => void;
  // handleMouseLeave: () => void;
  // queryData: (params: APIParams) => Promise<void>;
  // clientStore: any;
// }>()

// ---------------------------------------------------------------



const handleMouseOver = async (event:MouseEvent,id:string) =>{
  console.log('Hovered over row with ID:', id);
  // 需要优化
  clientStore.data.selectID = id;
  // clientStore.deleteState.selectID = id;
  // clientStore.readState.selectID = id;
}

const handleMouseLeave = () => {
  console.log('Mouse left the row');
};

// export interface APIParams {
// 	// 传入 queryData 的参数
// 	current?: number;
// 	pageSize?: number;
// 	state?: number;
// 	'region[]'?:string;
// }

const queryData = async (params: any):Promise<void> => {
 
  console.log("params--",params);
  await clientStore.read(params);
  // axios.get(`/client`, { params });
  // axios.
};


// --------------------------------------------------------------------------------

// onMounted(()=>{
//   // console.log("data---",dataSource);
//   run({});
// })


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
    totalKey: 'total',
    totalPageKey: 'totalPage'
  },
});

const pagination = computed(() => ({
  total: clientStore.data.total,
  current: current.value,
  pageSize: pageSize.value,
  // searchText: state.searchText
}));

const handleTableChange: TableProps['onChange'] = (
  pag: TablePaginationConfig,
  filters: any,
  sorter: any,
) => {
  console.log('params', pagination, filters, sorter);
  run({
    pagesize: pag.pageSize,
    current: pag?.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
};

</script>

