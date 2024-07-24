import type { PlanDTO } from "@/api";
import type { PaymentDetailItemVO } from "@/cp-projectCP/PaymentDetailItemHome/Vo/paymentDetailItem.vo";
import dayjs, { Dayjs } from "dayjs";

function getValidNumber(value: any, defaultValue: number): number {
  return value === undefined || value === null || value === '' ? defaultValue : Number(value);
}

function getValidDate(value: any, defaultValue: Dayjs): Dayjs {
  return value === undefined || value === null || value === '' ? defaultValue : dayjs(value);
}

export function generatePaymentDetails(plan: PlanDTO): PaymentDetailItemVO[] {
  const paymentDetails: PaymentDetailItemVO[] = [];
  const startDate = getValidDate(plan?.startdate_and_enddate?.[0], dayjs()); // 默认当前日期
  const endDate = getValidDate(plan?.startdate_and_enddate?.[1], dayjs()); // 默认当前日期
  const totalDays = endDate.diff(startDate, 'day'); // 总天数
  const paymentIntervalMonths = getValidNumber(plan?.payment_interval_months, 1); // 支付间隔（月），默认为1个月
  const initialMonthlyPrice = getValidNumber(plan?.initial_monthly_price, 0); // 初期每月费用，默认为0
  const contractDurationDays = getValidNumber(plan?.contract_duration_days, totalDays); // 合同的天数，默认为总天数
  const rentFreeMonths = getValidNumber(plan?.rent_free_months, 0); // 免租期（月），默认为0
  const increaseIntervalMonths = getValidNumber(plan?.increase_interval_months, 12); // 增长率间隔（月），默认为12个月
  const increaseRate = plan?.increase_rate === undefined || plan?.increase_rate === null ? 1 : Number(plan?.increase_rate); // 增长率（百分比），如果为 undefined 则默认为 1

  // 计算总金额
  let totalAmount = 0;
  let remainingDays = contractDurationDays;
  let currentPrice = initialMonthlyPrice;

  console.log(`初期每月费用: ${initialMonthlyPrice}`);
  console.log(`合同的天数: ${contractDurationDays}`);
  console.log(`支付间隔（月）: ${paymentIntervalMonths}`);
  console.log(`免租期（月）: ${rentFreeMonths}`);
  console.log(`增长率间隔（月）: ${increaseIntervalMonths}`);
  console.log(`增长率（百分比）: ${increaseRate}`);

  while (remainingDays > 0) {
    const daysInCurrentInterval = Math.min(paymentIntervalMonths * 30, remainingDays);
    totalAmount += currentPrice * (daysInCurrentInterval / 30);
    console.log(`当前支付周期天数: ${daysInCurrentInterval}`);
    console.log(`当前价格: ${currentPrice}`);
    console.log(`当前总金额: ${totalAmount}`);
    remainingDays -= daysInCurrentInterval;
    if (remainingDays > 0) {
      currentPrice *= (1 + increaseRate);
    }
  }

  console.log(`计算后的合同总金额: ${totalAmount}`);
  console.log(`总天数: ${totalDays}`);
  console.log(`支付次数: ${Math.floor(totalDays / (paymentIntervalMonths * 30))}`);

  let currentPeriodStart = startDate as Dayjs;
  let remainingAmount = totalAmount; // 剩余金额
  let periodNumber = 1;
  let marks = "";

  const paymentIntervals = []; // 用来存储每个支付周期的结束日期
  let tempDate = startDate;

  // 生成支付周期的结束日期
  while (tempDate.isBefore(endDate)) {
    const nextDate = tempDate.add(paymentIntervalMonths, 'month').subtract(1, 'day');
    paymentIntervals.push(nextDate);
    tempDate = nextDate.add(1, 'day');
  }

  const numberOfPayments = paymentIntervals.length;

  for (let i = 0; i < numberOfPayments; i++) {
    const currentPeriodEnd = paymentIntervals[i];
    let dueDate;

    if (i === 0) {
      dueDate = currentPeriodStart.add(3, 'day'); // 第一个对象的 due_date 添加 3 天
    } else {
      dueDate = currentPeriodStart.subtract(1, 'month'); // 其他对象的 due_date 减少 1 个月
    }

    // 计算每期的金额
    let amount = Number((remainingAmount / (numberOfPayments - i)).toFixed(2));
    // 根据增长率调整金额
    amount = amount * (1 + increaseRate * Math.floor(i / increaseIntervalMonths));

    paymentDetails.push({
      period_start: currentPeriodStart.format('YYYY-MM-DD'),
      period_end: currentPeriodEnd.format('YYYY-MM-DD'),
      amount, // 每期金额
      due_date: dueDate.format('YYYY-MM-DD'),
      is_paid: false,
      is_split_payment: false,
      remarks: marks
    });

    remainingAmount -= amount; // 更新剩余金额
    currentPeriodStart = currentPeriodEnd.add(1, 'day');
    periodNumber++;
  }

  // 处理免租期
  const rentFreePeriodStart = currentPeriodStart;
  const rentFreePeriodEnd = rentFreePeriodStart.add(rentFreeMonths, 'month').subtract(1, 'day');
  const rentFreeDueDate = rentFreePeriodStart.add(rentFreeMonths, 'month').add(3, 'day');
  marks = "3个月减免";

  paymentDetails.push({
    period_start: rentFreePeriodStart.format('YYYY-MM-DD'),
    period_end: rentFreePeriodEnd.format('YYYY-MM-DD'),
    amount: 0, // 免租期金额为 0
    due_date: rentFreeDueDate.format('YYYY-MM-DD'),
    is_paid: false,
    is_split_payment: false,
    remarks: marks
  });

  // 如果不需要最后一个支付明细，则移除它
  paymentDetails.pop();

  return paymentDetails;
}
