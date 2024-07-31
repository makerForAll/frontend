import type { PlanDTO } from '@/api';
import { calculateAmountsAndPeriods, calculateMonthsArray, calculatePeriodDates, calculatePeriodDates2, calculatePeriodDates3, due_dateFun, paymentAmountCycleArray, remarksFun, resultsFun, transferArrayFun } from './helpersFun-payment';
import { calculateTotalMonthsAndDays } from './helpersFun-dayjs';
// import dayjs from 'dayjs';
import type { PaymentDetailItemVO } from '@/cp-projectCP/PaymentDetailItemHome/Vo/PaymentDetailItem.vo';

import dayjs, {type Dayjs } from 'dayjs';
// import 'dayjs/locale/zh-cn';
// dayjs.locale('cn');
// 定义函数，接收计划数据并返回相关计算结果
export function paymentMainFun(plan: PlanDTO) {
//-------------------------------------
const startdate = dayjs(plan.startdate_and_enddate?.[0]);
console.log("🚀 ~ paymentMainFun ~ startdate:", startdate)
const enddate = dayjs(plan.startdate_and_enddate?.[1])
console.log("🚀 ~ paymentMainFun ~ enddate:", enddate)

// ------------------------------------------------------------------------------------------------
// 步骤一
// 总月数及天数

const {
    currentMonths,
    fullMonths,
    lastMonthDays,
    countDaysInMonth} = calculateTotalMonthsAndDays(startdate,enddate);
console.log("culateTotalMonthsAndDays:",currentMonths);
/**
 * 得到 
 * currentMonths 总月数
 * ------------------------------------------
*/
// ------------------------------------------------------------------------------------------------
// 步骤二
// 增长周期 数组 与 获取 增长金额周期 数组
/**
 * 
 * 关键变量：
    * 合同的 起始时间 与 截止时间
    * 增长条件
    * 增长率
    * 初期月价格
    * 
    * 总月数【从步骤一 获取】 culateTotalMonthsAndDays
 */
const {amountsArr,periods} = calculateAmountsAndPeriods(plan,currentMonths);
/**
 * 得到 
 * amountsArr 增长周期 数组
 * periods 增长金额周期 数组
 * ----------------------------------------------
*/
console.log("🚀 ~ paymentMainFun ~ periods:", periods)
console.log("🚀 ~ paymentMainFun ~ amountsArr:", amountsArr)

// ------------------------------------------------------------------------------------------------
// 步骤三
// 租金支付的月份周期 数组
/**
 * 
 * 关键变量：
*   plan
 */
 const {rentPaymentMonthsCycleArray} = calculateMonthsArray(plan,currentMonths);
 console.log("🚀 ~ rentPaymentMonthsCycleArray:", rentPaymentMonthsCycleArray)
 /**
 * 得到 
 * 租金支付的月份周期 数组
 * ----------------------------------------------
*/
 // ------------------------------------------------------------------------------------------------
// 步骤四
// 获得 通过上面的数据，先 拿到中转 数组数据中，储存。
/**
 * 
 * 关键变量：
*   amountsArr
*   periods
 */
const { transferArray } = transferArrayFun(plan,periods,amountsArr);
console.log("🚀 ~ paymentMainFun ~ transferArraytest:", transferArray)


 // ------------------------------------------------------------------------------------------------
// 步骤五
// 将中转数据 按照排序填充到 新数组中【对比 支付 周期 规律 数组】
/**
 * 
 * 关键变量：
*   amountsArr
*   periods
 */

const {paymentAmountArr} =paymentAmountCycleArray(plan,rentPaymentMonthsCycleArray,transferArray);

console.log("🚀 ~ paymentAmountCycleArray ~ get:", paymentAmountArr)
 /**
 * 得到 
 * 最终效果支付明细金额
 * ----------------------------------------------
 */
 // ------------------------------------------------------------------------------------------------
 // 步骤六
// 根据 上面数据，得到 每一期的 期间开始 与 期间结束。
/**
 * 
 * 关键变量：
*   amountsArr
*   periods
* */

const { periodStarts } = calculatePeriodDates2(plan, fullMonths, lastMonthDays,paymentAmountArr);
const { periodEnds } = calculatePeriodDates3(plan, fullMonths, lastMonthDays,paymentAmountArr);
console.log("🚀 ~ paymentMainFun ~ periodStarts:", periodStarts)
console.log("🚀 ~ paymentMainFun ~ periodEnds:", periodEnds)

/*
* ----------------------------------------------
*/
// ------------------------------------------------------------------------------------------------

 // 步骤七
// 缴纳截止日期
const {due_dateArr} = due_dateFun(periodStarts);
console.log("🚀 ~ paymentMainFun ~ due_dateArr:", due_dateArr)

/*
* ----------------------------------------------
*/

// ------------------------------------------------------------------------------------------------

 // 步骤八
// 备注
// const {due_dateArr} = due_dateFun(periodStarts);
// console.log("🚀 ~ paymentMainFun ~ due_dateArr:", due_dateArr)

const {remarksArr} = remarksFun(plan,rentPaymentMonthsCycleArray);


/*
* ----------------------------------------------
*/


// 计算 合同明细 的对象
const {paymentDetails} = resultsFun(periodStarts,periodEnds,paymentAmountArr,due_dateArr,remarksArr);

console.log("🚀 ~ paymentMainFun ~ paymentDetails:", paymentDetails)

 /**
 * 得到 
 * 最终效果支付明细金额
 * --------------------------------------------------------------------------------------------------------------------
*/
return {
    paymentDetails:paymentDetails
  }
}