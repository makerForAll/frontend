<template>
    <div style="width:40%">
        <hr>
        <label for="datePicker">合同生效日期</label>
        <a-date-picker id="datePicker" v-model:value="myInputValue.datePickerValue" /><br>

        <label for="rent">租赁期限(月)</label>
        <a-select id="rentMonth" v-model:value="myInputValue.rentMonthValue" label-in-value style="width: 240px"
            :options="options" @change="handleChange">
        </a-select><br>

        <label for="payMode">支付方式(月)</label>
        <a-select id="payMode" v-model:value="myInputValue.payModeValue" label-in-value style="width: 240px"
            :options="optionsForPayMode" @change="handleChangeForPayMode">
        </a-select>
        <br>
        <hr>
        <!-- 押金 -->
        <!-- <label for="payMode">支付方式(月)</label> -->
        <label for="deposit">押金</label>
        <a-input style="width:90%" id="deposit" v-model:value="myInputValue.depositValue" placeholder="押金金额" />
        <!-- <input type="text" id="deposit" v-model:value="myInputValue.payModeValue"><br> -->

        <br>
        <label for="growthRateCondition">增长率条件(每多少个月)</label>
        <a-select id="growthRateCondition" v-model:value="myInputValue.growthRateConditionValue" label-in-value style="width: 180px"
            :options="optionsForGrowthRateConditionValue" @change="handleChangeForGrowthRateCondition">
        </a-select>
        <!-- <select id="growthRateCondition">
            <option value="mercedes">十二个月[每一年]</option>
            <option value="mercedes">二十四个月[每二年]</option>
            <option value="mercedes">三十六个月[每三年]</option>
        </select> -->
        <br>

        <label for="growthRate">增长率(百分比)</label>
        <a-input style="width:70%" id="growthRate" v-model:value="myInputValue.growthRateValue" placeholder="增长率" />
        <!-- <input type="text" name="sex" id="male" value=""> -->
        <br>
        <div>
            <label for="otherString" style="float: left;">其他情况描述</label>
            <a-textarea id="otherString" v-model:value="myInputValue.otherStringValue" placeholder="其他情况" :rows="5" />
            <!-- <textarea id="textarea" rows="10" cols="30"></textarea> -->
        </div>
         <!-- 免租期政策逻辑 -- Begin -->
        <a-switch v-model:checked="rentFreeChecked" />
       
        <div v-show="rentFreeChecked">
            <TabsForTableInput></TabsForTableInput>
        </div>
        <!-- 免租期政策逻辑 --- End -->
        <hr>    
    </div>

    <button @click="handleClick">生成表单</button>
    
</template>
<script lang="ts">
import { defineEmits, ref, reactive } from 'vue';
import { Moment } from 'moment';
import TabsForTableInput from '../tablePage/TabsForTableInput.vue';
// import {SelectTypes} from 'ant-design-vue/es/select';
// import { SelectOption } from 'ant-design-vue/es/select';
import {dataType} from './tableTool.vue'
// import tableForMap from './tableForMap.vue';
interface Value {
    value?: string;
    label?: string;
}

export default {
    components:{
        TabsForTableInput
    },
    emits: ['update'],
    methods: {
        handleClick() {
            // 触发自定义事件并传递数据
            this.$emit('update', this.myInputValue);
        }
    },
    setup() {
        const rentFreeChecked = ref<Boolean>(false);
        const optionsForGrowthRateConditionValue = ref<any['options']>([
            {
                value: 12,
                label: '十二个月[每一年]'
            },{
                value: 24,
                label: '二十四个月[每二年]'
            },{
                value: 36,
                label: '三十六个月[每三年]'
            }
        ]);
        const optionsForPayMode = ref<any['options']>([
            {
                value: 3,
                label: '三个月[每季度]'
            },{
                value: 6,
                label: '六个月[每半年]'
            },{
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
        const myInputValue = reactive({
            datePickerValue: null,
            rentMonthValue: null,
            payModeValue: null,
            depositValue:0,
            growthRateConditionValue:null,
            growthRateValue:0,
            otherStringValue:''
        })
        const handleChange = (value: Value) => {
            console.log(myInputValue.rentMonthValue); // { key: "lucy", label: "Lucy (101)" }
        };
        const handleChangeForPayMode = (value: Value) => {
            console.log(myInputValue.payModeValue); // { key: "lucy", label: "Lucy (101)" }
        };
        const handleChangeForGrowthRateCondition  = (value: Value) => {
            console.log(myInputValue.growthRateConditionValue); // { key: "lucy", label: "Lucy (101)" }
        };
        return {
            value1: ref<Moment>(),
            options,
            optionsForPayMode,
            handleChange,
            handleChangeForPayMode,
            handleChangeForGrowthRateCondition,
            myInputValue,
            optionsForGrowthRateConditionValue,
            rentFreeChecked
        }
    }
}

</script>