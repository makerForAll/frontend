import type { PaymentDetailItemDTO } from "@/api";
import type { Dayjs } from "dayjs";

export interface PaymentDetailItemVO extends Omit<PaymentDetailItemDTO, 'period_start'|'period_end'|'due_date'> {
    period_start?: Dayjs|String;
    period_end?: Dayjs|String;
    due_date?:Dayjs|String;
    
  }