
<template>
    <DrawerSlotView
    :action="'录入'"
    :entityType="'方案'"
    :type="'create'"
    v-model="planForm" 
    :fields="planFields" 
    :rules="rules" 
    @handleSubmit="handleSubmit"
    @fieldChange="fieldChange"
    >

    </DrawerSlotView>
</template>

<script setup lang="ts">
import { initPlanForm } from '@/api/services/plan';
import DrawerSlotView from '@/cp-v1/cp-GCP/Drawer/DrawerSlot3.vue'
import { usePlanStore } from '@/stores/plan';
import type { Rule } from 'ant-design-vue/es/form';
import { computed, reactive, watch } from 'vue';

let planForm = reactive({...initPlanForm})


const computeTotalArea = () => {
    const area1 = parseFloat(planForm.first_area) || 0;
    const area2 = parseFloat(planForm.second_area) || 0;
    const area3 = parseFloat(planForm.third_area) || 0;
    const total = area1 + area2 + area3;
    planForm.total_area = total.toFixed(2).toString(); // 格式化为2位小数并转换为字符串
    console.log("total:",planForm.total_area);
    
};

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

const fieldChange = (form:any) => {
    console.log("test fieldChange");
    planForm = {...form};
    console.log("data:",planForm);
    computeTotalArea();
};

const planFields = [
  { name: 'name', label: '方案名称', component: 'a-input', props: { placeholder: 'Enter name' } ,span:8},
  { name: 'contract_type', label: '合同类型', component: 'a-select', 
    props: { 
      placeholder: 'Select contract type', 
      options: [
      { value: '租赁合同', label: '租赁合同' },
      { value: '销售合同', label: '销售合同' },
      { value: '其他', label: '其他' }],}, 
    span: 8 },
    { name: 'contract_status', label: '合同状态', component: 'a-select', 
    props: { 
      options: [
      { value: '起草', label: '起草' },
      { value: '正常履行', label: '正常履行' },
      { value: '其他', label: '其他' }
      ] },
    span:8
    },
  { name: 'first_name', label: '位置1', component: 'a-input', props: { placeholder: 'Enter first name' },span:8 },
  { name: 'first_area', label: '面积1', component: 'a-input', props: { placeholder: 'Enter first area' } ,span:8 },
  { name: 'first_price', label: '价格1', component: 'a-input', props: { placeholder: 'Enter first price' } ,span:8 },
  { name: 'second_name', label: '位置2', component: 'a-input', props: { placeholder: 'Enter second name' } ,span:8 },
  { name: 'second_area', label: '面积2', component: 'a-input', props: { placeholder: 'Enter second area' } ,span:8},
  { name: 'second_price', label: '价格2', component: 'a-input', props: { placeholder: 'Enter second price' } ,span:8 },
  { name: 'third_name', label: '位置3', component: 'a-input', props: { placeholder: 'Enter third name' } ,span:8 },
  { name: 'third_area', label: '面积3', component: 'a-input', props: { placeholder: 'Enter third area' } ,span:8 },
  { name: 'third_price', label: '价格3', component: 'a-input', props: { placeholder: 'Enter third price' } ,span:8 },
  { name: 'total_area', label: '合计面积', component: 'a-input', props: { placeholder: 'Enter total area' ,disabled:true},span:8  },
  { name: 'average_price', label: '平均价格', component: 'a-input', props: { placeholder: 'Enter average price' ,disabled:true} ,span:8 },
  { name: 'initial_monthly_price', label: '初期每月费用', component: 'a-input', props: { placeholder: 'Enter initial monthly price' ,disabled:true},span:8  },

{ name: 'is_default', label: '是否默认', component: 'a-switch', props: { disabled:true},span:8 },
  // { name: 'record_type', label: '是否默认', component: 'a-input', props: { placeholder: 'Enter record type' } },
  // { name: 'contract_duration_months', label: 'Contract Duration (Months)', component: 'a-input', props: { placeholder: 'Enter contract duration (months)' } },
  { name: 'startdate_and_enddate', label: '合同生效日期', component: 'a-date-picker', props: { placeholder: 'Select start date' } ,span:16 },
  // { name: 'payment_interval_months', label: 'Payment Interval (Months)', component: 'a-input', props: { placeholder: 'Enter payment interval (months)' } },
  // { name: 'increase_interval_months', label: 'Increase Interval (Months)', component: 'a-input', props: { placeholder: 'Enter increase interval (months)' } },
  // { name: 'increase_rate', label: 'Increase Rate (%)', component: 'a-input', props: { placeholder: 'Enter increase rate (%)' } },
  // { name: 'deposit', label: 'Deposit (元)', component: 'a-input', props: { placeholder: 'Enter deposit (元)' } },
  // { name: 'rent_free_months', label: 'Rent Free (Months)', component: 'a-input', props: { placeholder: 'Enter rent free (months)' } },
  // { name: 'initial_payment_duedays', label: 'Initial Payment Due Days', component: 'a-input', props: { placeholder: 'Enter initial payment due days' } },
  // { name: 'recurring_payment_duedays', label: 'Recurring Payment Due Days', component: 'a-input', props: { placeholder: 'Enter recurring payment due days' } },
  // { name: 'total_amount', label: 'Total Amount', component: 'a-input', props: { placeholder: 'Enter total amount' } },
  // { name: 'remarks', label: 'Remarks', component: 'a-input', props: { placeholder: 'Enter remarks' } },
];

const rules: Record<string, Rule[]> = {
  name: [{ required: true, message: 'Please enter name' }],
  first_name: [{ required: true, message: 'Please enter first name' }],
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
};

const planStore = usePlanStore();
const handleSubmit = async (form: any) =>{ // 获取的创建填入的数据，并使用pinia的方法来进行创建数据模型

 await planStore.create(form);
}

</script>

<style scoped>

</style>