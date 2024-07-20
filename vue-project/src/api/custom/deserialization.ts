import dayjs, { Dayjs } from 'dayjs';

function isDateString(value: any): boolean {
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z?$/;
  return typeof value === 'string' && isoDatePattern.test(value);
}

function deserialize(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  if (Array.isArray(data)) {
    return data.map(item => deserialize(item));
  }

  if (typeof data === 'object' && data !== null) {
    const deserializedData: { [key: string]: any } = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        deserializedData[key] = deserialize(data[key]);
      }
    }
    return deserializedData;
  }

  if (isDateString(data)) {
    return dayjs(data);
  }

  return data;
}

export default deserialize;
