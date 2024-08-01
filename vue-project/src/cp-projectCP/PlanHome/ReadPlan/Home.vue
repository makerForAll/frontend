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
  <template #extra>
    <slot name="header"></slot>
  </template>
    <!-- 插槽 hearder -->
    
    <!-- 标签页  ----------------------------------------------------------- -->
    <div>
      <!-- <a-spin :spinning="planStore.data.loading"> -->
        <a-skeleton :loading="planStore.data.loading">
      <a-tabs
        v-model:activeKey="activeKey"
        hide-add
        @change="(key: any) => tabClick(key)"
        type="editable-card"
        @edit="onEdit"
      >
        <a-tab-pane
          v-for="pane in planStore.data.RItems"
          :key="pane.id"
          :tab="pane.name"
          :closable="false"
          @click="() => tabClick(pane.id)"
        >
          <!-- {{ pane.key }} -->
          <!-- <component :is="pane?.content" /> -->

          <!-- 插槽 operations -->
          <slot name="operations">
            
          </slot>
          <a-button>生成明细</a-button>
          <a-button>创建分摊</a-button>
          <a-button @click="handlePrint">打印</a-button>
          <a-button >快速分享</a-button>
          <div id="printMe">
            <hr />
            {{ pane }}
            <h1>一、乙方承租商铺基础数据计算</h1>
            <table border="1">
              <thead>
                <tr >
                  <th>序号</th>
                  <th>位置</th>
                  <th>面积(平方)</th>
                  <th>单价(每平米/人民币)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>{{ pane.first_name }}</td>
                  <td>{{ pane.first_area }}</td>
                  <td>{{ pane.first_price }}</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>{{ pane.second_name }}</td>
                  <td>{{ pane.second_area }}</td>
                  <td>{{ pane.second_price }}</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td>{{ pane.third_name }}</td>
                  <td>{{ pane.third_area }}</td>
                  <td>{{ pane.third_price }}</td>
                </tr>
              </tbody>
            </table>
            <!-- <a-table :columns="columns" :dataSource="data" :pagination="false" >
            
            </a-table> -->



            <label :for="`${pane.id}`+'initial_monthly_price'">计租期开始约租金价格(元/每月):</label><input :id="`${pane.id}`+'initial_monthly_price'" :name="`${pane.id}`+'initial_monthly_price'" :disabled="true" :value="pane.initial_monthly_price">
            <br>
            <label :for="`${pane.id}`+'total_area'">面积约(平方)：</label><input :id="`${pane.id}`+'total_area'" :name="`${pane.id}`+'total_area'" :disabled="true" :value="pane.total_area"><br>
            <h1>二、合同基础信息</h1>
            <label :for="`${pane.id}`+'startdate_and_enddate[0]'">合同生效起始日期：</label><input :id="`${pane.id}`+'startdate_and_enddate[0]'" :name="`${pane.id}`+'startdate_and_enddate[0]'" :disabled="true" :value="dayjs(pane.startdate_and_enddate ? pane.startdate_and_enddate[0] : '').format('YYYY-MM-DD')"> <br/>
            <label :for="`${pane.id}`+'startdate_and_enddate[1]'">合同生效截止日期：</label><input :id="`${pane.id}`+'startdate_and_enddate[1]'" :name="`${pane.id}`+'startdate_and_enddate[1]'" :disabled="true" :value="dayjs(pane.startdate_and_enddate ? pane.startdate_and_enddate[1] : '').format('YYYY-MM-DD')"><br/>
            <label :for="`${pane.id}`+'contract_duration_days'">合同天数：</label><input :id="`${pane.id}`+'contract_duration_days'" :name="`${pane.id}`+'contract_duration_days'" :disabled="true" :value="pane.contract_duration_days"><br/>
            <label :for="`${pane.id}`+'payment_interval_months'">租金缴纳周期(每多少月)</label><input :id="`${pane.id}`+'payment_interval_months'" :name="`${pane.id}`+'payment_interval_months'" :disabled="true" :value="pane.payment_interval_months"><br/>
            <label :for="`${pane.id}`+'increase_interval_months'">增长率条件(每多少月)：</label><input :id="`${pane.id}`+'increase_interval_months'" :name="`${pane.id}`+'increase_interval_months'" :disabled="true" :value="pane.increase_interval_months"><br>
            <label :for="`${pane.id}`+'increase_rate'">增长率(百分比)：</label><input :id="`${pane.id}`+'increase_rate'" :name="`${pane.id}`+'increase_rate'" :disabled="true" :value="pane.increase_rate"><br>
            <label :for="`${pane.id}`+'deposit'">押金：</label><input :id="`${pane.id}`+'deposit'" :name="`${pane.id}`+'deposit'" :disabled="true" :value="pane.deposit"><br>

            <!-- <span>租金缴纳周期(每多少月)</span><input :disabled="true" :value="pane.payment_interval_months"><br> -->
            <!-- <span>增长率条件(每多少月)：</span><input :disabled="true" :value="pane.increase_interval_months"><br> -->
            <!-- <span>增长率(百分比)：</span><input :disabled="true" :value="pane.increase_rate"><br> -->
            <!-- <span>押金：</span><input :disabled="true" :value="pane.deposit"><br> -->
            <h1>三、总结-租赁押金和租金支付时间节点及具体金额</h1>
            <h4>押金情况</h4>
            <table border="1">
              <thead>
                <tr>
                  <td>#</td>
                  <td>金额(元)</td>
                  <td>缴纳截止日期</td>
                </tr>
              </thead>
            <tbody>
              
                <tr>
                  <td>押金</td>
                  <td>{{ pane.deposit }}</td>
                  <td>{{ dayjs(pane.startdate_and_enddate ? pane.startdate_and_enddate[1] : '').add(pane.initial_payment_duedays as number, 'day').format('YYYY-MM-DD') }}</td>
                </tr>
              </tbody>
              </table>
              <slot name="pay">

              </slot>
              <h4>合同租金缴纳详情</h4>
              <!-- <a-table :dataSource="dataSource" :columns="columnsTwo" /> -->
              <table border="1" v-if="pane?.payment_detail_item">
              <thead>
                <tr>
                  <td>期数</td>
                  <td>期间开始</td>
                  <td>期间结束</td>
                  <td>金额(元)</td>
                  <td>缴纳截止日期</td>
                  <td>备注</td>
                </tr>
              </thead>
              <div>
              </div>
              <tbody v-for="(payment,index) in pane.payment_detail_item" :key="index">
              <tr >
                <td>{{ index+1}}</td>  
                <td>{{ dayjs(payment?.period_start).format('YYYY-MM-DD') }}</td>
                <td>{{ dayjs(payment?.period_end).format('YYYY-MM-DD') }}</td>
                <td>{{ payment?.amount }}</td>
                <td>{{ dayjs(payment?.due_date).format('YYYY-MM-DD') }}</td>
                <td>{{ payment?.remarks }}</td>
              </tr>
            </tbody>
              </table>
          </div>
        
        </a-tab-pane>
      </a-tabs>
    </a-skeleton>
    <!-- </a-spin> -->

    </div>

    <hr />
    <template #footer>
      <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
      <!-- <a-button type="primary" @click="onClose">Submit</a-button> -->
    </template>
  </a-drawer>
</template>
<script lang="ts" setup>
// import type { APIParams } from '@/api/services/plan'
import { onMounted, reactive, ref, watch } from 'vue'
import { usePagination } from 'vue-request'
import { usePlanStore } from '@/stores/plan'
import { useClientStore } from '@/stores/client'
// import type{PlanBackEndDTO} from '@/api';
import dayjs from 'dayjs';
const planStore = usePlanStore()
const clientStore = useClientStore()

let activeKey = ref<string | undefined>('') // 当前 正在显示的 一栏

let dataSound = reactive([
  { title: `Tab2`, content: `Content of Tab Pane 2`, key: 2 },
  { title: `Tab2`, content: `Content of Tab Pane 3`, key: 3, closable: false }
])

// ------------------- 抽屉层相关事件 -----------------------------
const open = ref<boolean>(false)

const showDrawer = async() => {
  open.value = true
  await planStore.readByClientId(clientStore.data.selectID as string)
  // 逻辑梳理
  // if (clientStore.data.selectID) {
  //  await planStore.readByClientId(clientStore.data.selectID as string)
  //   // console.log("openDrawerPlan:---",plan);
    
  //       // tab 初始化
  //   if (
  //     planStore?.data.selectID === undefined ||
  //     planStore?.data.selectID === '' ||
  //     planStore?.data.selectID === ''
  //   ) {
  //     console.log('test--:',planStore?.data?.items[0]?.id)
      
  //     planStore.data.selectID = planStore?.data?.items[0]?.id as string;
  //     activeKey.value = planStore?.data?.items[0]?.id
  //   }
  // }


}

const onClose = () => {
  open.value = false
}

// ---------------------------------------------------------------

// --------------------------- 标签页 层 ------------------------------------

const tabClick = async (id: any) => {
  console.log('zujian:', id)
  planStore.data.selectID = id
  planStore.data.selectID = id
}

const onEdit = (targetKey: string | undefined) => {
  // remove(targetKey);
}

// onMounted(()=>{
//   activeKey.value = planStore?.readState?.items[0]?.id;
//   planStore.updateState.selectID = planStore?.readState?.items[0]?.id;
// })

// watch(
//   () => planStore.readState.formatItems,
//   (newItems, oldItems) => {
//     Object.assign(dataSound,newItems);
//     console.log('formatItems changed:', newItems);
//   },
//   { deep: true }
// );

// ------------------- 打印内容层 -------------------------------
import { VuePrintNext } from 'vue-print-next'

function handlePrint() {
  new VuePrintNext({ el: '#printMe' /** 其他参数 */ })
}

const columns = [
{
    title: '序号',
    dataIndex: 'index',
    width: '14%'
  },
  {
    title: '位置1',
    dataIndex: 'first_name',
    width: '14%'
  },
  {
    title: '面积(平米)',
    dataIndex: 'first_area',
    width: '15%'
  },
  {
    title: '单价(人民币)',
    dataIndex: 'first_price',
    width: '15%'
  }
]

// const paneData = (pane: any) => [
//   { index: '1', first_name: pane.first_name, first_area: pane.first_area, first_price: pane.first_price },
//   { index: '2', first_name: pane.second_name, first_area: pane.second_area, first_price: pane.second_price },
//   { index: 3, first_name: pane.third_name, first_area: pane.third_area, first_price: pane.third_price }
// ]

const data = [{ first_name: '1', first_area: '123', first_price: 'faf' }]
// ----------------------------------------

// ----------------  打印的内容2【支付明细相关】  ------------------------
// 根据 plan的基础数据，来计算出 Paymentdetail 的内容，然后进行创建。
const calPaymentdetail = () =>{

}

const columnsTwo = () =>{

}
</script>

<style>
table {
      width: 100%;
      border-collapse: collapse;
      table-layout: auto;
    }

    th, td {
      padding: 8px 12px;
      text-align: left;
    }

    th {
      background-color: #f2f2f2;
    }

    td {
      white-space: nowrap;
    }
</style>