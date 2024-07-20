/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientBackEndDTO } from '../models/ClientBackEndDTO';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class ClientService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * client数据初始化
     * @returns any
     * @throws ApiError
     */
    public clientControllerGetInit(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client/init',
        });
    }
    /**
     * 获取所有client数据
     * @returns any
     * @throws ApiError
     */
    public clientControllerFindAll({
        current = 1,
        pagesize = 10,
        sortField = 'createdAt',
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
        sortField?: 'name' | 'createdAt',
        /**
         * 排序顺序
         */
        sortOrder?: 'ASC' | 'DESC',
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client',
            query: {
                'current': current,
                'pagesize': pagesize,
                'sortField': sortField,
                'sortOrder': sortOrder,
            },
        });
    }
    /**
     * 创建客户
     * @returns any
     * @throws ApiError
     */
    public clientControllerCreate({
        requestBody,
    }: {
        requestBody: ClientBackEndDTO,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/client',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 根据ID获取客户
     * @returns any
     * @throws ApiError
     */
    public clientControllerFindOne({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/client/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * 更新客户
     * @returns any
     * @throws ApiError
     */
    public clientControllerUpdate({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: ClientBackEndDTO,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/api/v1/client/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 删除客户
     * @returns any
     * @throws ApiError
     */
    public clientControllerDelete({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/client/{id}',
            path: {
                'id': id,
            },
        });
    }
}
