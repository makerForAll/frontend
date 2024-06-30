<template>
    <!-- <h4 v-show="dataObject">已接收来自二的数据</h4> -->
    <hr>
    <div id="printArea">
        <br>
        <h2>三.租赁押金和租金支付时间节点及具体金额</h2>
        <hr>
        <h5>押金情况</h5>
        <table>
            <tr>
                <th>#</th>
                <th>金额(元)</th>
                <th>缴纳截止日期</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>押金</td>
                <td>{{ getRentValue }}</td>
                <td>{{ getBeginDate }}</td>
                <td></td>
            </tr>
        </table>
        <h5>合同租金缴纳详情</h5>
        <table>
            <tr>
                <th>期数</th>
                <th>期间开始</th>
                <th>期间结束</th>
                <th>金额(元)</th>
                <th>缴纳截止日期</th>
                <th>备注</th>
            </tr>
            <tr v-for="(item, index) in arrViewForPage">
                <td>{{ index + 1 }}</td>
                <td>{{ arrViewForBeginAndEnd[index].dateBegin }}</td>
                <td>{{ arrViewForBeginAndEnd[index].dateEnd }}</td>
                <td>{{ item }}</td>
                <td>{{ deadlineForPaymentArrObje[index] }}</td>
                <td>{{ noteArrObj[index] }}</td>
            </tr>
            <tr>
                <td colspan="3" style=" text-align: center;">总金额</td>
                <td>{{totalMoney}}</td>
            </tr>
        </table>
    </div>
    <a-button type="primary" @click="handleClick">生成内容【三】</a-button>
</template>
<script lang="ts">
import { table } from 'console';
import { watch } from 'fs';
import { reactive, ref, watchEffect } from 'vue';
import { any } from 'vue-types';


export default {
    props: {
        dataObject: Object
    },
    emits: ['update'],
    methods: {
        handleClick() {
            // 更新数据
            // this.updateDom()
            // 触发自定义事件并传递数据
            // this.$emit('update', "this.arrViewForPage");
            // ---- 下面这个需要还原
            this.$emit('update', this.getDom); 
            // console.log(this.getDom);
            // this.totalMoneyFun([5555,6666]);

            // const getArr = [12,12];
            // console.log("数组",[12, 12, 12, 6]);

            // this.priceCalculationFunction(48, 6, 6, 0.06, 3935.4, [6, 6, 6, 6, 6, 6, 12], 12, "3");

            // this.arrData(48, 6,12, "3");
            // this.arrData(60, 20, 6, "3");
            // this.priceCalculationFunctionThree(60,12,12,0.06,3935.4,[12,12,12,6,18]);
        }
    },
    setup(props) {
        const arrViewForPage = ref();
        const arrViewForBeginAndEnd = ref();
        const deadlineForPaymentArrObje = ref();
        const noteArrObj = ref();
        const getDom = ref<HTMLElement | any>();
        const getRentValue = ref();
        const getBeginDate = ref();
        const totalMoney = ref(0);

        // const threeDom = ref();

        watchEffect(() => { // 当 二 按钮被按后，三才能获取数据，这时会监听到数据
            const propsInit = reactive({ ...props?.dataObject });// 获取了 合同基本数据
            const getData = reactive({
                dataOne: propsInit?.dataOne,
                dataTwo: propsInit?.dataTwo,
            })

            getRentValue.value = getData?.dataTwo?.depositValue;
            if (getData?.dataTwo?.datePickerValue) {
                getBeginDate.value = dateCal(dateCalAddSub(new Date(getData?.dataTwo?.datePickerValue.$d), 3));
            }

            const beginDate = getData.dataTwo?.datePickerValue;
            console.log("dataOne?.rentFreeObject?.container", getData?.dataTwo?.rentFreeObject?.container);
            // 获取 匹配业务逻辑的 月数数组  arrData
            // 获取 匹配业务逻辑的起始结束日期
            // 获取 匹配业务逻辑的 价格
            // 获取 匹配业务逻辑的 备注


            switch (getData?.dataTwo?.rentFreeObject?.container) {
                case "1":  // 默认模式【非免租期】
                    console.log("默认模式");

                    // ------------- 数组计算
                    const oneArr = arrData(
                        getData.dataTwo?.rentMonthValue.value,
                        getData.dataTwo?.payModeValue.value,
                        getData.dataTwo?.rentFreeObject.rentFreeMonths,
                        getData?.dataTwo?.rentFreeObject?.container
                    ) as number[];
                    console.log("oneArr,#############", oneArr);

                    if (oneArr.length > 0) {

                        // --------期间开始 期间结束
                        arrViewForBeginAndEnd.value = beginAndEnd(beginDate, oneArr);

                        // --------金额 计算
                        arrViewForPage.value = priceCalculationFunction(
                            getData.dataTwo?.rentMonthValue.value,
                            getData.dataTwo?.payModeValue.value,
                            getData.dataTwo?.growthRateConditionValue.value,
                            getData.dataTwo?.growthRateValue * 0.01,
                            getData.dataOne?.calDataTotalRent,
                            oneArr,
                            getData.dataTwo?.rentFreeObject.rentFreeMonths,
                            "1");
                        console.log("arrViewForPage.value-----ForOne", arrViewForPage.value);

                        // --------缴纳截止日期 [需要写成1个函数]
                        deadlineForPaymentArrObje.value = deadlineForPaymentArrFun(arrViewForBeginAndEnd.value, getData?.dataTwo?.rentFreeObject?.container);

                        // --------备注
                        noteArrObj.value = noteFun(oneArr, getData?.dataTwo?.rentFreeObject?.container);

                        // ----总金额计算
                        totalMoney.value = totalMoneyFun(arrViewForPage.value);
                        
                    }
                    break;
                case "2":
                    console.log("头部模式");

                    // ---------- 数组计算
                    const twoArr = arrData(
                        getData.dataTwo?.rentMonthValue.value,
                        getData.dataTwo?.payModeValue.value,
                        getData.dataTwo?.rentFreeObject.rentFreeMonths,
                        getData?.dataTwo?.rentFreeObject?.container
                    ) as number[];

                    console.log("oneArr,#############", twoArr);

                    if (twoArr.length > 0) {

                        // -------- 日期
                        arrViewForBeginAndEnd.value = beginAndEnd(beginDate, twoArr);

                        // -------- 价格计算 Begin
                        arrViewForPage.value = priceCalculationFunction(
                            getData.dataTwo?.rentMonthValue.value,
                            getData.dataTwo?.payModeValue.value,
                            getData.dataTwo?.growthRateConditionValue.value,
                            getData.dataTwo?.growthRateValue * 0.01,
                            getData.dataOne?.calDataTotalRent,
                            twoArr,
                            getData.dataTwo?.rentFreeObject.rentFreeMonths,
                            "2");

                        console.log("arrViewForPage.value-----ForOne", arrViewForPage.value);

                        // -------- 缴纳截止日期 [需要写成1个函数]

                        deadlineForPaymentArrObje.value = deadlineForPaymentArrFun(arrViewForBeginAndEnd.value, getData?.dataTwo?.rentFreeObject?.container);

                        // -------- 备注 数组
                        noteArrObj.value = noteFun(twoArr, getData?.dataTwo?.rentFreeObject?.container);

                        // ----总金额计算
                        totalMoney.value = totalMoneyFun(arrViewForPage.value);
                    }

                    console.log("arrViewForPage", arrViewForPage.value);
                    // 价格计算 End

                    break;
                case "3":
                    console.log("尾部模式");

                    // ---------- 数组计算
                    const threeArr = arrData(
                        getData.dataTwo?.rentMonthValue.value,
                        getData.dataTwo?.payModeValue.value,
                        getData.dataTwo?.rentFreeObject.rentFreeMonths,
                        getData?.dataTwo?.rentFreeObject?.container
                    ) as number[];

                    console.log("threeArr,#############", threeArr);

                    if (threeArr.length > 0) {

                        // -------- 日期
                        arrViewForBeginAndEnd.value = beginAndEnd(beginDate, threeArr);

                        // -------- 价格计算 Begin
                        arrViewForPage.value = priceCalculationFunction(
                            getData.dataTwo?.rentMonthValue.value,
                            getData.dataTwo?.payModeValue.value,
                            getData.dataTwo?.growthRateConditionValue.value,
                            getData.dataTwo?.growthRateValue * 0.01,
                            getData.dataOne?.calDataTotalRent,
                            threeArr,
                            getData.dataTwo?.rentFreeObject.rentFreeMonths,
                            "3");

                        console.log("arrViewForPage.value-----ForThree", arrViewForPage.value);

                        // -------- 缴纳截止日期 [需要写成1个函数]

                        deadlineForPaymentArrObje.value = deadlineForPaymentArrFun(arrViewForBeginAndEnd.value, getData?.dataTwo?.rentFreeObject?.container);

                        // -------- 备注 数组
                        noteArrObj.value = noteFun(threeArr, getData?.dataTwo?.rentFreeObject?.container);

                        // ----总金额计算
                        totalMoney.value = totalMoneyFun(arrViewForPage.value);
                    }

                    console.log("arrViewForPageForThree", arrViewForPage.value);
                    // 价格计算 End
                    break;
                case "4":
                    console.log("额度模式，每年配比消耗");
                    const fourArr = [];
                    const indexForTableFour = ref(0); // 总期数
                    indexForTableFour.value = getData.dataTwo?.rentMonthValue.value / getData.dataTwo?.payModeValue.value
                    for (let i = 0; i < indexForTableFour.value; i++) {
                        fourArr.push(getData.dataTwo?.payModeValue.value)
                    }
                    console.log(fourArr);
                    if (fourArr.length > 0) {
                        beginAndEnd(beginDate, fourArr);
                    }
                    break;
                default: // 默认模式【无免租期】
                    console.log("default");
                    break;
            }

            getDom.value = document.getElementById("printArea");
        });


        const noteFun = (arrMonth: any, mode: any) => {
            switch (mode) {
                case "1":
                    const noteArrOne: any = [];
                    for (let i = 0; i < arrMonth.length; i++) {
                        noteArrOne.push('');
                    }
                    return noteArrOne;
                    break;
                case "2":
                    const noteArrTwo = [];
                    noteArrTwo.push(`${arrMonth[0]}个月装修期`);
                    for (let i = 0; i < arrMonth.length - 1; i++) {
                        // const element = array[i];
                        noteArrTwo.push('');
                    }
                    return noteArrTwo;

                    break;
                case "3":
                    const noteArrThree = [];

                    for (let i = 0; i < arrMonth.length - 1; i++) {
                        // const element = array[i];
                        noteArrThree.push('');
                    }
                    noteArrThree.push(`${arrMonth[arrMonth.length - 1]}个月奖励期`);
                    return noteArrThree;
                    break;
                default:
                    break;
            }
        }

        const deadlineForPaymentArrFun = (BeginAndEndDate: any, demo: string) => {
            switch (demo) {
                case "1":
                    const deadlineForPaymentOne = Object.assign([], BeginAndEndDate)
                    console.log("deadlineForPayment", deadlineForPaymentOne);
                    const deadlineForPaymentArrOne = [];

                    for (let i = 0; i < deadlineForPaymentOne.length; i++) {
                        const element = deadlineForPaymentOne[i].dateBegin;
                        console.log("element", element);
                        const newDate = new Date(element);
                        if (i == 0) {
                            deadlineForPaymentArrOne.push(dateCal(dateCalAddSub(newDate, 3)));
                        } else {
                            deadlineForPaymentArrOne.push(dateCal(dateSetMonthCalAddSub(newDate, -1)));
                        }

                    }
                    console.log(deadlineForPaymentArrOne);
                    return deadlineForPaymentArrOne;
                    break;
                case "2":
                    const deadlineForPaymentTwo = Object.assign([], arrViewForBeginAndEnd.value)
                    console.log("deadlineForPayment", deadlineForPaymentTwo);
                    const deadlineForPaymentArrTwo = [];
                    for (let i = 0; i < deadlineForPaymentTwo.length; i++) {
                        if (i == 0) {
                            deadlineForPaymentArrTwo.push(''); // 头部第一个是免租期
                        } else if (i == 1) {
                            const element = deadlineForPaymentTwo[0].dateBegin;
                            const newDate = new Date(element);
                            deadlineForPaymentArrTwo.push(dateCal(dateCalAddSub(newDate, 3)));
                        } else {
                            const element = deadlineForPaymentTwo[i].dateBegin;
                            const newDate = new Date(element);
                            deadlineForPaymentArrTwo.push(dateCal(dateSetMonthCalAddSub(newDate, -1)));
                        }
                    }
                    console.log(deadlineForPaymentArrTwo);
                    return deadlineForPaymentArrTwo;
                    break;
                case "3":
                    const deadlineForPaymentThree = Object.assign([], arrViewForBeginAndEnd.value)
                    console.log("deadlineForPayment", deadlineForPaymentThree);
                    const deadlineForPaymentArrThree = [];
                    for (let i = 0; i < deadlineForPaymentThree.length; i++) {
                        if (i == 0) {
                            const element = deadlineForPaymentThree[0].dateBegin;
                            const newDate = new Date(element);
                            deadlineForPaymentArrThree.push(dateCal(dateCalAddSub(newDate, 3)));
                        } else if (i == deadlineForPaymentThree.length) {
                            // deadlineForPaymentArrThree.push(''); // 头部第一个是免租期
                        } else {
                            const element = deadlineForPaymentThree[i].dateBegin;
                            const newDate = new Date(element);
                            deadlineForPaymentArrThree.push(dateCal(dateSetMonthCalAddSub(newDate, -1)));
                        }
                    }
                    console.log(deadlineForPaymentArrThree);
                    return deadlineForPaymentArrThree;
                    break;
                default:
                    break;
            }

        }

        // 数组 和 价格
        // ############## 匹配免租政策的 数组 #######################
        const arrData = (leaseTerm: any, paymentFrequency: any, rentFreeMonths: any, mode: string) => {
            // ### 计算每期缴纳费用 相匹配的 月数数组 ###
            // 参数1:租赁期限，参数2：支付方式,免租期
            // 参数3：免租期
            switch (mode) {
                case "1": // 
                    // 租赁期限
                    // 按照 支付方式，不断的转移里面值到一个数组中
                    const newArrOne: Array<number> = []
                    let initDataOne = leaseTerm;
                    console.log("initDataOne", initDataOne);
                    for (let i = 0; i < Math.ceil(leaseTerm / paymentFrequency); i++) {
                        // const element = array[i];
                        if (initDataOne >= paymentFrequency) {
                            newArrOne.push(paymentFrequency);
                            initDataOne -= paymentFrequency;
                        } else {
                            newArrOne.push(initDataOne)
                        }
                    }
                    return newArrOne;
                    // console.log("newArr", newArrOne);
                    break;
                case "2":
                    // 租赁期限
                    // 按照 支付方式，不断的转移里面值到一个数组中
                    const newArrTwo = [];
                    let initDataTwo = leaseTerm;
                    let initCondition = initDataTwo - rentFreeMonths;
                    console.log("initDataTwo####", initDataTwo);
                    console.log("Math.ceil(leaseTerm / paymentFrequency)", Math.ceil(leaseTerm / paymentFrequency));
                    const numValue = Math.ceil((leaseTerm - rentFreeMonths) / paymentFrequency) + 1;
                    for (let i = 0; i < numValue; i++) {
                        // const element = array[i];
                        if (initDataTwo > initCondition) {
                            initDataTwo -= rentFreeMonths;
                            console.log("1", initDataTwo);
                            newArrTwo.push(Number(rentFreeMonths));
                        } else if (initDataTwo >= paymentFrequency) {
                            initDataTwo -= paymentFrequency;
                            console.log("2", initDataTwo, paymentFrequency);
                            newArrTwo.push(paymentFrequency);
                        } else {
                            console.log("3", initDataTwo);
                            newArrTwo.push(initDataTwo);
                        }
                    }
                    console.log("newArrTwo", newArrTwo);
                    return newArrTwo

                    break;
                case "3":
                    // 租赁期限
                    // 按照 支付方式，不断的转移里面值到一个数组中
                    const newArrThree = [];
                    let initDataThree = leaseTerm;
                    let initConditionThree = initDataThree - rentFreeMonths;
                    console.log("initDataTwo####", initDataThree);
                    console.log("Math.ceil(leaseTerm / paymentFrequency)", Math.ceil(leaseTerm / paymentFrequency));
                    const numValueThree = Math.ceil((leaseTerm - rentFreeMonths) / paymentFrequency) + 1;
                    for (let i = 0; i < numValueThree; i++) {
                        if (initConditionThree >= paymentFrequency) { // 常规
                            console.log("1", initConditionThree, paymentFrequency);
                            newArrThree.push(paymentFrequency);
                            initConditionThree -= paymentFrequency;
                        } else if (initConditionThree < paymentFrequency && initConditionThree > 0) { // 余数
                            console.log("2", initConditionThree);
                            newArrThree.push(initConditionThree);
                            initConditionThree = 0;
                        }        // const element = array[i];
                        else { // 免租期
                            console.log("3", initConditionThree);
                            newArrThree.push(Number(rentFreeMonths));
                        }
                    }
                    console.log("newArrThree", newArrThree);
                    return newArrThree;
                    break;
                default:
                    break;
            }

        }
        // ############## 匹配免租政策的 数组 end #######################


        // 总金额计算
        const totalMoneyFun =(arr:any)=>{
            let element:number =0;
            for (let i = 0; i < arr.length; i++) {
                element += Number(arr[i]);
                console.log(arr[i]);
            }
            console.log(element);
            return element;
        }

        // 价格计算
        const priceCalculationFunction = (num: any, num2: any, num3: any, num4: any, num5: any, num6: any, num7: any, num8: any) => {
            // 参数1：租赁期限，参数2：支付方式, 参数3：增长条件，参数4：增长值 ,参数5：初始月租金, 参数6: 匹配逻辑的数组组合【里面是月数】
            // 参数7：免租期，参数8：业务需求模式
            let priceArray: any = []; // 用来存储价格数组

            switch (num8) {
                case "1": // 无免租期的 计算价格方式
                    console.log(
                        num,
                        num2,
                        num3,
                        num4,
                        num5,
                        num6,
                        num7,
                        num8,
                        );
                    const calArrOne = [];
                    let storeValueOne = -1; // 补偿，希望第一个从0开始
                    for (let i = 0; i < num / num3; i++) { // 总租赁月数/ 增长条件
                        // 起始值
                        const calPrice = num5 * ((1 + num4) ** i);// 初始租金*（增长率）的幂
                        for (let j = 0; j < num3 / num2; j++) {  // 求公差【增长条件/支付方式】
                            storeValueOne += 1;     // 0 1 , 2 3 , 4 5 , 6 7 , 8 9
                            console.log(storeValueOne);
                            calArrOne.push((calPrice * num6[storeValueOne]).toFixed(2));
                        }
                        console.log("calArrone", calArrOne);
                    }
                    return calArrOne;
                    break;
                case "2": // 头部免租期 的计算价格方式
                    // console.log("priceCalculationFunctionTwo:", num, num2, num3, num4, num5, num6);
                    const calArrTwo = [];
                    let storeValueTwo = 0; // 补偿，希望第一个从1开始,0属于免租范围
                    //  因为免租，所以尾部会多出一个值
                    // const 
                    let initConditionTwo = Math.ceil((num - num7) / num3);
                    // const pointer = 1; // 增长率的初始指针【在期数的第几期开始算收费起始点】
                    // 头部 免租
                    let calPrice = 0;
                    let calNumber = num6.length; // 累计还剩多少没计算的期数
                    let remainder = 0; // 余值

                    calNumber -= 1;
                    calArrTwo.push(0);

                    for (let i = 0; i < initConditionTwo; i++) { // 总租赁月数/ 增长条件 num6.length
                        // 起始值
                        calPrice = num5 * ((1 + num4) ** i);// 初始租金*（增长率）的幂

                        // 获取 剩余的期数。
                        if (calNumber >= (num3 / num2)) {
                            calNumber -= (num3 / num2);
                            remainder = num3 / num2;
                            console.log("remainder", remainder)
                        } else if (calNumber < (num3 / num2)) {
                            remainder = calNumber;
                        }
                        for (let j = 0; j < remainder; j++) {  // 求公差【增长条件/支付方式】
                            storeValueTwo += 1;     // 0 1 , 2 3 , 4 5 , 6 7 , 8 9
                            // console.log(storeValueTwo);
                            console.log("num6[storeValueTwo]", storeValueTwo, num6[storeValueTwo])

                            calArrTwo.push((calPrice * num6[storeValueTwo]).toFixed(2));

                        }
                        // console.log("--");
                        console.log("calArr ------- two ", calArrTwo);
                    }
                    return calArrTwo
                    break;
                case "3":
                    // console.log("priceCalculationFunctionTwo:", num, num2, num3, num4, num5, num6);
                    const calArrThree = [];
                    let storeValueThree = 0; // 补偿，希望第一个从1开始,0属于免租范围
                    //  因为免租，所以尾部会多出一个值
                    // const 
                    let initConditionThree = Math.ceil((num - num7) / num3);
                    // const pointer = 1; // 增长率的初始指针【在期数的第几期开始算收费起始点】
                    // 头部 免租
                    let calPriceThree = 0;
                    let calNumberThree = num6.length; // 累计还剩多少没计算的期数
                    let remainderThree = 0; // 余值

                    calNumberThree -= 1;

                    for (let i = 0; i < initConditionThree; i++) { // 总租赁月数/ 增长条件 num6.length
                        // 起始值
                        calPriceThree = num5 * ((1 + num4) ** i);// 初始租金*（增长率）的幂
                        // 获取 剩余的期数。
                        if (calNumberThree >= (num3 / num2)) {
                            calNumberThree -= (num3 / num2);
                            remainderThree = num3 / num2;
                            console.log("remainder", remainderThree)
                        } else if (calNumberThree < (num3 / num2)) {
                            remainderThree = calNumberThree;
                        }
                        for (let j = 0; j < remainderThree; j++) {  // 求公差【增长条件/支付方式】


                            console.log("num6[storeValueThree]", storeValueThree, num6[storeValueThree])
                            calArrThree.push((calPriceThree * num6[storeValueThree]).toFixed(2));
                            storeValueThree += 1;     // 0 1 , 2 3 , 4 5 , 6 7 , 8 9
                        }
                    }
                    calArrThree.push(0); // 尾部免租
                    // console.log("--");
                    console.log("num6:", num6);
                    console.log("calArr ------- three ", calArrThree);
                    return calArrThree
                    break
                default:
                    break;
            }
        }
    

        // ----- 计算 日期用的函数
        const dateCal = (dateObj: any) => {
            const formattedDateStr = dateObj?.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }).replace(/\//g, '/');
            return formattedDateStr
        }
        const dateCalAddSub = (dateObj: any, date: number) => {
            // 计算 增加天数或剪掉天数
            dateObj.setDate(dateObj.getDate() + date);
            return dateObj
        }
        const dateSetMonthCalAddSub = (dateObj: any, month: number) => {
            dateObj.setMonth(dateObj.getMonth() + month);
            return dateObj
        }
        const beginAndEnd = (date: any, arr: Array<number>) => {
            // ----------  签约日期
            const element: any = date;
            const dateObjBegin = new Date(date.$d); // Date格式化, 可进行计算
            const beginDateString = dateCal(date.$d);   // String 格式化，用来按照常规格式表达
            // ----------  签约日期 end
            const dateValue: Array<object> = [];
            // const dateObject = {
            //     dateBegin: '',
            //     dateEnd: ''
            // }
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];
                // const initDate =
                dateValue.push({
                    dateBegin: dateCal(dateObjBegin),
                    dateEnd: dateCal(dateCalAddSub(dateSetMonthCalAddSub(dateObjBegin, arr[i]), -1))
                });
                const element2 = dateCalAddSub(dateObjBegin, 1);
            }
            return dateValue;
        }
        // // 运算一【租赁期限-免租期】
        // const operationOne = (data: any, data2: any) => { // 参数1：租赁期限，参数2：免租期

        // }
        // // 运算二【运算一的结果 余除 支付方式】
        // const operationTwo = () => { // 参数1：运算1的结果，参数2：支付方式

        // }
        // // 运算三【运算一的结果 整除 支付方式】
        // const operationThree = (num: any, num2: any) => {// 参数1：运算1的结果，参数2：支付方式
        //     return Math.floor(num / num2);
        // }

        return {
            arrViewForBeginAndEnd,
            arrViewForPage,
            deadlineForPaymentArrObje,
            noteArrObj,
            getDom,
            getRentValue,
            getBeginDate,
            totalMoney,
            priceCalculationFunction,
            arrData,
            totalMoneyFun
        }
    }
}
</script>
<style>
table {
    border: 1px solid black;
}

th,
td {
    border: 1px solid black;
    padding: 5px;
}
</style>