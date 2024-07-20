/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Plan } from './Plan';
export type ClientBackEndDTO = {
    /**
     * 客户端ID
     */
    id?: string;
    /**
     * 乙方名称
     */
    name?: string;
    /**
     * 联系人
     */
    contact?: string;
    /**
     * 联系号码
     */
    phonenumber?: string;
    /**
     * 紧急联系人
     */
    emergencycontact?: string;
    /**
     * 紧急联系人号码
     */
    emergencycontactphone?: string;
    /**
     * 备注
     */
    marks?: string;
    /**
     * 创建时间-后端Date格式
     */
    createdAt?: string;
    /**
     * 计划
     */
    plan?: Array<Plan>;
};

