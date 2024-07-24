/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaymentDetailItemDTO } from './PaymentDetailItemDTO';
export type PaymentPlanSplitDTO = {
    /**
     * ID
     */
    id?: string;
    /**
     * 支付截止日期
     */
    payment_date: string;
    /**
     * 支付金额
     */
    payment_amount: number;
    /**
     * 是否已支付
     */
    is_paid: boolean;
    /**
     * 支付明细项
     */
    payment_detail_item?: PaymentDetailItemDTO;
};

