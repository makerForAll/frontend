<template>
  <DrawerSlotView
    :action="'录入'"
    :entityType="'方案'"
    v-model="planStore.data.item"
    :fields="planFields"
    :rules="rules"
    @handleSubmit="handleSubmit"
    @fieldChange="fieldChange"
    @showDrawer="showDrawer"
  >
  </DrawerSlotView>
</template>

<script setup lang="ts">

// import type { Plan } from '@/api/services/plan';
import DrawerSlotView from '@/cp-v1/cp-GCP/Drawer/DrawerSlot4.vue'
import { useClientStore } from '@/stores/client';
import { usePlanStore } from '@/stores/plan'
import type { Rule } from 'ant-design-vue/es/form'
import { ref } from 'vue';
import type {Field} from '@/cp-v1/cp-GCP/Drawer/DrawerSlot4.vue';
import type { PlanBackEndDTO } from '@/api';

// import {reactive } from 'vue';

// let planForm = reactive({...initPlanForm})

// 监听 first_area、second_area 和 third_area 的变化
// watch([() => planForm.first_area, () => planForm.second_area, () => planForm.third_area], () => {
//   console.log("total:");
//     computeTotalArea();
// });

// watch(totalArea, (newValue) => {
//     planForm.total_area = newValue.toString();
// });

// --- 匹配业务需求 计算几个变量名，然后复制给另外一个变量名
// const computeTotalArea = () => {
//     const area1 = parseFloat(planForm.first_area) || 0;
//     const area2 = parseFloat(planForm.second_area) || 0;
//     const area3 = parseFloat(planForm.third_area) || 0;
//     const total = area1 + area2 + area3;
//     planForm.total_area = total.toString();
//     // return area1 + area2 + area3;
// };

const planFields:Field[] = [
  {
    name: 'name',
    label: '方案名称',
    component: 'a-input',
    props: { placeholder: 'Enter name' },
    span: 8
  },
  {
    name: 'contract_type',
    label: '合同类型',
    component: 'a-select',
    props: {
      placeholder: 'Select contract type',
      options: [
        { value: '1', label: '租赁合同' },
        { value: '2', label: '销售合同' },
        { value: '9', label: '其他' }
      ]
    },
    span: 8
  },
  {
    name: 'contract_status',
    label: '合同状态',
    component: 'a-select',
    props: {
      options: [
        { value: '1', label: '起草' },
        { value: '2', label: '正常履行' },
        { value: '9', label: '其他' }
      ]
    },
    span: 8
  },
  // {
  //   name: 'dynamic_field',
  //   label: '动态字段',
  //   component: 'a-input-dynamic',
  //   props: {},
  //   span: 24
  // },
  {
    name: 'first_name',
    label: '位置1',
    component: 'a-input',
    props: { placeholder: 'Enter first name' },
    span: 8
  },
  {
    name: 'first_area',
    label: '面积1',
    component: 'a-input-number',
    props: { placeholder: 'Enter first area',addonAfter:"㎡" },
    span: 8
  },
  {
    name: 'first_price',
    label: '价格1',
    component: 'a-input-number',
    props: { placeholder: 'Enter first price' ,addonAfter:"¥" },
    span: 8
  },
  {
    name: 'second_name',
    label: '位置2',
    component: 'a-input',
    props: { placeholder: 'Enter second name' },
    span: 8
  },
  {
    name: 'second_area',
    label: '面积2',
    component: 'a-input-number',
    props: { placeholder: 'Enter second area' ,addonAfter:"㎡"},
    span: 8
  },
  {
    name: 'second_price',
    label: '价格2',
    component: 'a-input-number',
    props: { placeholder: 'Enter second price',addonAfter:"¥"  },
    span: 8
  },
  {
    name: 'third_name',
    label: '位置3',
    component: 'a-input',
    props: { placeholder: 'Enter third name' },
    span: 8
  },
  {
    name: 'third_area',
    label: '面积3',
    component: 'a-input-number',
    props: { placeholder: 'Enter third area', addonAfter:"㎡"},
    span: 8
  },
  {
    name: 'third_price',
    label: '价格3',
    component: 'a-input-number',
    props: { placeholder: 'Enter third price' ,addonAfter:"¥" },
    span: 8
  },
 
  {
    name: 'is_default',
    label: '是否默认',
    component: 'a-switch',
    props: { disabled: true },
    span: 8
  },
  {
    name: 'total_area',
    label: '合计面积',
    component: 'a-input-number',
    props: { placeholder: 'Enter total area', disabled: true ,addonAfter:"㎡"},
    span: 8
  },
  {
    name: 'average_price',
    label: '平均价格',
    component: 'a-input-number',
    props: { placeholder: 'Enter average price', disabled: true ,addonAfter:"¥"},
    span: 8
  },
 
  // { name: 'record_type', label: '是否默认', component: 'a-input', props: { placeholder: 'Enter record type' } },
  // { name: 'contract_duration_months', label: 'Contract Duration (Months)', component: 'a-input', props: { placeholder: 'Enter contract duration (months)' } },
  {
    name: 'startdate_and_enddate',
    label: '合同生效日期',
    component: 'a-range-picker',
    props: { placeholder: 'Select start date' },
    span: 16
  },
  {
    name: 'initial_monthly_price',
    label: '初期每月费用',
    component: 'a-input-number',
    props: { placeholder: 'Enter initial monthly price', disabled: true ,addonAfter:"¥"},
    span: 8
  },
  
  {
    name: 'increase_interval_months',
    label: '增长率条件（每多少个月）',
    component: 'a-select',
    props: {
      options: [
        { value:12, label: '每12个月' },
        { value: 24, label: '每24个月' },
        { value: 36, label: '每36个月' }
      ]
    },
    span: 8
  },
  { name: 'increase_rate', label: '增长率（百分比）', component: 'a-input-number', props: { placeholder: '6', addonAfter:"%" },span: 8 },
  { name: 'deposit', label: '押金', component: 'a-input-number', props: { placeholder: '500' ,addonAfter:"¥"} ,span: 8 },
  
  {
    name: 'payment_interval_months',
    label: '付款周期(每多少个月支付)',
    component: 'a-select',
    props: {
      options: [
        { value: 3, label: '每3个月' },
        { value: 6, label: '每6个月' },
        { value: 12, label: '每12个月' }
      ]
    },
    span: 8
  },
  
  { name: 'rent_free_months', label: 'JM', component: 'a-input-number', props: { placeholder: 'Enter rent free (months)' , addonAfter:"月"} ,span: 8},
  // { name: 'total_amount', label: 'Total Amount', component: 'a-input-number', props: { placeholder: 'Enter total amount' ,addonAfter:"¥", disabled: true} ,span: 8},
  // { name: 'initial_payment_duedays', label: '首期费用缴纳截止?', component: 'a-input-number', props: { placeholder: 'Enter initial payment due days', addonBefore:"第",addonAfter:"天", disabled: true} ,span: 8},
  // { name: 'recurring_payment_duedays', label: '每期支付提前多久?', component: 'a-input-number', props: { placeholder: 'Enter recurring payment due days', addonAfter:"个月", disabled: true} ,span: 8},
  
  { name: 'remarks', label: '备注信息', component: 'a-input', props: { placeholder: 'Enter remarks' } },
]

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter name' }],
  first_name: [{ required: true, message: 'Please enter first name' }],
  dynamic_field: [{ required: true, message: 'Please add at least one dynamic field' }],
  first_area: [{ required: true, message: 'Please enter first area' }],
  first_price: [{ required: true, message: 'Please enter first price' }],
  second_name: [{ required: false, message: 'Please enter second name' }],
  second_area: [{ required: false, message: 'Please enter second area' }],
  second_price: [{ required: false, message: 'Please enter second price' }],
  third_name: [{ required: false, message: 'Please enter third name' }],
  third_area: [{ required: false, message: 'Please enter third area' }],
  third_price: [{ required: false, message: 'Please enter third price' }],
  total_area: [{ required: true, message: 'Please enter total area' }],
  average_price: [{ required: true, message: 'Please enter average price' }],
  initial_monthly_price: [{ required: true, message: 'Please enter initial monthly price' }],
  contract_type: [{ required: true, message: 'Please select contract type' }],
  contract_status: [{ required: true, message: 'Please select contract status' }],
  is_default: [{ required: true, message: 'Please enter record type' }],
  // record_type: [{ required: true, message: 'Please enter record type' }],
  // contract_duration_months: [{ required: true, message: 'Please enter contract duration (months)' }],
  startdate_and_enddate: [{ required: false, message: 'Please select start date' }],
  // payment_interval_months: [{ required: true, message: 'Please enter payment interval (months)' }],
  // increase_interval_months: [{ required: true, message: 'Please enter increase interval (months)' }],
  // increase_rate: [{ required: true, message: 'Please enter increase rate (%)' }],
  // deposit: [{ required: true, message: 'Please enter deposit (元)' }],
  // rent_free_months: [{ required: true, message: 'Please enter rent free (months)' }],
  // initial_payment_duedays: [{ required: true, message: 'Please enter initial payment due days' }],
  // recurring_payment_duedays: [{ required: true, message: 'Please enter recurring payment due days' }],
  // total_amount: [{ required: true, message: 'Please enter total amount' }],
  // remarks: [{ required: false, message: 'Please enter remarks' }]
}

// -------------------------------------  pinia层 数据交互 -------------------------------------------------------------------
// const {create, runCal } = usePlanStore()
const clientState=useClientStore();
const planStore = usePlanStore()

const showDrawer = async () => {
  // 重置form
  await planStore.initState()
  // planStore.data.item.client = planStore.data.selectID;
}

const handleSubmit = async (form: any) => {
  // 获取的创建填入的数据，并使用pinia的方法来进行创建数据模型
  console.log("form数据:",form);
  // 创建plan 时，关联 指定ID的Client
  await planStore.create(clientState.data.selectID as string,form);
}

// const computeTotalArea = () => {
//     const area1 = parseFloat(planForm.first_area) || 0;
//     const area2 = parseFloat(planForm.second_area) || 0;
//     const area3 = parseFloat(planForm.third_area) || 0;
//     const total = area1 + area2 + area3;
//     planForm.total_area = total.toFixed(2).toString(); // 格式化为2位小数并转换为字符串
//     console.log("total:",planForm.total_area);

// };
// 识别 -------------------------------------------------------
// const previousValues = ref({
//   first_area: 0,
//   second_area: 0,
//   third_area: 0,
//   first_price: 0,
//   second_price: 0,
//   third_price: 0,
// });

const fieldChange = async (form: PlanBackEndDTO) => {
//   // 使用解构赋值并提供默认值
//   const {
//     first_area = 0,
//     second_area = 0,
//     third_area = 0,
//     first_price = 0,
//     second_price = 0,
//     third_price = 0
//   } = form;

//   // 获取之前的值
//   const prev = previousValues.value;

//   // 检查是否有任何一个属性值发生变化
//   const hasChanged = (
//     first_area !== prev.first_area ||
//     second_area !== prev.second_area ||
//     third_area !== prev.third_area ||
//     first_price !== prev.first_price ||
//     second_price !== prev.second_price ||
//     third_price !== prev.third_price
//   );

//   if (hasChanged) {
//     // 如果有变化，执行 runCal
planStore.runCal();

//     // 更新 previousValues
//     previousValues.value = {
//       first_area,
//       second_area,
//       third_area,
//       first_price,
//       second_price,
//       third_price,
//     };
//   }

planStore.data.item = form
  // computeTotalArea();
}
// -------------------------------------  pinia层 数据交互 -------------------------------------------------------------------
</script>

<style scoped></style>
