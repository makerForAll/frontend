import dayjs, { Dayjs } from 'dayjs';
import { ref } from 'vue';
import { calculateTotalMonthsAndDays } from './helpersFun-dayjs';
import type { PlanDTO } from '@/api';
import { calculatePeriodDates } from './helpersFun-payment';

// 计划输入值
const plan = {
  average_price: 35, // 平均价格
  total_area: 54.83, // 总面积
  startdate_and_enddate: ["2023-05-24", "2026/04/5"], // 开始和结束日期
  payment_interval_months: 12, // 支付间隔月数
  initial_monthly_price: 1919.05, // 初始月价格
  contract_duration_days: 1095, // 合同持续天数
  rent_free_months: 6, // 免租期月数
  increase_interval_months: 12, // 增长间隔月数
  increase_rate: 0.03, // 增长率
};


// ------------------------------------------------------------------------
// 步骤1: 计算每期的开始和结束日期
// calculatePeriodDates(plan);

// 步骤2: 计算每期中有多少个月要收租金的数组
function calculateMonthsArray(PeriodStarts: string[], PeriodEnds: string[], numberOfPeriods: number) {
  const monthsArray: number[][] = []; // 每期的月份数组

  // console.log('步骤2: 计算每期中有多少个月要收租金的数组');
  for (let i = 0; i < numberOfPeriods; i++) {
    const startPeriod = dayjs(PeriodStarts[i]);
    const endPeriod = dayjs(PeriodEnds[i]);
    const months = endPeriod.diff(startPeriod, 'month') + 1;
    const monthsInPeriod = new Array(months).fill(plan.average_price * plan.total_area); // 每个月的金额数组
    if (i === numberOfPeriods - 1 && plan.rent_free_months > 0) {
      monthsInPeriod.fill(0, 0, plan.rent_free_months); // 最后一期的免租期
    }
    monthsArray.push(monthsInPeriod);
    // console.log(`第${i + 1}期的月份数组:`, monthsInPeriod);
  }

  return monthsArray;
}

// 步骤3: 计算每期的金额
function calculateAmounts(PeriodStarts: string[], PeriodEnds: string[], numberOfPeriods: number) {
  const Amount: number[] = []; // 每期的金额数组

  // console.log('步骤3: 计算每期的金额');
  for (let i = 0; i < numberOfPeriods; i++) {
    const startPeriod = dayjs(PeriodStarts[i]);
    const endPeriod = dayjs(PeriodEnds[i]);
    const monthsInPeriod = endPeriod.diff(startPeriod, 'month') + 1;
    const increaseMultiplier = Math.pow(1 + plan.increase_rate, i); // 增长倍数
    Amount.push(monthsInPeriod * plan.average_price * plan.total_area * increaseMultiplier);
    // console.log(`第${i + 1}期的金额:`, Amount[i]);
  }

  return Amount;
}

// // 步骤4: 生成支付详情
// export function generatePaymentDetails() {
//   const { periodStarts, periodEnds, numberOfPeriods } = calculatePeriodDates(plan,current);
//   const Amount = calculateAmounts(periodStarts, periodEnds, numberOfPeriods);
//   const monthsArray = calculateMonthsArray(periodStarts, periodEnds, numberOfPeriods);

//   const Due_date: string[] = []; // 每期的到期日期数组
//   const Remarks: string[] = []; // 每期的备注数组
//   const paymentDetails: any[] = []; // 支付详情数组

//   // console.log('步骤4: 生成支付详情');
//   for (let i = 0; i < numberOfPeriods; i++) {
//     const currentEndDate = dayjs(periodEnds[i]);
//     const dueDate = currentEndDate.add(1, 'month').startOf('month'); // 每期的到期日期
//     Due_date.push(dueDate.format('YYYY-MM-DD'));

//     if (i === numberOfPeriods - 1 && plan.rent_free_months > 0) {
//       Remarks.push(`免租期：${plan.rent_free_months}个月`);
//     } else {
//       Remarks.push(''); // 没有免租期的备注为空
//     }

//     const detail = {
//       period_start: periodStarts[i], // 期开始日期
//       period_end: periodEnds[i], // 期结束日期
//       amount: Amount[i], // 金额
//       due_date: Due_date[i], // 到期日期
//       is_paid: false, // 是否支付
//       is_split_payment: false, // 是否分期支付
//       remarks: Remarks[i], // 备注
//     };
//     paymentDetails.push(detail);

//     // console.log(`第${i + 1}期的支付详情:`, detail);
//   }

//   const getdata = calculatePaymentSchedule(plan.startdate_and_enddate,plan.payment_interval_months,plan.rent_free_months);
//   console.log('----------------------------最终结果:',getdata);
//   // console.log('  PeriodStarts:', PeriodStarts);
//   // console.log('  PeriodEnds:', PeriodEnds);
//   // console.log('  Amount:', Amount);
//   // console.log('  Due_date:', Due_date);
//   // console.log('  Remarks:', Remarks);
//   // console.log('  每期月份数组:', monthsArray);

//   return paymentDetails;
// }



// 定义函数，参数与原函数一致
export const calculatePaymentSchedule = (
  startdate_and_enddate:string[],
  paymentIntervalMonths: number, // 支付间隔月份
  rentFreeMonths: number, // 免租期月份,
 
): number[] => {

  const paymentSchedule: number[] = [];
  const paymentSchedule_day:number[] = [];
  // 明确概念 什么是 1个月， 是什么1年，什么是 月占比
  // 有没有一种方式，记录 月份信息 和 天数信息，更精确的提高计算金额。

  // 输入对象
  const startDate = dayjs(startdate_and_enddate[0]);
  const endDate = dayjs(startdate_and_enddate[1]);

  // 计算两个日期之间的月份数 以及 天数 -------------------
  calculateTotalMonthsAndDays(startDate,endDate);
    

    // 计算两个日期之间的月份数 -------------------
 endDate.subtract(1,'month')
const monthsBetween = endDate.add(1,'day').diff(startDate, 'month');
  // 通过 contractDurationDays 计算得到的总租赁月份
  
  const totalLeaseMonths = monthsBetween;
  console.log("totalLeaseMonths:",totalLeaseMonths);
  // 租赁期限扣除免租期后的有效租赁月份
  let effectiveLeaseMonths = totalLeaseMonths - rentFreeMonths;
  console.log("effectiveLeaseMonths:",effectiveLeaseMonths);
  // 计算需要的支付周期数
  const numPeriods = Math.ceil(effectiveLeaseMonths / paymentIntervalMonths) + 1;
  console.log("numPeriods:",numPeriods);
  console.log("paymentIntervalMonths:",paymentIntervalMonths);
  
  for (let i = 0; i < numPeriods; i++) {
      if (effectiveLeaseMonths >= paymentIntervalMonths) { // 常规情况
          paymentSchedule.push(paymentIntervalMonths); // 添加支付周期
          effectiveLeaseMonths -= paymentIntervalMonths; // 减少有效租赁月份
      } else if (effectiveLeaseMonths > 0) { // 剩余月份小于支付周期
          paymentSchedule.push(effectiveLeaseMonths); // 添加剩余月份
          effectiveLeaseMonths = 0; // 剩余有效租赁月份为零
      } else { // 免租期
          paymentSchedule.push(rentFreeMonths); // 添加免租期
      }
  }

  console.log("paymentSchedule", paymentSchedule);
  return paymentSchedule;
};

