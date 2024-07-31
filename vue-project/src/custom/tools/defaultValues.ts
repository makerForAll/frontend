// defaultValues.ts
export function generateDefaultValues<T extends object>(dto: T): T {
  const defaultValues: Partial<T> = {};

  for (const key of Object.keys(dto) as Array<keyof T>) {
      const value = dto[key];

      // 处理 null 和 undefined
      if (value === null || value === undefined) {
          // 生成默认值
          if (typeof value === 'string') {
              defaultValues[key] = '' as any; // 字符串默认值
          } else if (typeof value === 'number') {
              defaultValues[key] = 0 as any; // 数字默认值
          } else if (typeof value === 'boolean') {
              defaultValues[key] = false as any; // 布尔值默认值
          } else if (Array.isArray(value)) {
              defaultValues[key] = [] as any; // 数组默认值
          } else if (typeof value === 'object') {
              defaultValues[key] = {} as any; // 对象默认值
          } else {
              defaultValues[key] = null as any; // 其他情况
          }
      } else {
          // 如果原始值已经存在，则使用原始值
          defaultValues[key] = value;
      }
  }

  return defaultValues as T;
}
