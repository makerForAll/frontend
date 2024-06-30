<template>
    <a-button type="primary" :style="{ marginBottom: '16px' }" @click="showDrawer">
      <template #icon><PlusOutlined /></template>
      新增合同方案
    </a-button>
    <a-drawer
      title="创建新的方案"
      :width="720"
      :open="open"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="form" layout="vertical">
        <a-row :gutter="16">
          <a-col :span="24"> 
            <!-- 第一个表单 -->
            <a-form-item label="方案名称" name="name">
              <a-input v-model:value="form.name" placeholder="王某的2024方案" />
            </a-form-item>
          </a-col>
   
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
             <!-- 第二排表单 -->
             <a-form-item label="面积1" name="FirstaArea">
              <a-input v-model:value="form.name" placeholder="王某的2024方案" />
            </a-form-item>
          </a-col>
          <a-col :span="12">
             <!-- 第二排表单 -->
             <a-form-item label="价格1" name="FirstPrice">
              <a-select v-model:value="form.first_price" placeholder="Please a-s an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
             <!-- 第三排表单 -->
             <a-form-item label="面积2" name="second_area">
              <a-input v-model:value="form.name" placeholder="王某的2024方案" />
              <!-- <a-select v-model:value="form.owner" placeholder="Please a-s an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select> -->
            </a-form-item>
          </a-col>
          <a-col :span="12">
             <!-- 第三排表单 -->
             <a-form-item label="价格2" name="second_price">
              <a-select v-model:value="form.second_price" placeholder="Please a-s an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
             <!-- 第四排表单 -->
             <a-form-item label="面积3" name="third_area">
              <a-input v-model:value="form.third_area" placeholder="王某的2024方案" />
              <!-- <a-select v-model:value="form.owner" placeholder="Please a-s an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select> -->
            </a-form-item>
          </a-col>
          <a-col :span="12">
             <!-- 第四排表单 -->
             <a-form-item label="价格3" name="third_price">
              <a-select v-model:value="form.third_price" placeholder="Please a-s an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
             <!-- 第五排表单 -->
             <a-form-item label="面积3" name="total_area">
              <a-input v-model:value="form.total_area" placeholder="王某的2024方案" />
              <!-- <a-select v-model:value="form.owner" placeholder="Please a-s an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select> -->
            </a-form-item>
          </a-col>
          <a-col :span="12">
             <!-- 第五排表单 -->
             <a-form-item label="价格3" name="average_price">
              <a-select v-model:value="form.average_price" placeholder="Please a-s an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
          <!-- --------- -->
        <a-row :gutter="16">
        
          <a-col :span="12">
             <!-- 第三个表单 -->
            <!-- <a-form-item label="Owner" name="owner">
              <a-select v-model:value="form.owner" placeholder="Please a-s an owner">
                <a-select-option value="xiao">Xiaoxiao Fu</a-select-option>
                <a-select-option value="mao">Maomao Zhou</a-select-option>
              </a-select>
            </a-form-item> -->
          </a-col>
          <a-col :span="12">
             <!-- 第三个表单 -->
            <!-- <a-form-item label="Type" name="type">
              <a-select v-model:value="form.type" placeholder="Please choose the type">
                <a-select-option value="private">Private</a-select-option>
                <a-select-option value="public">Public</a-select-option>
              </a-select>
            </a-form-item> -->
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="12">
             <!-- 第四个表单 -->
            <!-- <a-form-item label="Approver" name="approver">
              <a-select v-model:value="form.approver" placeholder="Please choose the approver">
                <a-select-option value="jack">Jack Ma</a-select-option>
                <a-select-option value="tom">Tom Liu</a-select-option>
              </a-select>
            </a-form-item> -->
          </a-col>
          <a-col :span="12">
             <!-- 第五个表单 -->
            <a-form-item label="DateTime" name="dateTime">
              <a-date-picker
                v-model:value="form.start_date"
                style="width: 100%"
                :get-popup-container="(trigger:any) => trigger.parentElement"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row :gutter="16">
          <a-col :span="24">
            <a-form-item label="Description" name="description">
              <a-textarea
                v-model:value="form.marks"
                :rows="4"
                placeholder="please enter url description"
              />
            </a-form-item>
          </a-col>
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
  const form = reactive({
    name: '',
    first_area: '',
    first_price: '',
    second_area: '',
    second_price: '',
    third_area: '',
    third_price: '',
    total_area: '',
    average_price: '',
    initial_monthly_price: '',
    contract_type: '',
    contract_status: '',
    record_type: '',
    start_date: new Date(), // 合同生效日期
    contract_duration_months: '', // 签几年合同
    payment_interval_months: '',  // // 支付方式（每多少个月）
    increase_interval_months: '', // 增长率条件（每多少个月）
    increase_rate: '',  // 增长率（百分比）
    deposit: '', // 押金（元）
    rent_free_months: '', // 减免（月）
    initial_payment_duedays: '', // 首次支付费用截止日期为合同生效日期后的第几天
    recurring_payment_duedays: '',  // 每期支付费用截止日期为每期应当提前多少月
    total_amount: '', // 合同总金额
    marks: '', // 备注
  });
  
  // const rules: Record<string, Rule[]> = {
  //   name: [{ required: true, message: '请输入你的方案名称' }],
  //   url: [{ required: true, message: 'please enter url' }],
  //   owner: [{ required: true, message: 'Please select an owner' }],
  //   type: [{ required: true, message: 'Please choose the type' }],
  //   approver: [{ required: true, message: 'Please choose the approver' }],
  //   dateTime: [{ required: true, message: 'Please choose the dateTime', type: 'object' }],
  //   description: [{ required: true, message: 'Please enter url description' }],
  // };
  
  const open = ref<boolean>(false);
  
  const showDrawer = () => {
    open.value = true;
  };
  
  const onClose = () => {
    open.value = false;
  };
  </script>
  
  