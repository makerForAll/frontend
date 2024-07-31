/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Dayjs } from 'dayjs';
import type { PaymentPlanSplitDTO } from './PaymentPlanSplitDTO';
import type { ReadPlanDTO } from './ReadPlanDTO';
export type PaymentDetailItemDTO = {
    /**
     * ID
     */
    id?: string;
    /**
     * 开始期间
     */
    period_start: Dayjs;
    /**
     * 介绍期间
     */
    period_end: Dayjs;
    /**
     * 金额
     */
    amount: number;
    /**
     * 到期时间
     */
    due_date: Dayjs;
    /**
     * 是否已支付
     */
    is_paid: boolean;
    /**
     * 是否分期付款
     */
    is_split_payment: boolean;
    /**
     * 备注
     */
    remarks?: string;
    /**
     * 方案
     */
    plan?: ReadPlanDTO;
    /**
     * 分期付款计划
     */
    payment_plan_split?: Array<PaymentPlanSplitDTO>;
};

