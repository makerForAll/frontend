import type { PlanDTO } from "@/api";

export interface PlanVO extends Omit<PlanDTO, 'client'> {
    client?: String;
  }