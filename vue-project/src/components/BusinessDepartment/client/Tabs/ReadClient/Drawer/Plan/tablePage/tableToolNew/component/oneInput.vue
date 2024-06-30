<template>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleAdd">增加</a-button>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="handleCal">计算</a-button>
    <a-button class="editable-add-btn" style="margin-bottom: 8px" @click="correctingFlaws">修改瑕疵</a-button>
    <a-button type="primary" @click="handleClick">生成内容【一】</a-button>
    <div id="forOne">
      <!-- <div style="float:right">附件-清单参考</div> -->
      <h2>一.乙方承租商铺基础数据计算</h2>
      
      <a-table  :columns="columns" :data-source="dataSource" bordered :pagination="false" :key="tableKey">
      <template #bodyCell="{ column, text, record }">
  
        <template v-if="['unityCode', 'type', 'floor', 'area', 'rent', 'note'].includes(column.dataIndex)">
          <div>
            <a-input v-if="editableData[record.key]" v-model:value="editableData[record.key][column.dataIndex]"
              style="margin: -5px 0" />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
  
        <template v-else-if="column.dataIndex === 'operation'">
          <!-- 编辑 -->
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
          <!-- 删除 -->
          <a-popconfirm v-if="dataSource.length" title="Sure to delete?" @confirm="onDelete(record.key)">
            <a>Delete</a>
          </a-popconfirm>
        </template>
  
      </template>
    </a-table>
    <!-- 打印计算结果 -->
    <div v-for="(element, index) in htmlDiv" :key="index" v-html="element.htmlElement"></div>
    </div>
  </template>
  <script lang="ts">
  import { cloneDeep } from 'lodash-es';
  import { computed, defineComponent, reactive, ref } from 'vue';
  import type { UnwrapRef } from 'vue';
  import { number } from 'vue-types';
  
  const columns = [
    {
      title: '单元编号',
      dataIndex: 'unityCode',
      width: '14%',
    },
    {
      title: '类型',
      dataIndex: 'type',
      width: '14%',
    },
    {
      title: '楼层',
      dataIndex: 'floor',
      width: '10%',
    }, {
      title: '面积(平米)',
      dataIndex: 'area',
      width: '15%',
    }, {
      title: '租金(元/平方米/月)',
      dataIndex: 'rent',
      width: '15%',
    }, {
      title: '备注',
      dataIndex: 'note',
      width: '20%',
    },
    {
      title: 'operation',
      dataIndex: 'operation',
    },
  ];
  interface DataItem {
    key: string;
    unityCode: string;
    type: string;
    floor: string;
    area: string;
    rent: string;
    note: string;
    [key: string]: string | number;
  }
  
  const data: DataItem[] = [];  
  export default defineComponent({
    emits: ['update'],
      methods: {
          handleClick() {
              // 触发自定义事件并传递数据
              this.$emit('update',this.getDom,this.calObject);
          }
      },
    setup() {
      const tableKey = ref(0);
      const dataSource = ref(data);
      // 创建 响应式变量，记录 数据变化后的长度
      const htmlDiv = ref<any>([]);
      const count = computed(() => dataSource.value.length + 1);
      const editableData: UnwrapRef<Record<string, DataItem>> = reactive({});
      // 把子组件的节点传给父组件
      const getDom = ref<HTMLElement | any>(); //document.getElementById("forOne")
      const calObject = reactive<any>({
        calDataTotalRent: 0,
        calDataTotalArea: 0
      });
  
      // const emit = defineEmits(['update']);
      // const handleClick=() => {
      //         // 触发自定义事件并传递数据
      //         emit('update', getDom);
      //     }
      // 每次 触发该方法，count.value 被使用后，就会计算当前长度。
      const handleAdd = () => {
        const newData = {
          key: `${count.value}`,
          unityCode: '',
          type: '',
          floor: '',
          area: '',
          rent: '',
          note: ''
        };
        dataSource.value.push(newData);
      };
      const correctingFlaws = () => { // 修改瑕疵
        columns.pop();
        console.log(columns);
        tableKey.value += 1;
      }
      const handleCal = () => { // 根据 dataSource 中的数据，计算出 第一个租赁年度租金
        getDom.value = document.getElementById("forOne");
        let calDataTotalRent = 0;
        let calDataTotalArea = 0;
        for (let index = 0; index < dataSource.value.length; index++) {
          const elementRent = Number(dataSource.value[index].area) * Number(dataSource.value[index].rent); // 当前 单元 的 每月应付房租价格
          calDataTotalRent += elementRent;
          const elementArea = Number(dataSource.value[index].area);
          calDataTotalArea += elementArea
        }
        calObject.calDataTotalRent = calDataTotalRent.toFixed(2);
        calObject.calDataTotalArea = calDataTotalArea;
        console.log(calDataTotalRent);
        console.log(calDataTotalArea);
        console.log(calDataTotalRent / calDataTotalArea);
        // 添加html标签，展示计算结果
        htmlDiv.value.push({
          htmlElement:`
          <br>
          <label for="calDataTotalRent">计租期开始月租金价格(元/月):</label>
          <input id="calDataTotalRent" type="text" style="width:20%" value="${calDataTotalRent.toFixed(2)}" disabled/>
          <br>
          <label for="calDataTotalRent">面积约为(平米):</label>
          <input id="calDataTotalRent" type="text" style="width:20%" value="${calDataTotalArea}" disabled/>
          <br>
          `
        });
        // <label for="calDataTotalRent">最终租金标准(元/平米/月):</label>
        //   <input id="calDataTotalRent" type="text" style="width:20%" value="${calDataTotalRent / calDataTotalArea}" disabled/>
      };
      const edit = (key: string) => {
        editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0]);
      };
      const save = (key: string) => {
        Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key]);
        delete editableData[key];
        console.log(dataSource.value);
      };
      const cancel = (key: string) => {
        delete editableData[key];
      };
      const onDelete = (key: string) => {
        dataSource.value = dataSource.value.filter(item => item.key !== key);
      };
      return {
        dataSource,
        htmlDiv,
        columns,
        editingKey: '',
        editableData,
        edit,
        save,
        cancel,
        handleAdd,
        handleCal,
        onDelete,
        getDom,
        calObject,
        correctingFlaws,
        tableKey
      };
    },
  });
  </script>
  <style scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
  </style>
  