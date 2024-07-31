// convertDates.ts
import dayjs from 'dayjs';

type AnyObject = { [key: string]: any };

export function convertDatesToDayjs2(obj: any): any {
    // ISO 8601 格式正则
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
    // 其他格式正则
    const otherDateRegex = /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) \w{3} \d{1,2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \(\w+\)$/;

    if (Array.isArray(obj)) {
        return obj.map(item => convertDatesToDayjs2(item)); // 递归处理数组
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj: AnyObject = {};
        for (const key in obj) {
            // 检测 ISO 8601 格式字符串并转换
            if (typeof obj[key] === 'string') {
                if (iso8601Regex.test(obj[key])) {
                    newObj[key] = dayjs(obj[key]);
                } else if (otherDateRegex.test(obj[key])) { // 检测其他日期格式
                    newObj[key] = dayjs(obj[key]);
                }
            } 
            // 处理数组
            else if (Array.isArray(obj[key])) {
                newObj[key] = convertDatesToDayjs2(obj[key]); // 递归处理数组
            } 
            // 处理对象
            else if (typeof obj[key] === 'object' && obj[key] !== null) {
                newObj[key] = convertDatesToDayjs2(obj[key]); // 递归处理嵌套对象
            } 
            // 其他情况直接赋值
            else {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }
    return obj; // 返回原始值
}
