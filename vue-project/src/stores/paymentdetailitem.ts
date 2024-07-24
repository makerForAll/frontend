// import axios from '@/utils/request';
import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';

// import { type FrontEndPlanType ,readPlanAPI, createPlanAPI, updatePlanAPI ,deletePlanAPI, type Plan,type APIParams, readPlanIDAPI, findReadByClientId } from '@/api/services/plan';
import type {ClientDTO ,PaymentDetailItemDTO} from '@/api'
import dayjs from 'dayjs';
// import testVIew from '@/cp-projectCP/ClientHome/PlanHome/ReadPlan/test.vue';
// import { markRaw } from 'vue';

import{ APIforBackEnd} from '@/api'
import type{ ApiResponse,ApiResults} from '@/custom/api/models/models-common'

const api = new APIforBackEnd();

export const usePlanStore = defineStore('PaymentDetail', {
  // 其他配置...
  state: () => {
   return { 
    data: {
      item:{} as PaymentDetailItemDTO,
      items:[] as PaymentDetailItemDTO[],
      total:0,
      selectID: '', // 要更新的对象
      loading:false  // store 的数据 (data)
    },
  }
  },  // store 的数据 (data)

  getters: {  // store 的计算属性 (computed)
    // calAreaAndPrice(): number[]{
    //   const total_area = (this.data.item.first_area || 0) +
    //   (this.data.item.second_area || 0) +
    //   (this.data.item.third_area || 0);
    //   const total_price = 
    //   (this.data.item.first_price || 0)*(this.data.item.first_area || 0) +
    //   (this.data.item.second_price || 0)* (this.data.item.second_area || 0) +
    //   (this.data.item.third_price || 0)*(this.data.item.third_area || 0)
    //   return [total_area,total_price/total_area,total_price];
    // },
    // totalCal:(state) =>{
    //   return (num:number) => {return num+1}
    // }
  },
  actions: {
    // async runCal(){
    //   this.data.item.total_area = this.calAreaAndPrice[0];
    //   this.data.item.average_price = this.calAreaAndPrice[1];
    //   this.data.item.initial_monthly_price = this.calAreaAndPrice[2]
    // },
    // async initState(){
    //   const response:ApiResponse<PlanBackEndDTO> = api.plan.planControllerGetInit() as any;
    //   this.data.item = response.results.data[0];
    // },
    // async initState(){
    //   const response:ApiResponse<PlanBackEndDTO> = await api.plan.planControllerGetInit();
    //   const results = response.results
    //   if (response && response.results) {
    //     const item: PlanBackEndDTO = results.data[0];
    //     this.data.item = item;
    //   }
    //   // this.data.item = myapi.plan.planControllerGetInit();
    // },
    async create(clientId:string,requestBody:any){
      try{
        const response:ApiResponse<PaymentDetailItemDTO> = await api.plan.planControllerCreate({clientId,requestBody})
        // await this.changeFormat();
        message.success("创建支付明细信息成功")
        // 更新本地 state 中的 party 数据 -------------------------------------------
        // this.readStateData.push(createData);
        this.data.items.unshift(response.results.data[0]);
        // this.data.total = this.totalCal(this.data.total as number); // 更新total
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
        const response:ApiResponse<PaymentDetailItemDTO> = await api.plan.planControllerFindAll(params);
        this.data.items = response.results.data;
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
    async readById(id: string): Promise<PaymentDetailItemDTO> {
      // this.loading = true;
      try {
        const response:ApiResponse<PaymentDetailItemDTO> = await api.plan.planControllerFindOne({id})
        const item = response.results.data[0]
        this.data.item = item;
        console.log("readById return data--------",item);
        return item;
      } catch (error) {
        // this.error = error.message;
        return {} as PaymentDetailItemDTO;
      } finally {
        // this.loading = false;
      }
    },    
    async readByClientId(id: string): Promise<PaymentDetailItemDTO[]> {
      // this.loading = true;
      try {
        const response:ApiResponse<PaymentDetailItemDTO> = await api.plan.planControllerFindByClientId({id});
        this.data.items = response.results.data;
        this.data.total = response.results.total as number;
        // console.log("readByClientId--------",data.results.data);
        return response.results.data;
      } catch (error) {
        // this.error = error.message;
        return [] as PaymentDetailItemDTO[];
      } finally {
        // this.loading = false;
      }
    },
    async update(id:string,requestBody: any) {
      try {
        const response:ApiResponse<PaymentDetailItemDTO> = await api.plan.planControllerUpdate({id,requestBody});
        const item = response.results.data[0];
        // const updateData = await this.readById(id);
       
        const index = this.data.items.findIndex((item:PaymentDetailItemDTO)=> item.id === id);
        if (index !== -1) { // 说明该找到了，有这个值。
          // 更新好的数据 response.data 来 赋值给 this.party[index],（更新了本地的状态数据）
          this.data.items[index] = item;
        }
        message.success("更新成功!")
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error updating data:", error);
        throw error;
      }
    },

    async delete(id: string) {
      try {
        const response:ApiResponse<PaymentDetailItemDTO> = await api.plan.planControllerDelete({id});
        // await deletePlanAPI(id);
        // 更新本地 state 中的 party 数据 -------------------------------------------
        const index = this.data.items.findIndex((item:PaymentDetailItemDTO)=> item.id === id);
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