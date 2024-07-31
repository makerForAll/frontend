import type { CreatePlanDTO, ReadPlanDTO, UpdatePlanDTO } from "@/api";

export interface CPlanVO extends Omit<CreatePlanDTO, 'client'> {
    client?: any;
  }

export interface UPlanVO extends Omit<UpdatePlanDTO, 'client'|'id'> {
    id?:string;
    client?: any;
  }

export interface RPlanVO extends Omit<ReadPlanDTO, 'client'|'id'> {
    id?:string;
    client?: any;
  }