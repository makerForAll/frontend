// convertDates.ts
import dayjs from 'dayjs';

type AnyObject = { [key: string]: any };

export function convertDatesToDayjs(obj: any): any {
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

    if (Array.isArray(obj)) {
        return obj.map(item => convertDatesToDayjs(item));
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj: AnyObject = {};
        for (const key in obj) {
            if (typeof obj[key] === 'string' && iso8601Regex.test(obj[key])) {
                newObj[key] = dayjs(obj[key]);
            } else if (Array.isArray(obj[key])) {
                newObj[key] = obj[key].map((item: any) => {
                    if (typeof item === 'string' && iso8601Regex.test(item)) {
                        return dayjs(item);
                    } else {
                        return convertDatesToDayjs(item);
                    }
                });
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                newObj[key] = convertDatesToDayjs(obj[key]);
            } else {
                newObj[key] = obj[key];
            }
        }
        return newObj;
    }
    return obj;
}
