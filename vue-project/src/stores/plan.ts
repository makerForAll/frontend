// import axios from '@/utils/request';
import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';

// import { type FrontEndPlanType ,readPlanAPI, createPlanAPI, updatePlanAPI ,deletePlanAPI, type Plan,type APIParams, readPlanIDAPI, findReadByClientId } from '@/api/services/plan';
import type {ClientDTO, PlanDTO} from '@/api'
import dayjs, { Dayjs } from 'dayjs';
// import testVIew from '@/cp-projectCP/ClientHome/PlanHome/ReadPlan/test.vue';
// import { markRaw } from 'vue';

import{ APIforBackEnd} from '@/api'
import type{ ApiResponse,ApiResults} from '@/custom/api/models/models-common'
import { toRaw } from 'vue';

const api = new APIforBackEnd();

// const openapiconfig:OpenAPIConfig = {
//   BASE: 'https://api.example.com',
//   VERSION: '',
//   WITH_CREDENTIALS: false,
//   CREDENTIALS: 'include'
// }
// const openapi = new OpenAPI(openapiconfig);


// import type { ApiResponse, CreatePlanDTO } from '@/generated/api';
// import { CreatePlanDTO,UpdatePlanDTO } from '@/generated'

export const initPlanForm = {
  name: '',
    first_name:'',
    first_area: 0,
    first_price: 0,
    second_name:'',
    second_area: 0,
    second_price: 0,
    third_name:'',
    third_area: 0,
    third_price: 0,
    total_area: 0,
    average_price: 0,

    initial_monthly_price: 0, //初期每月费用 
    contract_type: '租赁合同', // 合同类型[租赁合同,销售合同,其他]
    contract_status: '起草', // 合同状态【起草,正常履行，】
  record_type: '', // 是几个方案中的默认方案【默认】
  is_default:false,
    contract_duration_months: '', // 合同期限（月）
  startdate_and_enddate: [], // 合同生效日期-截止日期
  payment_interval_months: 12, // 支付方式（每多少个月）
  increase_interval_months: 12, // 增长率条件（每多少个月）
  increase_rate: 6, // 增长率（百分比）
  deposit: 0, // 押金（元）
  rent_free_months: 0, // 减免（月）
  initial_payment_duedays: 3, // 首次支付费用截止日期为合同生效日期后的第几天
  recurring_payment_duedays: 1, // 每期支付费用截止日期为每期应当提前多少月
  total_amount: 0, // 合同总金额
  remarks: '' // 备注
  // url: '',
  // owner: '',
  // type: '',
  // approver: '',
  // dateTime: null,
  // description: '',
};

export const usePlanStore = defineStore('plan', {
  // 其他配置...
  state: () => {
   return { 
    data: {
      item:{} as PlanDTO,
      items:[] as PlanDTO[],
      total:0,
      selectID: '', // 要更新的对象
      loading:false  // store 的数据 (data)
    },
  }
  },  // store 的数据 (data)

  getters: {  // store 的计算属性 (computed)
    calAreaAndPrice(): number[]{
      const total_area = Number(this.data.item.first_area || 0) + Number
      (this.data.item.second_area || 0) +
      Number(this.data.item.third_area || 0);
      const total_price = 
      Number(this.data.item.first_price || 0)*Number(this.data.item.first_area || 0) +
      Number(this.data.item.second_price || 0)* Number(this.data.item.second_area || 0) +
      Number(this.data.item.third_price || 0)*Number(this.data.item.third_area || 0)
      return [this.calRound(total_area),this.calRound(total_price/total_area),this.calRound(total_price)];
    },
    totalCal:(state) =>{
      return (num:number) => {return num+1}
    },
    calRound(){
      return (num:number) =>{
        return Math.round(num * 100) / 100;
      }
    }
  },
  actions: {
    async changType(){
      const item =  this.data.item as PlanDTO;
      // console.log("changeType1:", item.startdate_and_enddate?.map((item:any) => dayjs(item)));
      const changedData = item.startdate_and_enddate?.map((item:any) => dayjs(item))
      // this.data.item = {...this.data.item,startdate_and_enddate:changedData};
      // console.log("changeType2:", changedData[0]);
        return changedData;
      },
    async runCal(){
      this.data.item.total_area = this.calAreaAndPrice[0];
      this.data.item.average_price = this.calAreaAndPrice[1];
      this.data.item.initial_monthly_price = this.calAreaAndPrice[2]
    },
    // async initState(){
    //   const response:ApiResponse<PlanDTO> = api.plan.planControllerGetInit() as any;
    //   this.data.item = response.results.data[0];
    // },
    async initState(){
      const response:ApiResponse<PlanDTO> = await api.plan.planControllerGetInit();
      const results = response.results
      if (response && response.results) {
        const item: PlanDTO = results.data[0];
        this.data.item = item;
      }
      // this.data.item = myapi.plan.planControllerGetInit();
    },
    async create(clientId:string,requestBody:any){
      try{
        const response:ApiResponse<PlanDTO> = await api.plan.planControllerCreate({clientId,requestBody})
        // await this.changeFormat();
        message.success("创建客户信息成功")
        // 更新本地 state 中的 party 数据 -------------------------------------------
        // this.readStateData.push(createData);
        this.data.items.unshift(response.results.data[0]);
        this.data.total = this.totalCal(this.data.total as number); // 更新total
        // this.readState.total = this.readState.total + 1;
        // --------------------------------------------------------------------------------------
        
      } catch (error) {
        message.error(`创建失败!:${error}`);
        console.error("创建失败:", error);
        throw error;
      }
    },
    async read(params:any= {
      current: 1,
      pagesize: 10
     }) { // 异步编程获取数据
      try {
        const response:ApiResponse<PlanDTO> = await api.plan.planControllerFindAll(params);
        const items = response.results.data
        // this.data.item = {...item,startdate_and_enddate:this.changType()};
        this.data.items = items;
        this.data.total = response.results.total as number;
        // this.readStateData = data;
        console.log("data:",response);
        message.success("获取信息成功")

      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error fetching data:", error);
        throw error;
      }
    },

    async readById(id: string): Promise<PlanDTO> {
      // this.loading = true;
      try {
        const response:ApiResponse<PlanDTO> = await api.plan.planControllerFindOne({id})
        const responseItem = response.results.data[0]
        // const getdata = this.changType(item.startdate_and_enddate);
        // 匹配前端需求的数据格式
        this.data.item = responseItem;
        // console.log("readById return data---1-----",item);
        // const getM2 = await this.changType();
        // const item = {...responseItem,startdate_and_enddate:getM2};
        // console.log("getM2:----------",getM2);
        
        // this.data.item = responseItem
        return responseItem;
      } catch (error) {
        // this.error = error.message;
        return {} as PlanDTO;
      } finally {
        // this.loading = false;
      }
    },    
    async readByClientId(id: string): Promise<PlanDTO[]> {
      this.data.loading = true;
      try {
        const response:ApiResponse<PlanDTO> = await api.plan.planControllerFindByClientId({id});
        this.data.items = response.results.data;
        this.data.total = response.results.total as number;
        console.log("readByClientId--------",response.results.data);
        return response.results.data;
      } catch (error) {
        // this.error = error.message;
        return [] as PlanDTO[];
      } finally {
        this.data.loading = false;
      }
    },
    async update(id:string,requestBody: any) {
      try {
        const response:ApiResponse<PlanDTO> = await api.plan.planControllerUpdate({id,requestBody});
        const item = response.results.data[0];
        // const updateData = await this.readById(id);
       
        const index = this.data.items.findIndex((item:PlanDTO)=> item.id === id);
        if (index !== -1) { // 说明该找到了，有这个值。
          // 更新好的数据 response.data 来 赋值给 this.party[index],（更新了本地的状态数据）
          this.data.items[index] = item;
        }
        message.success("更新成功!")
      } catch (error:any) {
        message.error(`请求错误!:${error}`);
        console.error("Error updating data:", error);
        throw new Error('Error updating data: ' + (error?.response?.data?.message || 'Unknown error'));
      }
    },

    async delete(id: string) {
      try {
        const response:ApiResponse<PlanDTO> = await api.plan.planControllerDelete({id});
        // await deletePlanAPI(id);
        // 更新本地 state 中的 party 数据 -------------------------------------------
        const index = this.data.items.findIndex((item:PlanDTO)=> item.id === id);
        if(index !== -1){
          this.data.items.splice(index,1);
          // console.log("index:",index);
        }
        message.success("删除成功!")
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error updating data:", error);
        throw error;
      }
    }
}
})