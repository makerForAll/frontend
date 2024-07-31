import type { Dayjs } from "dayjs";
import { ref } from "vue";
// import 'dayjs/locale/zh-cn';
// dayjs.locale('cn');
/**
 * 获取 指定月份 的天数
 * @param {Dayjs} dateObj - Dayjs
 * 
 * @returns {number} - 指定月份的天数
 */

export function getDaysInMonth(dateObj:Dayjs) {
    // 解析输入日期字符串
    const date = dateObj;
    
    // 获取指定月份的开始日期和结束日期
    const monthStart = date.subtract(1,'month').startOf('month');
    const monthEnd = monthStart.endOf('month');
    
    // 计算天数
    const daysInMonth = monthEnd.diff(monthStart, 'day') + 1; // +1 是因为包括最后一天
    // console.log("当月有多少天:",daysInMonth);
    
    return daysInMonth;
  }
  
  

  
/**
 * Description
 * @param {any} startDateStr:Dayjs
 * @param {any} endDateStr:Dayjs
 * @returns {any}
 */
export  function calculateTotalMonthsAndDays(startDateStr:Dayjs, endDateStr:Dayjs) {
    const startDate = startDateStr
    const endDate = endDateStr
    const calTimes = ref(0);
    let calDate = startDate;
  
    // 计算完整月份数
    while (calDate.isBefore(endDate)) {
      calDate = calDate.add(1, 'month');
      calTimes.value += 1;
    }
  
    // console.log("");
    let fullMonths = calTimes.value-1; // 代偿 -1
    let lastMonthDays = 0;
    // console.log("calTimes:",calTimes.value-1);
    // 计算最后一个月的天数
    const countDaysInMonth = getDaysInMonth(endDate);
    const remainingDays = endDate.diff(calDate, 'day');
    lastMonthDays = countDaysInMonth+remainingDays+1;
    if(Math.floor(countDaysInMonth%lastMonthDays) == 0){
      // 说明 天数满足 当月 进一位的要求。
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      fullMonths= fullMonths +1; // 
      lastMonthDays = 0
    }else{
      // 说明 天数不满足 当月 进一位的要求。 计算天数
      
    }
    // console.log("月数:",fullMonths);
    // console.log("天数:",lastMonthDays);
    // console.log("当月天数:",countDaysInMonth);
    const currentMonths = fullMonths+(lastMonthDays/countDaysInMonth); // 换算成占比月份

    return {
      currentMonths,
      fullMonths,
      lastMonthDays,
      countDaysInMonth
    };
  }


 /**
  * Description : 计算 大量小数点时，可以四舍五入，小时的变为后2为
  * @param {any} num:number
  * @param {any} decimalPlaces:number
  * @returns {any}
  */

 export function limitDecimalPlaces(num: number, decimalPlaces: number): number {
    const factor = Math.pow(10, decimalPlaces); // 计算 10 的指定次方
    return Math.round(num * factor) / factor; // 四舍五入并除以因子
}