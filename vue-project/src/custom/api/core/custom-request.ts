
// src/api/request.ts
import axios from 'axios';
import axiosRetry from 'axios-retry';
// import { message as wolail } from 'ant-design-vue';

const axiosInstance:AxiosInstance = axios.create({
    baseURL: '/frontend',
    timeout: 20000,
});

axiosRetry(axiosInstance, { retries: 3 });

// 添加请求拦截器
axiosInstance.interceptors.request.use(
	(config) => {
	  // 发送请求之前做些什么
	  // config.params = { ...config.params, icode: 'E4993F09B37DE0E4' };
    console.log("发送请求之前做些什么");
	  return config;
	},
	(error) => {
	  // 对请求错误做些什么
	  return Promise.reject(error);
	}
  );
  
  // 添加响应拦截器
  axiosInstance.interceptors.response.use(
	(response:AxiosResponse):AxiosResponse => {
	  // 2xx 范围内的状态码都会触发该函数。
	  // 对响应数据做点什么
    //   console.log(" 对响应数据做点什么-------------:-",response);
    //   console.log(" 对响应数据做点什么TEST--------------:",response);
    if (response.data) {
        response.data = convertDatesToDayjs(response.data);
    }
    console.log(" 对响应数据--------------:",response.data.results.data);
      // --------------------- 数据转换 ---------------------------------
      
	  return response;
	},
	(error) => {
	  // 超出 2xx 范围的状态码都会触发该函数。
	  // 对响应错误做点什么
	  const newError = new Error(error.response?.data?.message || 'Unknown error');
	  return Promise.reject(newError);
	}
  );

// export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions): CancelablePromise<T> => {
//     return new CancelablePromise((resolve, reject, onCancel) => {
//         const url = `${config.BASE}${options.path}`;

//         const source = axios.CancelToken.source();
//         onCancel(() => source.cancel('The user aborted a request.'));

//         axiosInstance.request({
//             url,
//             method: options.method,
//             headers: options.headers,
//             params: options.query,
//             data: options.body,
//             cancelToken: source.token,
//         }).then((response: AxiosResponse<T>) => {
//             resolve(response.data);
//         }).catch((error: AxiosError) => {
//             reject(error);
//         });
//     });
// };




// import axios from 'axios';

// // 创建实例
// const instance = axios.create({
// 	baseURL: '/api',
// 	timeout: 20000,
// });

// // 添加请求拦截器
// instance.interceptors.request.use(
// 	function (config) {
// 		// 发送请求之前做些什么
// 		return config;
// 	},
// 	function (error) {
// 		// 对请求错误做些什么
// 		return Promise.reject(error);
// 	}
// );

// // 添加响应拦截器
// instance.interceptors.response.use(
// 	function (response) {
// 		// 2xx 范围内的状态码都会触发该函数。
// 		// 对响应数据做点什么
// 		return response;
// 	},
// 	function (error) {
// 		// 超出 2xx 范围的状态码都会触发该函数。
// 		// 对响应错误做点什么
		
// 		console.log("request",error);
// 		const newError = new Error(error.response.data.message);
// 		return Promise.reject(newError);
// 	}
// );




// export default axiosInstance;

// // import axios from 'axios' // ------------------axios

// // const myIcode = 'E4993F09B37DE0E4'
// // // 替换 baseURL
// // axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// // // 下面的 icode 值是从慕课网获取的 token 值，可以在课程右侧的项目接口校验码找到
// // axios.interceptors.request.use(config => {
// //   //... 其他代码
// //   // get 请求，添加到 url 中
// //   config.params = { ...config.params, icode: myIcode }
// //   // 其他请求，添加到 body 中
// //   // 如果是上传文件，添加到 FormData 中
// //   if (config.data instanceof FormData) {
// //     config.data.append('icode', myIcode)
// //   } else {
// //   // 普通的 body 对象，添加到 data 中
// //     config.data = { ...config.data, icode: myIcode }
// //   }
// //   // console.log("config数据: ",config);
// //   return config
// // })

// // // axios 拦截器，来实现loading 效果
// // axios.interceptors.request.use(config => {
// //     store.commit('setLoading', true)
// //     store.commit('setError', {status:false, message: ''})
// //     return config
// // })

// // axios.interceptors.response.use(config =>{
// //     setTimeout(()=>{
// //         store.commit('setLoading', false)
// //     },500)
// //     return config
// // }, e =>{
// //   const {error} = e.response.data
// //   store.commit('setError', {status:true, message: error})
// //   store.commit('setLoading', false)
// //   return Promise.reject(error)
// // })

// --------------------------------------------------------------------------------------------------
/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

// import axios from 'axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import FormData from 'form-data';

import { ApiError } from '@/api/core/ApiError';
import type { ApiRequestOptions } from '@/api/core/ApiRequestOptions';
import type { ApiResult } from '@/api/core/ApiResult';
import { CancelablePromise } from '@/api/core/CancelablePromise';
import type { OnCancel } from '@/api/core/CancelablePromise';
import type { OpenAPIConfig } from '@/api/core/OpenAPI';
import { message } from 'ant-design-vue';
import useMessage from 'ant-design-vue/es/message/useMessage';
import { convertDatesToDayjs } from '@/custom/tools/convertDates';
// import { log } from 'console';

export const isDefined = <T>(value: T | null | undefined): value is Exclude<T, null | undefined> => {
    return value !== undefined && value !== null;
};

export const isString = (value: any): value is string => {
    return typeof value === 'string';
};

export const isStringWithValue = (value: any): value is string => {
    return isString(value) && value !== '';
};

export const isBlob = (value: any): value is Blob => {
    return (
        typeof value === 'object' &&
        typeof value.type === 'string' &&
        typeof value.stream === 'function' &&
        typeof value.arrayBuffer === 'function' &&
        typeof value.constructor === 'function' &&
        typeof value.constructor.name === 'string' &&
        /^(Blob|File)$/.test(value.constructor.name) &&
        /^(Blob|File)$/.test(value[Symbol.toStringTag])
    );
};

export const isFormData = (value: any): value is FormData => {
    return value instanceof FormData;
};

export const isSuccess = (status: number): boolean => {
    return status >= 200 && status < 300;
};

export const base64 = (str: string): string => {
    try {
        return btoa(str);
    } catch (err) {
        // @ts-ignore
        return Buffer.from(str).toString('base64');
    }
};

export const getQueryString = (params: Record<string, any>): string => {
    const qs: string[] = [];

    const append = (key: string, value: any) => {
        qs.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`);
    };

    const process = (key: string, value: any) => {
        if (isDefined(value)) {
            if (Array.isArray(value)) {
                value.forEach(v => {
                    process(key, v);
                });
            } else if (typeof value === 'object') {
                Object.entries(value).forEach(([k, v]) => {
                    process(`${key}[${k}]`, v);
                });
            } else {
                append(key, value);
            }
        }
    };

    Object.entries(params).forEach(([key, value]) => {
        process(key, value);
    });

    if (qs.length > 0) {
        return `?${qs.join('&')}`;
    }

    return '';
};

const getUrl = (config: OpenAPIConfig, options: ApiRequestOptions): string => {
    const encoder = config.ENCODE_PATH || encodeURI;

    const path = options.url
        .replace('{api-version}', config.VERSION)
        .replace(/{(.*?)}/g, (substring: string, group: string) => {
            if (options.path?.hasOwnProperty(group)) {
                return encoder(String(options.path[group]));
            }
            return substring;
        });

    const url = `${config.BASE}${path}`;
    if (options.query) {
        return `${url}${getQueryString(options.query)}`;
    }
    return url;
};

export const getFormData = (options: ApiRequestOptions): FormData | undefined => {
    if (options.formData) {
        const formData = new FormData();

        const process = (key: string, value: any) => {
            if (isString(value) || isBlob(value)) {
                formData.append(key, value);
            } else {
                formData.append(key, JSON.stringify(value));
            }
        };

        Object.entries(options.formData)
            .filter(([_, value]) => isDefined(value))
            .forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach(v => process(key, v));
                } else {
                    process(key, value);
                }
            });

        return formData;
    }
    return undefined;
};

type Resolver<T> = (options: ApiRequestOptions) => Promise<T>;

export const resolve = async <T>(options: ApiRequestOptions, resolver?: T | Resolver<T>): Promise<T | undefined> => {
    if (typeof resolver === 'function') {
        return (resolver as Resolver<T>)(options);
    }
    return resolver;
};

export const getHeaders = async (config: OpenAPIConfig, options: ApiRequestOptions, formData?: FormData): Promise<Record<string, string>> => {
    const [token, username, password, additionalHeaders] = await Promise.all([
        resolve(options, config.TOKEN),
        resolve(options, config.USERNAME),
        resolve(options, config.PASSWORD),
        resolve(options, config.HEADERS),
    ]);

    const formHeaders = typeof formData?.getHeaders === 'function' && formData?.getHeaders() || {}

    const headers = Object.entries({
        Accept: 'application/json',
        ...additionalHeaders,
        ...options.headers,
        ...formHeaders,
    })
    .filter(([_, value]) => isDefined(value))
    .reduce((headers, [key, value]) => ({
        ...headers,
        [key]: String(value),
    }), {} as Record<string, string>);

    if (isStringWithValue(token)) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    if (isStringWithValue(username) && isStringWithValue(password)) {
        const credentials = base64(`${username}:${password}`);
        headers['Authorization'] = `Basic ${credentials}`;
    }

    if (options.body !== undefined) {
        if (options.mediaType) {
            headers['Content-Type'] = options.mediaType;
        } else if (isBlob(options.body)) {
            headers['Content-Type'] = options.body.type || 'application/octet-stream';
        } else if (isString(options.body)) {
            headers['Content-Type'] = 'text/plain';
        } else if (!isFormData(options.body)) {
            headers['Content-Type'] = 'application/json';
        }
    }

    return headers;
};

export const getRequestBody = (options: ApiRequestOptions): any => {
    if (options.body) {
        return options.body;
    }
    return undefined;
};

export const sendRequest = async <T>(
    config: OpenAPIConfig,
    options: ApiRequestOptions,
    url: string,
    body: any,
    formData: FormData | undefined,
    headers: Record<string, string>,
    onCancel: OnCancel,
    axiosClient: AxiosInstance
): Promise<AxiosResponse<T>> => {
    const source = axios.CancelToken.source();

    const requestConfig: AxiosRequestConfig = {
        url,
        headers,
        data: body ?? formData,
        method: options.method,
        withCredentials: config.WITH_CREDENTIALS,
        withXSRFToken: config.CREDENTIALS === 'include' ? config.WITH_CREDENTIALS : false,
        cancelToken: source.token,
    };

    onCancel(() => source.cancel('The user aborted a request.'));

    try {
        return await axiosClient.request(requestConfig);
    } catch (error) {
        const axiosError = error as AxiosError<T>;
        if (axiosError.response) {
            return axiosError.response;
        }
        throw error;
    }
};

export const getResponseHeader = (response: AxiosResponse<any>, responseHeader?: string): string | undefined => {
    if (responseHeader) {
        const content = response.headers[responseHeader];
        if (isString(content)) {
            return content;
        }
    }
    return undefined;
};

export const getResponseBody = (response: AxiosResponse<any>): any => {
    if (response.status !== 204) {
        return response.data;
    }
    return undefined;
};

export const catchErrorCodes = (options: ApiRequestOptions, result: ApiResult): void => {
    const errors: Record<number, string> = {
        400: 'Bad Request',
        401: 'Unauthorized',
        403: 'Forbidden',
        404: 'Not Found',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'Service Unavailable',
        ...options.errors,
    }

    const error = errors[result.status];
    if (error) {
        throw new ApiError(options, result, error);
    }

    if (!result.ok) {
        const errorStatus = result.status ?? 'unknown';
        const errorStatusText = result.statusText ?? 'unknown';
        const errorBody = (() => {
            try {
                return JSON.stringify(result.body, null, 2);
            } catch (e) {
                return undefined;
            }
        })();

        throw new ApiError(options, result,
            `Generic Error: status: ${errorStatus}; status text: ${errorStatusText}; body: ${errorBody}`
        );
    }
};

/**
 * Request method
 * @param config The OpenAPI configuration object
 * @param options The request options from the service
 * @param axiosClient The axios client instance to use
 * @returns CancelablePromise<T>
 * @throws ApiError
 */
export const request = <T>(config: OpenAPIConfig, options: ApiRequestOptions, axiosClient: AxiosInstance = axios): CancelablePromise<T> => {
    return new CancelablePromise(async (resolve, reject, onCancel) => {
        try {
            const url = getUrl(config, options);
            const formData = getFormData(options);
            const body = getRequestBody(options);
            const headers = await getHeaders(config, options, formData);

            if (!onCancel.isCancelled) {
                const response = await sendRequest<T>(config, options, url, body, formData, headers, onCancel, axiosClient=axiosInstance);
                const responseBody = getResponseBody(response);
                const responseHeader = getResponseHeader(response, options.responseHeader);

                const result: ApiResult = {
                    url,
                    ok: isSuccess(response.status),
                    status: response.status,
                    statusText: response.statusText,
                    body: responseHeader ?? responseBody,
                };

                catchErrorCodes(options, result);

                resolve(result.body);
            }
        } catch (error) {
            reject(error);
        }
    });
};



// export const request = <T>(
//     config: OpenAPIConfig,
//     options: ApiRequestOptions,
//     axiosClient: AxiosInstance = axiosInstance // 使用自定义的 Axios 实例
//   ): CancelablePromise<T> => {
//     return new CancelablePromise(async (resolve, reject, onCancel) => {
//       try {
//         const url = `${config.BASE}${options.path}`;
//         const CancelToken = axios.CancelToken; // 从 axios 模块本身获取 CancelToken
//         const source = CancelToken.source();
//         onCancel(() => source.cancel('The user aborted a request.'));
  
//         const response: AxiosResponse<T> = await axiosClient.request<T>({
//           url,
//           method: options.method,
//           headers: options.headers,
//           params: options.query,
//           data: options.body,
//           cancelToken: source.token,
//         });
  
//         resolve(response.data); // 确保传递给 resolve 的是响应数据，而不是 AxiosResponse 对象
//       } catch (error) {
//         reject(error as AxiosError);
//       }
//     });
//   };