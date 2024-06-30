<template>
    <!-- 一.乙方承租商铺基础数据计算 的组件-->
    <TableForMapVue @update="handleUpdateForOne"></TableForMapVue>

    <!-- 三. 租赁押金和租金支付时间节点及具体金额 中的 合同押金缴纳详情 -->
    <TableInputVue @update="handleUpdate"></TableInputVue>
    <hr>
    <!-- 需要打印的区域标签 -->
    <div id="myTable">
        <!-- 循环 -->
        <div v-for="(element, index) in htmlDiv" :key="index" v-html="element.htmlElement"></div>
        <!-- 二.合同基础信息 -->
        <br><br>
        <h5>合同租金履行详情</h5>
        <table border="1">
            <tr>
                <th>期数</th>
                <th>期间开始</th>
                <th>期间结束</th>
                <th>金额</th>
                <th>缴纳截止日期</th>
                <th>备注</th>
            </tr>
            <!-- 循环 -->
            <tr v-for="(element, index) in htmlTableForTrTd" :key="index" v-html="element.htmlElement"></tr>
        </table>

        <!-- <a-table :dataSource="dataSource" :columns="columns" :pagination="false" /> -->
    </div>
    <a-button type="primary" @click="clickFun">打印</a-button>
</template>


<script lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { object } from 'vue-types';
import TableInputVue from './tableInput.vue'
import TableForMapVue from './tableForMap.vue';
export interface dataType {
    datePickerValue: Date,
    rentMonthValue: Number,
    payModeValue: String,
    depositValue: Number,
    growthRateConditionValue: null,
    growthRateValue: 0,
    otherStringValue: ''
}
export default {
    components: {
        TableInputVue,
        TableForMapVue
    },
    methods: {

    }
    ,
    setup() {
        const initData: any = {}
        let getData = reactive(initData)
        const htmlDiv = ref<any>([])
        const htmlTableForTrTd = ref<any>([])
        let getBeginValue = reactive({
            calDataTotalRent: 0,
            calDataTotalArea: 0
        });
        const handleUpdate = (data: any) => {
            console.log(data);
            getData = { ...data };
            handAddHTML()
        }
        const handleUpdateForOne = (data: any, data2: any) => {
            console.log("getDom:", data);
            // getData = { ...data };
            // handAddHTML()
            console.log(data, data2);
            getBeginValue = {...data2};
            handAddHTMLForOne(data);

        }
        const dateCal = (dateObj: any) => {
            const formattedDateStr = dateObj.toLocaleDateString('zh-CN', {
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
        const handAddHTMLForOne = (domData: any) => {
            htmlDiv.value.push({
                htmlElement: domData.outerHTML,
                attr: {
                    class: 'tag',
                },
            });
        }
        const handAddHTML = () => {
            // 进行逻辑计算
            // console.log("test");
            // console.log(getData.datePickerValue.$d);
            const dateObjBegin = new Date(getData.datePickerValue.$d);
            // console.log("test2");
            // console.log(dateObjBegin);
            // 后面计算用

            const dateCopyBegin = new Date(dateObjBegin); // 复制好的签约日期
            const dateCopyEnd = new Date(dateObjBegin); // 复制好的签约日期
            console.log("@@!!" + dateCopyBegin);
            // console.log("@@"+dateCopyBegin);


            const displayData = dateCal(getData.datePickerValue.$d);  //签约日期
            console.log(displayData)
            // 往后推3天时间，缴纳截止时间
            // dateObj.setDate(dateObj.getDate() - 3);
            const displayDataAfter = dateCal(dateCalAddSub(Object.assign(new Date(), dateObjBegin), -3)); // 初期缴费 3个工作日以内的日期
            console.log(displayData);
            // 再添加标签元素合并
            htmlDiv.value.push({
                htmlElement: `
        <h1>二.合同基础信息</h1>
        <span>租赁期限(月)：</span>
        <input type="text" value="${getData?.rentMonthValue?.value}" disabled="disabled"></input><br>
        <span>合同生效日期：</span>
        <input type="text" value="${displayData}" disabled="disabled"></input><br>
        <span>支付方式(每多少月)：</span>
        <input type="text" value="${getData?.payModeValue?.value}" disabled="disabled"></input><br>
        <span>押金：</span>
        <input type="text" value="${getData?.depositValue}" disabled="disabled"></input><br>
        <span>增长率条件(每多少月)：</span>
        <input type="text" value="${getData?.growthRateConditionValue?.value}" disabled="disabled"></input><br>
        <span>增长率(百分比)：</span>
        <input type="text" value="${getData?.growthRateValue}" disabled="disabled"></input><br>
        <span>其他情况描述：</span><br>
        <textarea disabled="disabled">${getData?.otherStringValue}</textarea>
       
        <br>
        <br>
        <h1>三.租赁押金和租金支付时间节点及具体金额 </h1>
        <h5>押金情况</h5>
        <table border="1">
            <tr>
                <th>#</th>
                <th>金额</th>
                <th>缴纳截止日期</th>
                <th>备注</th>
            </tr>
            <tr>
                <td>押金</td>
                <td>${getData?.depositValue}</td>
                <td>${displayDataAfter}</td>
                <td></td>
            </tr>
        </table>
                `,
                attr: {
                    class: 'tag',
                },
            });
            // ------------------------------ 计算  ----------------------------------------------- 
            console.log("@@!!" + dateObjBegin);
            // 计算总期数 租赁期限(月)除以 支付方式(月)
            const TermTotal = getData.rentMonthValue.value / getData.payModeValue.value;
            const dateBeginValue = displayData; // 签约的最初值
            // 计算每个月的费用
            // const calValue = getData.areaOneValue * getData.rentOneValue + getData.areaTwoValue * getData.rentTwoValue + getData.areaThreeValue * getData.rentThreeValue;

            const moneyTotal = getBeginValue.calDataTotalRent * getData.payModeValue.value;

            // 初始化
            let initForMoney = moneyTotal;

            // 根据 已定义好的 支付方式，得出满足支付方式的期数是多少。[增长率条件月数 除以 支付方式[月数] ]
            const needTerm = getData.growthRateConditionValue.value / getData.payModeValue.value;
            console.log(dateCal(dateSetMonthCalAddSub(dateObjBegin, -getData.payModeValue.value)));
            // const dateObjBegin = new Date(getData.datePickerValue.$d);
            for (let index = 1; index < TermTotal + 1; index++) {
                htmlTableForTrTd.value.push({
                    htmlElement: `
                    <td>${index}</td>
                    <td>${dateCal(dateSetMonthCalAddSub(dateObjBegin, getData.payModeValue.value))}</td>
                    <td>${dateCal(dateSetMonthCalAddSub(dateCopyEnd, getData.payModeValue.value))}</td>
                    <td>${initForMoney.toFixed(2)}</td>
                    <td>${dateCal(dateCalAddSub(new Date(dateObjBegin), -10))}</td>
                    <td></td>
                    `,
                    attr: {
                        class: 'tag'
                    }
                })

                if (index % needTerm == 0) {
                    console.log("增长率有效");
                    if (index < getData.rentMonthValue.value / getData.payModeValue.value) {
                        initForMoney = Number((initForMoney * ((0.01 * getData.growthRateValue) + 1)).toFixed(2))

                    }
                }
            }
        }
        const clickFun = () => {
            // 获取表格元素
            // var table = document.getElementById("myTable");
            // 打印 表格中的所有内容
            const getDom = ref<HTMLElement | any>(document.getElementById("myTable"));
            // 打开新窗口并显示表格预览
            var w = window.open();
            if (w) {
                w.document.write(`
                            <html>
                                <head>
                                <title>Table Preview</title>
                                <style>
                                    /* Your table styles here */
                                    table {
                                    border-collapse: collapse;
                                    }
                                    th, td {
                                    border: 1px solid black;
                                    padding: 8px;
                                    text-align: left;
                                    }
                                    th {
                                    background-color: #ddd;
                                    }
                                </style>
                                </head>
                                <body>
                                ${getDom.value.outerHTML}
                                </body>
                            </html>
                            `);
                // 执行打印操作
                w.print();
                w.close();
            }
        }
        return {
            clickFun,
            getData,
            htmlDiv,
            htmlTableForTrTd,
            handleUpdateForOne,
            handleUpdate,
            handAddHTML,
            dataSource: [
                {
                    key: '1',
                    name: 'Mike',
                    age: 32,
                    address: '10 Downing Street',
                },
                {
                    key: '2',
                    name: 'John',
                    age: 42,
                    address: '10 Downing Street',
                },
            ],

            columns: [
                {
                    title: 'Name',
                    dataIndex: 'name',
                    key: 'name',
                },
                {
                    title: 'Age',
                    dataIndex: 'age',
                    key: 'age',
                },
                {
                    title: 'Address',
                    dataIndex: 'address',
                    key: 'address',
                },
            ],
        };
    },
};
</script>