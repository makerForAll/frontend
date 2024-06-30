<template>
    <h1>二.合同基础信息</h1>
    <div style="width:80%">
        <hr>

        <label for="rent">租赁期限(月)</label>
        <a-select id="rentMonth" v-model:value="myInputValue.rentMonthValue" label-in-value style="width: 240px"
            :options="options" @change="handleChange">
        </a-select><br>

        <label for="datePicker">合同生效日期</label>
        <a-date-picker id="datePicker" v-model:value="myInputValue.datePickerValue" /><br>

        <label for="payMode">支付方式(月)</label>
        <a-select id="payMode" v-model:value="myInputValue.payModeValue" label-in-value style="width: 240px"
            :options="optionsForPayMode" @change="handleChangeForPayMode">
        </a-select>
        <br>
        <hr>
        <!-- 押金 -->
        <label for="deposit">押金</label>
        <a-input style="width:90%" id="deposit" v-model:value="myInputValue.depositValue" placeholder="押金金额" />

        <br>
        <label for="growthRateCondition">增长率条件(每多少个月)</label>
        <a-select id="growthRateCondition" v-model:value="myInputValue.growthRateConditionValue" label-in-value
            style="width: 180px" :options="optionsForGrowthRateConditionValue" @change="handleChangeForGrowthRateCondition">
        </a-select>
        <br>

        <label for="growthRate">增长率(百分比)</label>
        <a-input style="width:70%" id="growthRate" v-model:value="myInputValue.growthRateValue" placeholder="增长率" />

        <br>
        <div>
            <label for="otherString" style="float: left;">其他情况描述</label>
            <a-textarea id="otherString" v-model:value="myInputValue.otherStringValue" placeholder="其他情况" :rows="5" />
        </div>
        <!-- 免租期政策逻辑 -- Begin -->
        <a-switch v-model:checked="rentFreeChecked" />

        <div v-show="rentFreeChecked">
            <!-- 从子组件中出来一个值，会影响免税功能 -->
            <twoInputForRentFree @update="handleGetKey"></twoInputForRentFree>
        </div>
        <!-- 免租期政策逻辑 --- End -->
        <!-- <button @click="testFun(myInputValue.datePickerValue, [12, 12, 12, 6, 18])">click</button> -->
        <hr>
    </div>
    <a-button type="primary" @click="handleClick">生成内容【二】</a-button>
</template>
<script lang="ts">
import { defineEmits, ref, reactive, onMounted } from 'vue';
import { Moment } from 'moment';
import twoInputForRentFree from './twoInputForRentFree.vue';
import { dataType } from '../../tableTool.vue';
import { array } from 'vue-types';
interface Value {
    value?: string;
    label?: string;
}

export interface DataType {
    datePickerValue: Date,
    rentMonthValue: String,
    payModeValue: String,
    depositValue: String,
    growthRateConditionValue: String,
    growthRateValue: String,
    otherStringValue: String
}
export default {
    components: {
        twoInputForRentFree
    },
    emits: ['update'],
    methods: {
        handleClick() {
            // 更新数据
            this.updateDom()
            // 触发自定义事件并传递数据
            this.$emit('update', this.htmlDom, this.myInputValue);
        }
    },
    setup() {
        const rentFreeChecked = ref<Boolean>(false);
        const htmlDom = ref<any>();
        const handleGetKey = (data:any,data2:any)=>{ // 参数1：key, 参数2：免租月数
            // console.log("come frome ",data);
            myInputValue.rentFreeObject.container = data;
            myInputValue.rentFreeObject.rentFreeMonths = data2;
        }
        const myInputValue = reactive<any>({
            datePickerValue: null,
            rentMonthValue: null,
            payModeValue: null,
            depositValue: 0,
            growthRateConditionValue: null,
            growthRateValue: 0,
            otherStringValue: '',
            rentFreeObject: {
                isActive:rentFreeChecked,
                container:'1',
                rentFreeMonths:0
            }
        })
        const optionsForGrowthRateConditionValue = ref<any['options']>([
            {
                value: 12,
                label: '十二个月[每一年]'
            }, {
                value: 24,
                label: '二十四个月[每二年]'
            }, {
                value: 36,
                label: '三十六个月[每三年]'
            },{
                value: 48,
                label: '四十八个月[每四年]'
            }
        ]);
        const dateCal = (dateObj: any) => {
            const formattedDateStr = dateObj?.toLocaleDateString('zh-CN', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
            }).replace(/\//g, '/');
            return formattedDateStr
        }
        // 要打印的DOM
        const updateDom = () => {
            // console.log(myInputValue?.rentMonthValue);
            htmlDom.value = `
            <br>
        <h2>二.合同基础信息</h2>
        <hr>
        <span>租赁期限(月)：</span>
        <input type="text" value="${myInputValue?.rentMonthValue?.value}" disabled="disabled"></input><br>
        <span>合同生效日期：</span>
        <input type="text" value="${dateCal(myInputValue?.datePickerValue.$d)}" disabled="disabled"></input><br>
        <span>支付方式(每多少月)：</span>
        <input type="text" value="${myInputValue?.payModeValue.value}" disabled="disabled"></input><br>
        <span>押金(元)：</span>
        <input type="text" value="${myInputValue?.depositValue}" disabled="disabled"></input><br>
        <span>增长率条件(每多少月)：</span>
        <input type="text" value="${myInputValue?.growthRateConditionValue.value}" disabled="disabled"></input><br>
        <span>增长率(百分比)：</span>
        <input type="text" value="${myInputValue?.growthRateValue}" disabled="disabled"></input><br>
        <span>其他情况描述：</span><br>
        <textarea disabled="disabled">${myInputValue?.otherStringValue}</textarea>
        <br>

`
// <span>装修期(月)：</span>
//         <input type="text" value="${myInputValue?.rentFreeObject?.rentFreeMonths}" disabled="disabled"></input><br>
//         <br>
        // console.log(htmlDom);
    }
    // 

        const optionsForPayMode = ref<any['options']>([
            {
                value: 3,
                label: '三个月[每季度]'
            }, {
                value: 6,
                label: '六个月[每半年]'
            }, {
                value: 12,
                label: '十二个月[每年]'
            }
        ]);
        const options = ref<any['options']>([
            {
                value: 12,
                label: '12个月[1年]',
            },
            {
                value: 24,
                label: '24个月(2年)',
            }, {
                value: 36,
                label: '36个月(3年)',
            }, {
                value: 48,
                label: '48个月(4年)',
            }, {
                value: 60,
                label: '60个月(5年)',
            }, {
                value: 72,
                label: '72个月(6年)',
            }, {
                value: 84,
                label: '84个月(7年)',
            }, {
                value: 96,
                label: '96个月(8年)',
            }, {
                value: 108,
                label: '108个月(9年)',
            }, {
                value: 120,
                label: '120个月(10年)',
            }, {
                value: 132,
                label: '132个月(11年)',
            }, {
                value: 144,
                label: '144个月(12年)',
            }, {
                value: 156,
                label: '156个月(13年)',
            }, {
                value: 168,
                label: '168个月(14年)',
            }, {
                value: 180,
                label: '180个月(15年)',
            },
        ]);

        const handleChange = (value: Value) => {
            // console.log(myInputValue.rentMonthValue); // { key: "lucy", label: "Lucy (101)" }
        };
        const handleChangeForPayMode = (value: Value) => {
            // console.log(myInputValue.payModeValue); // { key: "lucy", label: "Lucy (101)" }
        };
        const handleChangeForGrowthRateCondition = (value: Value) => {
            // console.log(myInputValue.growthRateConditionValue); // { key: "lucy", label: "Lucy (101)" }
        };
        // onMounted(()=>{

        // })
        return {
            value1: ref<Moment>(),
            options,
            optionsForPayMode,
            handleChange,
            handleChangeForPayMode,
            handleChangeForGrowthRateCondition,
            myInputValue,
            optionsForGrowthRateConditionValue,
            rentFreeChecked,
            updateDom,
            htmlDom,
            handleGetKey
        }
    }
}

</script>