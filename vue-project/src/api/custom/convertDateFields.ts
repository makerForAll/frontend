const dayjs = require('dayjs');

export function convertDatesToDayjs(obj: any): any {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const value = obj[key];
  
        if (value instanceof Date && !isNaN(value.getTime())) {
          obj[key] = dayjs(value);
        } else if (typeof value === 'object' && value !== null) {
          convertDatesToDayjs(value);
        }
      }
    }
  
    return obj;
  }
  