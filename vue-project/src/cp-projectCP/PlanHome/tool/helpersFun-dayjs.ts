import type { Dayjs } from "dayjs";
import { ref } from "vue";
// import 'dayjs/locale/zh-cn';
// dayjs.locale('cn');



/**
 *计算能被月份整除后，余下的天数范围中，所涉及的当月最大天数。
 * @param {Dayjs} dateObj - Dayjs
 * 
 * @returns {number} - 指定月份的天数
 */

export function getDaysInMonth(startDateStr:Dayjs,dateObj:Dayjs) {
    // 解析输入日期字符串
    const start = startDateStr;
    const end = dateObj;

    
    // // 获取指定月份的开始日期和结束日期
    // const monthStart = date.subtract(1,'month').startOf('month');
    // const monthEnd = monthStart.endOf('month');
    
    // // 计算天数
    // const daysInMonth = monthEnd.diff(monthStart, 'day') + 1; // +1 是因为包括最后一天
    // // console.log("当月有多少天:",daysInMonth);
    
    // 计算两个日期之间的总月数
const fullMonths = end.diff(start, 'month');
console.log("🚀 ~ getDaysInMonth ~ totalMonths:", fullMonths)

// 计算第一个日期加上总月数后的日期
const adjustedStartDate = start.add(fullMonths, 'month');

// 这个月份的有多少天。
const countDaysInMonthStart = adjustedStartDate.startOf('month');
const countDaysInMonthEnd = countDaysInMonthStart.endOf('month');
const countDaysInMonth = countDaysInMonthEnd.diff(countDaysInMonthStart, 'day')+1;
// console.log("🚀 ~ getDaysInMonth ~ adjustedStartDate:", adjustedStartDate.format('YYYY-MM-DD'))


// 计算剩余的天数
const lastMonthDays = end.diff(adjustedStartDate, 'day') + 1;
    
    return {countDaysInMonth,fullMonths,lastMonthDays};
  }
  
  

  
/**
 * Description
 * @param {any} startDateStr:Dayjs
 * @param {any} endDateStr:Dayjs
 * @returns {any}
 */
export  function calculateTotalMonthsAndDays(startDateStr:Dayjs, endDateStr:Dayjs) {
  
    /** 
     * 合同起始时间
     * @type {*} */
    const startDate = startDateStr
    /** 
     * 合同截止时间
     * @type {*} */
    const endDate = endDateStr
    /** 
     * 计算用的，
     * @type {*} */
    const calTimes = ref(0);
    let calDate = startDate;
  
    // 计算完整月份数
    while (calDate.isBefore(endDate)) {
      calDate = calDate.add(1, 'month');
      calTimes.value += 1;
    }
  
    // console.log("");

    /**
     * 除了余下的天数以外的 以月为单位的量
     *  @type {*} */
    // let fullMonths = calTimes.value-1; // 代偿 -1

    /** 
     * 余下的天数
     * @type {*} */
    // let lastMonthDays = 0;
    
    /**
     * 计算能被月份整除后，余下的天数范围中，所涉及的当月最大天数。
     * @type {Ref<number>}
     */
    const {countDaysInMonth,fullMonths,lastMonthDays} = getDaysInMonth(startDateStr,endDate);
    
    /** 
     * 计算 合同起始时间 到 合同截止时间 之间 有多少天数
     * @type {*} */
    const remainingDays = endDate.diff(calDate, 'day');
    // // // // console.log("🚀 ~ calculateTotalMonthsAndDays ~ remainingDays:", remainingDays)
    
    // lastMonthDays = countDaysInMonth+remainingDays+1;

    // if(Math.floor(countDaysInMonth%lastMonthDays) == 0){
    //   // 说明 天数满足 当月 进一位的要求。
    //   // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //   fullMonths= fullMonths +1; // 
    //   lastMonthDays = 0
    // }else{
    //   // 说明 天数不满足 当月 进一位的要求。 计算天数
      
    // }
    
    
    /** 
     * 换算成浮点数的 月数
     * @type {*} */
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