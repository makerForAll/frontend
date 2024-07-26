import type { PlanDTO } from "@/api";
import dayjs from "dayjs";
import { limitDecimalPlaces } from "./helpersFun-dayjs";
import type { PaymentDetailItemVO } from "@/cp-projectCP/PaymentDetailItemHome/Vo/PaymentDetailItem.vo";

/**
 * 计算每期的开始和结束日期
 * @param {PlanDTO} planObj - 包含合同信息的对象，包括起始和截止日期、免租期及付款间隔
 * @returns {{ periodStarts: string[], periodEnds: string[], numberOfPeriods: number }} 
 * - 返回每期的开始日期和结束日期数组，以及期数
 */
export function calculatePeriodDates(planObj: PlanDTO) {
    const startDate = dayjs(planObj.startdate_and_enddate?.[0]); // 合同起始日期
    const endDate = dayjs(planObj.startdate_and_enddate?.[1]); // 合同截止日期
    const totalMonths = endDate.diff(startDate, 'month') + 1; // 总月数

    const rentFreeMonths = planObj.rent_free_months ?? 0; // 免租期
    const paymentIntervalMonths = planObj.payment_interval_months ?? 1; // 付款间隔，避免除以零

    const numberOfPeriods = Math.ceil(rentFreeMonths / paymentIntervalMonths) + Math.ceil((totalMonths - rentFreeMonths) / paymentIntervalMonths); // 期数

    const periodStarts: string[] = []; // 每期开始日期数组
    const periodEnds: string[] = []; // 每期结束日期数组

    let currentStartDate = startDate;  // 当前期间开始
    periodStarts.push(currentStartDate.format('YYYY-MM-DD'));

    let currentEndDate = currentStartDate.add(paymentIntervalMonths, 'month').subtract(1, 'day');

    for (let i = 0; i < numberOfPeriods; i++) {
        // 尾期处理
        if (i === numberOfPeriods - 1) {
            currentEndDate = endDate.subtract(rentFreeMonths, 'month');
        }

        periodStarts.push(currentStartDate.format('YYYY-MM-DD'));
        periodEnds.push(currentEndDate.format('YYYY-MM-DD'));

        currentStartDate = currentEndDate.add(1, 'day');
        currentEndDate = currentStartDate.add(paymentIntervalMonths, 'month').subtract(1, 'day'); // 更新当前结束日期
    }

    return { periodStarts, periodEnds, numberOfPeriods };
}



/**
 * 计算每期的开始和结束日期
 * @param {PlanDTO} planObj - 包含合同信息的对象，包括起始和截止日期、免租期及付款间隔
 * @returns {{ periodStarts: string[], periodEnds: string[], numberOfPeriods: number }} 
 * - 返回每期的开始日期和结束日期数组，以及期数
 */
export function calculatePeriodDates2(planObj: PlanDTO,fullMonths:number,lastMonthDays:number,otherValue:number[]) {
    const startDate = dayjs(planObj.startdate_and_enddate?.[0]); // 合同起始日期
    const endDate = dayjs(planObj.startdate_and_enddate?.[1]); // 合同截止日期

    const rentFreeMonths = planObj.rent_free_months ?? 0; // 免租期
    const paymentIntervalMonths = planObj.payment_interval_months ?? 1; // 付款间隔，避免除以零

    const periodStarts: string[] = []; // 每期开始日期数组
    
    // 

    // eslint-disable-next-line prefer-const
    let calFullMonths = fullMonths;
    
    // eslint-disable-next-line prefer-const
    let calMonthsDate = startDate;
    // eslint-disable-next-line prefer-const
    
    let calOtherValue = 0;

    // 期间开始  ----------------------------------------------------------------------------------
    calFullMonths = calFullMonths - rentFreeMonths;
    periodStarts.push(calMonthsDate.format('YYYY/MM/DD'));
    while(calFullMonths>=paymentIntervalMonths && calOtherValue != otherValue.length-1){

        calMonthsDate = calMonthsDate.add(paymentIntervalMonths,'month');
        periodStarts.push(calMonthsDate.format('YYYY/MM/DD'));
 
        // console.log("------------------ok,",periodStarts,periodEnds);
        calFullMonths -= paymentIntervalMonths;
        calOtherValue += 1;
    }


    calMonthsDate = calMonthsDate.add(lastMonthDays,'day');

    //-----
    calMonthsDate = calMonthsDate.add(calFullMonths,'month');
    periodStarts.push(calMonthsDate.format('YYYY/MM/DD'))

    // ----------------------------------------------------------------------------------

    // 期间结束
    // eslint-disable-next-line prefer-const
    // const periodEnds: string[] = []; // 每期结束日期数组
    // let calperiodEnds = startDate.add(paymentIntervalMonths,'month').subtract(1,'day');
    // let calFullMonths2 = fullMonths;

    // calFullMonths2 = calFullMonths2 - rentFreeMonths;
    
    // while(calFullMonths2>=paymentIntervalMonths){

    //     calperiodEnds = calperiodEnds.add(paymentIntervalMonths,'month');
    //     periodEnds.push(calMonthsDate.format('YYYY/MM/DD'));
 
    //     // console.log("------------------ok,",periodStarts,periodEnds);
    //     calFullMonths2 -= paymentIntervalMonths;
    // }

    // for (let index = 0; index < otherValue.length; index++) {
    //     const element = array[index];
        
    // }
    // calperiodEnds = calperiodEnds.add(paymentIntervalMonths,'month');
  





    // periodEnds.push(calperiodEnds.format('YYYY/MM/DD'));


    // calperiodEnds = calperiodEnds.add(paymentIntervalMonths,'month');
    // periodEnds.push(calperiodEnds.format('YYYY/MM/DD'));

    // calperiodEnds = calperiodEnds.add(lastMonthDays,'day');
    // periodEnds.push(endDate.format('YYYY/MM/DD'));

    return { 
        periodStarts,
        // periodEnds
    };
}


// 期间结束 数组
export function calculatePeriodDates3(planObj: PlanDTO,fullMonths:number,lastMonthDays:number,otherValue:number[]) {
    const startDate = dayjs(planObj.startdate_and_enddate?.[0]); // 合同起始日期
    const endDate = dayjs(planObj.startdate_and_enddate?.[1]); // 合同截止日期
    const totalMonths = endDate.diff(startDate, 'month') + 1; // 总月数

    const rentFreeMonths = planObj.rent_free_months ?? 0; // 免租期
    const paymentIntervalMonths = planObj.payment_interval_months ?? 1; // 付款间隔，避免除以零

    // const numberOfPeriods = Math.ceil(rentFreeMonths / paymentIntervalMonths) + Math.ceil((totalMonths - rentFreeMonths) / paymentIntervalMonths); // 期数

    // const periodStarts: string[] = []; // 每期开始日期数组
    const periodEnds: string[] = []; // 每期结束日期数组

    // eslint-disable-next-line prefer-const
    let currentDate = startDate;  // 当前期间开始
    // periodStarts.push(currentStartDate.format('YYYY-MM-DD'));

    // let calperiodEnds = '';
    // let calFullMonths2 = fullMonths;
    for (let index = 0; index < otherValue.length; index++) {
        // const element = array[index];
        if(index==0){
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            currentDate = startDate.add(paymentIntervalMonths,'month').subtract(1,'day');
            periodEnds.push(currentDate.format('YYYY-MM-DD'));
        }else if(index == otherValue.length-2){
            // currentDate = currentDate.add(paymentIntervalMonths,'month');
            // currentDate = currentDate.add(lastMonthDays,'day');
            currentDate = endDate.subtract(rentFreeMonths,'month');
            periodEnds.push(currentDate.format('YYYY-MM-DD'));
        }else if(index == otherValue.length-1){
            // currentDate = currentDate.add(rentFreeMonths,'month');
            periodEnds.push(endDate.format('YYYY-MM-DD'));
        }else{
            currentDate = currentDate.add(paymentIntervalMonths,'month');
            periodEnds.push(currentDate.format('YYYY-MM-DD'));
        }
        
    }
    // let currentEndDate = currentStartDate.add(paymentIntervalMonths, 'month').subtract(1, 'day');

    return { periodEnds };
}


/**
 * 增长周期 数组 与 获取 增长金额周期 数组
 * @param {any} plan - 合同计划对象，包含起始日期、结束日期、增长条件、增长率等
 * @returns {{
*   periods: number[] // 周期数组，包含每个支付周期的月份数
* amountsArr: number[] // 增长金额周期 数组
* }} - 返回金额数组和周期数组
*/
export function calculateAmountsAndPeriods(plan: PlanDTO,currentMonths:number) {
   const increaseIntervalMonths = plan.increase_interval_months as number; // 增长间隔月数
   const increaseRate = plan.increase_rate as number; // 增长率
   const initialMonthlyPrice = plan.initial_monthly_price as number; // 初始月价格

  const {periods} = getPeriodsArr(plan,currentMonths,increaseIntervalMonths); // 获取 增长周期 数组
 const {amountsArr} = calAmountGrowthCycle(plan,periods,initialMonthlyPrice,increaseRate);  // 获取 金额周期 数组
 console.log("🚀 ~ calculateAmountsAndPeriods ~ increaseRate:", increaseRate)
 console.log("🚀 ~ calculateAmountsAndPeriods ~ initialMonthlyPrice:", initialMonthlyPrice)
 console.log("🚀 ~ calculateAmountsAndPeriods ~ periods:", periods)

   return {
    amountsArr,
       periods
   };
}


/**
 * Description  获取周期数组
 * @param {any} currentMonths:number
 * @param {any} currentMonthPeriod:number
 * @returns {any}
 */
export function getPeriodsArr(plan:PlanDTO,currentMonths:number,currentMonthPeriod:number){
    const rent_free_months = plan.rent_free_months as number;
    console.log("currentMonths-",currentMonths);
    console.log("currentMonthPeriod-",currentMonthPeriod);
    let cm = currentMonths; // 当前剩余月数【初始化数据：总月份数】
    // eslint-disable-next-line prefer-const
    let periods: number[] = []; // 周期数组
    //    let calIncreaseRate = increaseRate;
    cm = cm - rent_free_months;
       while (cm > currentMonthPeriod) {
        //    amounts.push(currentPrice * currentMonthPeriod); // 添加当前周期金额【初期 金额】
           periods.push(Number(currentMonthPeriod)); // 添加当前周期 【初期 周期】
           cm -= currentMonthPeriod;
        //    console.log("cm:",periods);
       }
    //    amounts.push(currentPrice * currentMonthPeriod); // 添加当前周期金额【初期 金额】
       periods.push(limitDecimalPlaces(cm,2)); // 添加当前周期 【初期 周期】
       if(rent_free_months != 0){
        periods.push(Number(rent_free_months)); // 添加当前周期 【初期 周期】
       }
    // periods.push(rent_free_months); // 添加当前周期 【初期 周期】
       
       console.log("cm:",periods);
       return {periods};
  }



  /**
   * Description  获取 金额周期 数组
   * @param {any} periods:number[]
   * @param {any} currentPrice:number
   * @param {any} increaseRate:number
   * @returns {any}
   */
  function calAmountGrowthCycle(plan:PlanDTO,periods:number[],currentPrice:number,increaseRate:number){ 
    console.log("periods-",periods);
    console.log("currentPrice-",currentPrice);
    console.log("increaseRate-",increaseRate);
    // const Increase_interval_months = plan.increase_interval_months;
    
    // eslint-disable-next-line prefer-const
    let amountsArr:number[] = [];
    let rateIncreaseValue:number = 1;
    
    for (let i = 0; i < periods.length; i++) {
        const calAmounts = currentPrice;
        rateIncreaseValue = (rateIncreaseValue + increaseRate*0.01)**i
        console.log("🚀 ~ calAmountGrowthCycle ~ rateIncreaseValue:", rateIncreaseValue)
        const calValue = periods[i]*calAmounts*rateIncreaseValue // 周期月份*周期月份匹配的价格*((1+(增长率的i次方))
        console.log("🚀 ~ calAmountGrowthCycle ~ calValue:", calValue)
        amountsArr.push(limitDecimalPlaces(calValue,0));
        rateIncreaseValue = 1;
       }

        if(plan.rent_free_months != 0){ // 有减免的情况下，要把末尾的金额去掉。
            amountsArr[amountsArr.length-1] = 0;
        }
       return {amountsArr}
  }
   


/**
 * Description：租金支付的月份周期 数组
 * @param {any} plan:PlanDTO
 * @returns {any}
 */
export function calculateMonthsArray(plan:PlanDTO,currentMonths:any) {
    const rentFreeMonths = plan.rent_free_months ?? 0; // 免租期
    const paymentIntervalMonths = plan.payment_interval_months ?? 1; // 付款间隔，避免除以零

    // eslint-disable-next-line prefer-const
    let rentPaymentMonthsCycleArray:number[] = [];

    let calCurrentMonths = currentMonths;
    // 减免 方面处理 【先减去减免部分 储存起来，等待 插入前面的数据完成后，最后再插入减免部分】
    calCurrentMonths = calCurrentMonths - rentFreeMonths;

    while (calCurrentMonths>paymentIntervalMonths) {
        rentPaymentMonthsCycleArray.push(Number(paymentIntervalMonths));
        calCurrentMonths -= paymentIntervalMonths;
    }
    // console.log("🚀 ~ calculateMonthsArray ~ rentPaymentMonthsCycleArray1:", rentPaymentMonthsCycleArray)
    rentPaymentMonthsCycleArray.push(Number(limitDecimalPlaces(calCurrentMonths,2)));
    rentPaymentMonthsCycleArray.push(Number(rentFreeMonths));
    console.log("🚀 ~ calculateMonthsArray ~ --------- gaga ------------:", rentPaymentMonthsCycleArray)
    return {rentPaymentMonthsCycleArray};
  }


/**
 * Description 中转
 * @param {any} plan:PlanDTO
 * @param {any} periods:number[]
 * @param {any} amountsArr:number[]
 * @returns {any}
 */

 export function transferArrayFun(plan:PlanDTO, periods:number[],amountsArr:number[]){
    
    // const pim = plan?.payment_interval_months as number; // 支付周期f
    
    const priceArr:number[] = [];
    const myPeriods:number[] = periods;
    console.log("🚀 ~ myPeriods", myPeriods) // 没问题 【12,12,6,6】
    console.log("🚀 ~ amountsArr:", amountsArr)
    // 获得单价
    for (let index = 0; index < myPeriods.length; index++) {
        const Periods = myPeriods[index];
        const AmountsArr = amountsArr[index];
        const getvalue = AmountsArr/Periods*0.1;
        priceArr.push(getvalue);
    }

    console.log("🚀 ~ transferArrayFun ~ priceArr:", priceArr) // 没问题
   // --------------------------------------------------------------------------
    const transferArray:number[] = [];
    // eslint-disable-next-line prefer-const
    let calPeriods:number[] = myPeriods;  // 计算 每个品种的桃子 是否转移光？
   
    // 中转数组构建【排队放入】
    // 将
    for (let k = 0; k < myPeriods.length; k++) {
        // console.log("kkk--",k,"---", myPeriods.length,"--",myPeriods[k]);
        ;
         for (let j = 0.1; j < myPeriods[k]; j+=0.1) {
            // console.log("mmmm--jj",limitDecimalPlaces(j,1)); // 单价
            // console.log("mmmm--",priceArr[k]); // 单价
            // console.log("mmmm--2"); // 没问题
            // if(calPeriods[k] != 0){
                // 单价持续抽出
                transferArray.push(priceArr[k])
         }
        
        }
        // console.log("🚀 ~ ------------------------------:")
        return {transferArray};
    }

/**
 * Description
 * @param {any} plan:PlanDTO
 * @param {any} rpmca:number[]
 * @param {any} ta:number[]
 * @returns {any}
 */

  export  function paymentAmountCycleArray(plan:PlanDTO,rpmca:number[],ta:number[]){
    console.log("🚀 ~ paymentAmountCycleArray ~ Array1:", ta)  // 数据中转库
    
    console.log("🚀 ~ paymentAmountCycleArray ~ Array2:", rpmca) // 支付周期
    
        // eslint-disable-next-line prefer-const
        let paymentAmountArr:number[] = [];
        // let getlength  = transferArray.length;
        // eslint-disable-next-line prefer-const
        let calValue:number = 0;
         // eslint-disable-next-line prefer-const
        let saveData:number = 0;
        for (let i = 0; i < rpmca.length; i++) {
            // const element = array[index];
            for (let j = 0; j < rpmca[i]*10; j++) {
                // const element = array[index];
                if(rpmca[i] != 0){
                    saveData += ta[calValue];
                    calValue += 1;
                }
                
            }
            console.log("🚀 ~ paymentAmountCycleArray ~ saveData:", saveData)
            paymentAmountArr.push(limitDecimalPlaces(saveData,0));
            saveData = 0;
        }
           
        if(plan.rent_free_months != 0){
            paymentAmountArr[paymentAmountArr.length-1] = 0;
        }


        return {
            paymentAmountArr
        }
    }




/**
 * Description
 * @param {any} periodStarts:string[]
 * @param {any} periodEnds:string[]
 * @param {any} paymentAmountArr:number[]
 * @returns {any}
 */
 export function resultsFun(periodStarts:string[],periodEnds:string[],paymentAmountArr:number[],due_dateArr:string[],remarksArr:string[]){
    const paymentDetails: PaymentDetailItemVO[] = [];
    for (let i = 0; i < periodStarts.length; i++) {
        paymentDetails.push({
          period_start: periodStarts[i], // 期间开始
          period_end: periodEnds[i], // 期间结束
          amount: paymentAmountArr[i], // 金额
          due_date: due_dateArr[i], // 缴纳截止日期
          is_paid: false, // 是否支付
          is_split_payment: false, // 是否分期支付
          remarks: remarksArr[i], // 备注
        });
      }
    
    //   console.log(paymentDetails); // 打印结果
    
      return {paymentDetails};
}



/**
 * Description
 * @param {any} periodStarts:string[]
 * @returns {any}
 */
export function due_dateFun(periodStarts:string[]){
    // let elementDate = periodStarts;
    const due_dateArr:string[] = [];
    for (let index = 0; index < periodStarts.length; index++) {
        const element = dayjs(periodStarts[index]);
        if(index==0){
            
            due_dateArr.push(element.add(3,'day').format('YYYY-MM-DD'));
        }else{
            due_dateArr.push(element.subtract(1,'month').format('YYYY-MM-DD'));
        }
    }
    return {due_dateArr}
//    const changeFormat = dayjs(periodStarts)
}



/**
 * Description
 * @param {any} rentPaymentMonthsCycleArray:number[]
 * @returns {any}
 */
export function remarksFun(plan:PlanDTO,rentPaymentMonthsCycleArray:number[]){
    const remarksArr:string[] = [];
    for (let index = 0; index < rentPaymentMonthsCycleArray.length; index++) {
        // const element = rentPaymentMonthsCycleArray[index];
        if(index === rentPaymentMonthsCycleArray.length-1 && plan.rent_free_months != 0){
            remarksArr.push(`${rentPaymentMonthsCycleArray[index]}个月奖励期`);
            // remarkArr.push(`${element}个月奖励期`); 
        }else{
            remarksArr.push("");
        }
        
    }
    return {remarksArr}
}