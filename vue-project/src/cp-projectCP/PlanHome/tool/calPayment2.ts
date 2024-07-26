// paymentSchedule.ts

// 定义 PlanDTO 接口，根据需要调整字段
export interface PlanDTO {
    average_price?: number;
    total_area?: number;
    startdate_and_enddate?: [string, string];
    payment_interval_months: number;
    initial_monthly_price?: number;
    contract_duration_days: number;
    rent_free_months: number;
    increase_interval_months?: number;
    increase_rate?: number;
}

// 计算支付计划的函数
export const calculatePaymentSchedule = (plan: PlanDTO): number[] => {
    // 解构所需的字段
    const {
        contract_duration_days,
        payment_interval_months,
        rent_free_months
    } = plan;

    // 计算租赁期限（将天数转换为月份）
    const leaseTerm = Math.ceil(contract_duration_days / 30);
    
    // 计算免租期后的有效租赁时间
    const effectiveLeaseTerm = leaseTerm - rent_free_months;

    // 计算需要的支付周期数
    const numPeriods = Math.ceil(effectiveLeaseTerm / payment_interval_months) + 1;

    const paymentSchedule: number[] = [];
    let remainingEffectiveTerm = effectiveLeaseTerm;

    for (let i = 0; i < numPeriods; i++) {
        if (remainingEffectiveTerm >= payment_interval_months) {
            paymentSchedule.push(payment_interval_months);
            remainingEffectiveTerm -= payment_interval_months;
        } else if (remainingEffectiveTerm > 0) {
            paymentSchedule.push(remainingEffectiveTerm);
            remainingEffectiveTerm = 0;
        } else {
            paymentSchedule.push(rent_free_months);
        }
    }

    return paymentSchedule;
};
