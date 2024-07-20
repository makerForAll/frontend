/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';
export class UserService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}
    /**
     * @returns any
     * @throws ApiError
     */
    public userControllerGetUsers(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public userControllerAddUser(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/v1/user',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public userControllerUpdateUser(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/api/v1/user',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public userControllerDeleteUser(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'DELETE',
            url: '/api/v1/user',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public userControllerGetUserProfile(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/profile',
        });
    }
    /**
     * @returns any
     * @throws ApiError
     */
    public userControllerGetUserLogs(): CancelablePromise<any> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/v1/user/logs',
        });
    }
}
