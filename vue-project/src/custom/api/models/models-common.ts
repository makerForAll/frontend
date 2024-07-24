// src/types/apiResponse.ts

// 定义 Results 类型
export interface ApiResults<T> {
    data: T[];
    total?: number;
  }
  
  // 定义 ApiResponse 类型
  export interface ApiResponse<T> {
    code: number;
    message: string;
    results: ApiResults<T>;
  }