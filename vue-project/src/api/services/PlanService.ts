/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PlanBackEndDTO } from '../models/PlanBackEndDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class PlanService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * plan数据初始化
     * @returns any
     * @throws ApiError
     */
    public planControllerGetInit(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/plan/init',
        });
    }
    /**
     * 获取所有Plan
     * @returns any
     * @throws ApiError
     */
    public planControllerFindAll({
        current = 1,
        pagesize = 10,
        sortField = 'name',
        sortOrder = 'DESC',
    }: {
        /**
         * 当前页码
         */
        current?: number,
        /**
         * 每页展示多少条信息
         */
        pagesize?: number,
        /**
         * 排序字段
         */
        sortField?: 'name' | 'startdate_and_enddate',
        /**
         * 排序顺序
         */
        sortOrder?: 'ASC' | 'DESC',
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/plan',
            query: {
                'current': current,
                'pagesize': pagesize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * 获取某个Client关联的所有Plan
     * @returns any
     * @throws ApiError
     */
    public planControllerFindByClientId({
        id,
        current = 1,
        pagesize = 10,
        sortField = 'name',
        sortOrder = 'DESC',
    }: {
        id: string,
        /**
         * 当前页码
         */
        current?: number,
        /**
         * 每页展示多少条信息
         */
        pagesize?: number,
        /**
         * 排序字段
         */
        sortField?: 'name' | 'startdate_and_enddate',
        /**
         * 排序顺序
         */
        sortOrder?: 'ASC' | 'DESC',
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/plan/client/{id}',
            path: {
                'id': id,
            },
            query: {
                'current': current,
                'pagesize': pagesize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * 获取单个Plan
     * @returns any
     * @throws ApiError
     */
    public planControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/plan/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * 更新Plan
     * @returns any
     * @throws ApiError
     */
    public planControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: PlanBackEndDTO,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/plan/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 删除Plan
     * @returns any
     * @throws ApiError
     */
    public planControllerDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/plan/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * 创建Plan
     * @returns any
     * @throws ApiError
     */
    public planControllerCreate({
        clientId,
        requestBody,
    }: {
        clientId: string,
        requestBody: PlanBackEndDTO,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/plan/{clientId}',
            path: {
                'clientId': clientId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
