<template>
    <a-drawer
      title="Create a new account"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="form" :rules="rules" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="8">
            <a-form-item label="合同类型" name="contract_type">
              <a-select v-model:value="form.contract_type" placeholder="Please choose the approver">
                <a-select-option value="租赁合同">租赁合同</a-select-option>
                <a-select-option value="销售合同">销售合同</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="合同状态" name="contract_status">
              <a-select v-model:value="form.contract_status" :disabled="true"  placeholder="Please choose the approver">
                <a-select-option value="起草">起草</a-select-option>
                <a-select-option value="正常履行">正常履行</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
            <a-col :span="8"> 
              <!-- 方案名称 -->
              <a-form-item label="方案名称" name="name">
                <a-input v-model:value="form.name" placeholder="王某的2024方案" />
              </a-form-item>
            </a-col>
     
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
               <!-- 位置1 -->
               <a-form-item label="位置" name="first_name">
                <a-input v-model:value="form.first_name" placeholder="1#01-01" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
               <!-- 面积1 -->
               <a-form-item label="面积1" name="first_area">
                <a-input v-model:value="form.first_area" placeholder="00.00" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
               <!-- 价格1 -->
               <a-form-item label="价格1" name="first_price">
                <a-input v-model:value="form.first_price" placeholder="00.00" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
               <!-- 位置2 -->
               <a-form-item label="位置2" name="second_name">
                <a-input v-model:value="form.second_name" placeholder="1#02-01" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
               <!-- 面积2 -->
               <a-form-item label="面积2" name="second_area">
                <a-input v-model:value="form.second_area" placeholder="00.00" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
               <!-- 价格2 -->
               <a-form-item label="价格2" name="second_price">
                <a-input v-model:value="form.second_price" placeholder="00.00" />
              </a-form-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="8">
               <!-- 位置3 -->
               <a-form-item label="位置3" name="third_name">
                <a-input v-model:value="form.third_name" placeholder="3#02-01" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
               <!-- 面积3 -->
               <a-form-item label="面积3" name="third_area">
                <a-input v-model:value="form.third_area" placeholder="00.00" />
              </a-form-item>
            </a-col>
            <a-col :span="8">
               <!-- 价格3 -->
               <a-form-item label="价格3" name="third_price">
                <a-input v-model:value="form.third_price" placeholder="00.00" />
              </a-form-item>
            </a-col>
          </a-row>
  
          <a-row :gutter="16">
            <a-col :span="8">
               <!-- 留白 -->
  
            </a-col>
            <a-col :span="8">
               <!-- 总面积 -->
               <a-form-item label="总面积" name="total_area" >
                <a-input  v-model:value="form.total_area" placeholder="00.00" :disabled="true"/>
              </a-form-item>
            </a-col>
            <a-col :span="8">
               <!-- 平均价格 -->
               <a-form-item label="平均价格" name="average_price">
                <a-input v-model:value="form.average_price" placeholder="00.00" :disabled="true"/>
              </a-form-item>
            </a-col>
          </a-row>
          <!-- ------------------------------------ -->
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item label="初期每月费用" name="initial_monthly_price">
              <a-input v-model:value="form.average_price" placeholder="00.00" :disabled="true"/>
            </a-form-item>
          </a-col>
       <a-col :span="12">
            <!-- <a-form-item label="DateTime" name="dateTime">
              <a-date-picker
                v-model:value="form.start_date"
                style="width: 100%"
                :get-popup-container="(trigger:any) => trigger.parentElement"
              />
            </a-form-item> -->
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <!-- <a-col :span="24">
            <a-form-item label="Description" name="description">
              <a-textarea
                v-model:value="form.description"
                :rows="4"
                placeholder="please enter url description"
              />
            </a-form-item>
          </a-col> -->
          <!-- <a-space direction="vertical" :size="12">
      <a-date-picker v-model:value="form.start_date" />
    </a-space> -->
        </a-row>
      </a-form>
      <template #extra>
        <a-space>
          <a-button @click="onClose">Cancel</a-button>
          <a-button type="primary" @click="onClose">Submit</a-button>
        </a-space>
      </template>
    </a-drawer>
    
  </template>
  <script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { PlusOutlined } from '@ant-design/icons-vue';
  import type { Rule } from 'ant-design-vue/es/form';
  import { first } from 'lodash-es';
  const form = reactive({
    name: '',
      first_name:'',
      first_area: '',
      first_price: '',
      second_name:'',
      second_area: '',
      second_price: '',
      third_name:'',
      third_area: '',
      third_price: '',
      total_area: '',
      average_price: '',
  
      initial_monthly_price: '', //初期每月费用 
      contract_type: '租赁合同', // 合同类型[租赁合同,销售合同,其他]
      contract_status: '起草', // 合同状态【起草,正常履行，】
    record_type: '', // 是几个方案中的默认方案【默认】
      contract_duration_months: '', // 合同期限（月）
    start_date: new Date(), // 合同生效日期
    payment_interval_months: '', // 支付方式（每多少个月）
    increase_interval_months: '', // 增长率条件（每多少个月）
    increase_rate: '', // 增长率（百分比）
    deposit: '', // 押金（元）
    rent_free_months: '', // 减免（月）
    initial_payment_duedays: '', // 首次支付费用截止日期为合同生效日期后的第几天
    recurring_payment_duedays: '', // 每期支付费用截止日期为每期应当提前多少月
    total_amount: '', // 合同总金额
    remarks: '' // 备注
    // url: '',
    // owner: '',
    // type: '',
    // approver: '',
    // dateTime: null,
    // description: '',
  });
  
  const rules: Record<string, Rule[]> = {
    name: [{ required: true, message: 'Please enter user name' }],
    first_name: [{ required: true, message: 'Please enter user name' }],
    first_area: [{ required: true, message: 'Please enter user name' }],
    first_price: [{ required: true, message: 'Please enter user name' }],
  
    url: [{ required: true, message: 'please enter url' }],
    owner: [{ required: true, message: 'Please select an owner' }],
    type: [{ required: true, message: 'Please choose the type' }],
    approver: [{ required: true, message: 'Please choose the approver' }],
    dateTime: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
    description: [{ required: true, message: 'Please enter url description' }],
  };
  
  const open = ref<boolean>(false);
  
  const showDrawer = () => {
    open.value = true;
  };
  
  const onClose = () => {
    open.value = false;
  };
  
  
  // ------------------ 把方法暴露给父组件 --------------------------------------
  defineExpose({showDrawer})
  </script>
  
  