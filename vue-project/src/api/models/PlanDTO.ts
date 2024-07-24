/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientDTO } from './ClientDTO';
import type { DynamicFieldDTO } from './DynamicFieldDTO';
import type { PaymentDetailItemDTO } from './PaymentDetailItemDTO';
export type PlanDTO = {
    /**
     * id
     */
    id?: string;
    /**
     * 方案名称
     */
    name?: string;
    /**
     * 位置1
     */
    first_name?: string;
    /**
     * 面积1
     */
    first_area?: number;
    /**
     * 单价1
     */
    first_price?: number;
    /**
     * 位置2
     */
    second_name?: string;
    /**
     * 面积2
     */
    second_area?: number;
    /**
     * 单价2
     */
    second_price?: number;
    /**
     * 位置3
     */
    third_name?: string;
    /**
     * 面积3
     */
    third_area?: number;
    /**
     * 单价3
     */
    third_price?: number;
    /**
     * 动态位置、面积、价格
     */
    dynamic_field?: Array<DynamicFieldDTO>;
    /**
     * 总面积
     */
    total_area?: number;
    /**
     * 平均单价
     */
    average_price?: number;
    /**
     * 初期每月费用
     */
    initial_monthly_price?: number;
    /**
     * 合同类型
     */
    contract_type?: string;
    /**
     * 合同状态
     */
    contract_status?: string;
    /**
     * 记录类型
     */
    record_type?: string;
    /**
     * 是否为默认值
     */
    is_default?: boolean;
    /**
     * 合同生效期间，起始时间-截止时间
     */
    startdate_and_enddate?: Array<string>;
    /**
     * 合同的天数
     */
    contract_duration_days?: number;
    /**
     * 支付方式（每多少个月）
     */
    payment_interval_months?: number;
    /**
     * 增长率条件（每多少个月）
     */
    increase_interval_months?: number;
    /**
     * 增长率（百分比）
     */
    increase_rate?: number;
    /**
     * 押金（元）
     */
    deposit?: number;
    /**
     * 减免（月）
     */
    rent_free_months?: number;
    /**
     * 首次支付费用截止日期为合同生效日期后的第几天
     */
    initial_payment_duedays?: number;
    /**
     * 每期支付费用截止日期为每期应当提前多少月
     */
    recurring_payment_duedays?: number;
    /**
     * 合同总金额
     */
    total_amount?: number;
    /**
     * 备注
     */
    remarks?: string;
    /**
     * 乙方客户
     */
    client?: ClientDTO;
    /**
     * 支付明细
     */
    payment_detail_item?: PaymentDetailItemDTO;
};

