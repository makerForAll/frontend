import type { PaymentDetailItemDTO } from "@/api";
import dayjs, { Dayjs } from "dayjs";

import { limitDecimalPlaces } from "./helpersFun-dayjs";
import type { PaymentDetailItemVO } from "@/cp-projectCP/PaymentDetailItemHome/Vo/PaymentDetailItem.vo";
import type { Field } from "@/cp-v1/cp-GCP/Drawer/DrawerSlot4.vue";
import type { PlanDTO } from "./calPayment2";
import type { RPlanVO } from "@/custom/api/models/models-plan";
// import 'dayjs/locale/zh-cn';

// dayjs.locale('cn');

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
 * @param {RPlanVO} planObj - 包含合同信息的对象，包括起始和截止日期、免租期及付款间隔
 * @returns {{ periodStarts: string[], periodEnds: string[], numberOfPeriods: number }} 
 * - 返回每期的开始日期和结束日期数组，以及期数
 */
export function calculatePeriodDates2(planObj: RPlanVO,fullMonths:number,lastMonthDays:number,otherValue:number[]) {
    const startDate = dayjs(planObj.startdate_and_enddate?.[0]); // 合同起始日期
    let endDate = dayjs(planObj.startdate_and_enddate?.[1]); // 合同截止日期

    const rentFreeMonths = planObj.rent_free_months ?? 0; // 免租期
    const paymentIntervalMonths = planObj.payment_interval_months ?? 1; // 付款间隔，避免除以零

    const periodStarts: Dayjs[] = []; // 每期开始日期数组
    
    // 

    // eslint-disable-next-line prefer-const
    let calFullMonths = fullMonths;
    
    // eslint-disable-next-line prefer-const
    let calMonthsDate = startDate;
    // eslint-disable-next-line prefer-const
    
    let calOtherValue = 0;

    // 期间开始  ----------------------------------------------------------------------------------
    calFullMonths = calFullMonths - rentFreeMonths;
    // periodStarts.push(calMonthsDate.format('YYYY/MM/DD'));
    periodStarts.push(calMonthsDate);
    
    while(calFullMonths>=paymentIntervalMonths && calOtherValue != otherValue.length-1){

        calMonthsDate = calMonthsDate.add(paymentIntervalMonths,'month');
        // periodStarts.push(calMonthsDate.format('YYYY/MM/DD'));
        periodStarts.push(calMonthsDate);
 
        // console.log("------------------ok,",periodStarts,periodEnds);
        calFullMonths -= paymentIntervalMonths;
        calOtherValue += 1;
        console.log("calFullMonths-----------------:",calFullMonths);
        
    }

    // if(calFullMonths!=0){ // 如果还有余数，就把余下的日期加入进去
    //     calMonthsDate = calMonthsDate.add(calFullMonths,'month');
    //     calMonthsDate = calMonthsDate.add(lastMonthDays,'day');
    //     periodStarts.push(calMonthsDate)
    // }



    if(rentFreeMonths!=0){ // 如果 有减免的情况，就在末尾把
        endDate = endDate.subtract(rentFreeMonths,'month');
        endDate = endDate.subtract(1,'day');
        periodStarts.push(endDate)
    }
    
   

    // periodStarts.push(calMonthsDate.format('YYYY/MM/DD'))
    

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
export function calculatePeriodDates3(planObj: RPlanVO,fullMonths:number,lastMonthDays:number,otherValue:number[]) {
    const startDate = dayjs(planObj.startdate_and_enddate?.[0]); // 合同起始日期
    const endDate = dayjs(planObj.startdate_and_enddate?.[1]); // 合同截止日期
    const totalMonths = endDate.diff(startDate, 'month') + 1; // 总月数

    const rentFreeMonths = planObj.rent_free_months ?? 0; // 免租期
    const paymentIntervalMonths = planObj.payment_interval_months ?? 1; // 付款间隔，避免除以零

    // const numberOfPeriods = Math.ceil(rentFreeMonths / paymentIntervalMonths) + Math.ceil((totalMonths - rentFreeMonths) / paymentIntervalMonths); // 期数

    // const periodStarts: string[] = []; // 每期开始日期数组
    const periodEnds: Dayjs[] = []; // 每期结束日期数组

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
            periodEnds.push(currentDate);
            // periodEnds.push(currentDate.format('YYYY-MM-DD'));
        }else if(index == otherValue.length-2){
            // currentDate = currentDate.add(paymentIntervalMonths,'month');
            // currentDate = currentDate.add(lastMonthDays,'day');
            currentDate = endDate.subtract(rentFreeMonths,'month');
            // periodEnds.push(currentDate.format('YYYY-MM-DD'));
            periodEnds.push(currentDate);
        }else if(index == otherValue.length-1){
            // currentDate = currentDate.add(rentFreeMonths,'month');
            // periodEnds.push(endDate.format('YYYY-MM-DD'));
            periodEnds.push(endDate);
        }else{
            currentDate = currentDate.add(paymentIntervalMonths,'month');
            // periodEnds.push(currentDate.format('YYYY-MM-DD'));
            periodEnds.push(currentDate);
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
export function calculateAmountsAndPeriods(plan: RPlanVO,currentMonths:number) {
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
export function getPeriodsArr(plan:RPlanVO,currentMonths:number,currentMonthPeriod:number){
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
  function calAmountGrowthCycle(plan:RPlanVO,periods:number[],currentPrice:number,increaseRate:number){ 
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
export function calculateMonthsArray(plan:RPlanVO,currentMonths:any) {
    const rentFreeMonths = plan.rent_free_months ?? 0; // 免租期
    const paymentIntervalMonths = plan.payment_interval_months ?? 1; // 付款间隔，避免除以零

    // eslint-disable-next-line prefer-const
    let rentPaymentMonthsCycleArray:number[] = [];

    let calCurrentMonths = currentMonths; // 当前总月份
    // 减免 方面处理 【先减去减免部分 储存起来，等待 插入前面的数据完成后，最后再插入减免部分】
    calCurrentMonths = calCurrentMonths - rentFreeMonths;

    while (calCurrentMonths>paymentIntervalMonths) {
        // console.log("calCurrentMonths@:",calCurrentMonths);
        
        rentPaymentMonthsCycleArray.push(Number(paymentIntervalMonths));
        calCurrentMonths -= paymentIntervalMonths;
    }
    // console.log("🚀 ~ calculateMonthsArray ~ rentPaymentMonthsCycleArray1:", rentPaymentMonthsCycleArray)
    rentPaymentMonthsCycleArray.push(Number(limitDecimalPlaces(calCurrentMonths,2)));
    if(rentFreeMonths!=0){ // 如果存在减免，才把减免部分放入该数组。
        rentPaymentMonthsCycleArray.push(Number(rentFreeMonths));
    }
    
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

 export function transferArrayFun(plan:RPlanVO, periods:number[],amountsArr:number[]){
    
    // const pim = plan?.payment_interval_months as number; // 支付周期f
    
    const priceArr:number[] = [];
    const myPeriods:number[] = periods;
    const precision:number = 0.1;
    console.log("🚀 ~ myPeriods", myPeriods)    // 没问题 【12,12,6,6】，【12,2.27】
    console.log("🚀 ~ amountsArr:", amountsArr) // 金额数组 【36000, 7219】 最终到【36000, 5851】
    // 获得单价 --------------------------------------
    for (let index = 0; index < myPeriods.length; index++) {
        const Periods = myPeriods[index];
        const AmountsArr = amountsArr[index];
        const getvalue = AmountsArr/Periods*0.0001;
        priceArr.push(getvalue);
    }

    console.log("🚀 ~ transferArrayFun ~ priceArr:", priceArr) // 没问题
    // 通过单价，为单位，慢慢传递到新数组中
   // --------------------------------------------------------------------------
    const transferArray:number[] = [];
    // eslint-disable-next-line prefer-const
    let calPeriods:number[] = myPeriods;  // 计算 每个品种的桃子 是否转移光？
   
    // 中转数组构建【排队放入】
    // 将
    for (let k = 0; k < myPeriods.length; k++) {
        // console.log("kkk--",k,"---", myPeriods.length,"--",myPeriods[k]);
        ;
         for (let j = 0.0001; j < myPeriods[k]; j+=0.0001) {
            // console.log("mmmm--jj",limitDecimalPlaces(j,1)); // 单价
            // console.log("mmmm--",priceArr[k]); // 单价
            // console.log("mmmm--2"); // 没问题
            // if(calPeriods[k] != 0){
                // 单价持续抽出
                transferArray.push(priceArr[k])
         }
        
        }
        console.log("🚀 ~ -------------transferArray-----------------:",transferArray)
        return {transferArray};
    }

/**
 * Description
 * @param {any} plan:PlanDTO
 * @param {any} rpmca:number[]
 * @param {any} ta:number[]
 * @returns {any}
 */

  export  function paymentAmountCycleArray(plan:RPlanVO,rpmca:number[],ta:number[]){
    // 金额周期 [36000, 5851]
    // 单价周期 [0.3, 0.3179891]
    // [120000,18400]

    // 支付周期 [12,1.84]
    // 精度比就是 条数 / 周期里的对应的值。
    const precision:number = 0.0001; // 精度
    console.log("🚀 ~ paymentAmountCycleArray ~ Array1:", ta)  // 数据中转库 [] 数组中如果有138400 个数据
    
    console.log("🚀 ~ paymentAmountCycleArray ~ Array2:", rpmca) // 支付周期 【12,1.84】
    
        // eslint-disable-next-line prefer-const
        let paymentAmountArr:number[] = [];
        // let getlength  = transferArray.length;
        // eslint-disable-next-line prefer-const
        let calValue:number = 0;
         // eslint-disable-next-line prefer-const
        let saveData:number = 0;
        for (let i = 0; i < rpmca.length; i++) { // 按 支付周期的 频率 ，把每个序号上的数据，循环积累出来。【12,1.84】
            // const element = array[index];
            for (let j = 0; j < rpmca[i]; j+=0.0001) {
                // const element = array[index];
                // console.log("saveData---过程计算-j--",j)
                // console.log("saveData---过程计算-rpmca[i]--",rpmca[i])
                if(ta[limitDecimalPlaces(calValue/0.0001,0)]){
                    
                    saveData += ta[limitDecimalPlaces(calValue/0.0001,0)];
                    // console.log("saveData---过程计算---",calValue/0.0001)
                    calValue += 0.0001;
                    // console.log("saveData------",saveData);
                    
                }
                
            }
            
            paymentAmountArr.push(limitDecimalPlaces(saveData,0));
            console.log("🚀 ~ paymentAmountCycleArray ~ paymentAmountArr:", paymentAmountArr)
            saveData = 0;
        }
           
        if(plan.rent_free_months != 0){ // 如果有减免的话
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
 export function resultsFun(periodStarts:Dayjs[],periodEnds:Dayjs[],paymentAmountArr:number[],due_dateArr:Dayjs[],remarksArr:string[]){
    const paymentDetails: PaymentDetailItemDTO[] = [];
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
export function due_dateFun(periodStarts:Dayjs[]){
    // let elementDate = periodStarts;
    const due_dateArr:Dayjs[] = [];
    for (let index = 0; index < periodStarts.length; index++) {
        const element = dayjs(periodStarts[index]);
        if(index==0){
            
            // due_dateArr.push(element.add(3,'day').format('YYYY-MM-DD'));
            due_dateArr.push(element.add(3,'day'));
        }else{
            // due_dateArr.push(element.subtract(1,'month').format('YYYY-MM-DD'));
            due_dateArr.push(element.subtract(1,'month'));
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
export function remarksFun(plan:RPlanVO,rentPaymentMonthsCycleArray:number[]){
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


// ------------------------------- 插入 某变量数组中，动态生成表单配置内容 ------


// 函数定义
export function insertInputFieldsFromJson(data: PaymentDetailItemVO[], fields: Field[]) {
    data.forEach((item, index) => {
        // 根据 json 数据生成对应的 input 字段 
        // item.
        fields.push({
            name: `amount_${index}`, // 可以根据需要自定义名称
            label: `金额${index + 1}`, // 可以根据需要自定义标签
            component: 'a-input-number',
            props: { placeholder: `Enter amount for period ${index + 1}`, addonAfter: "元" },
            span: 8
        });
    });
}