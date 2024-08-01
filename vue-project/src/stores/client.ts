import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';

// import { type Client, type APIParams,} from '@/api/services/';
import dayjs from 'dayjs';
// import type { Plan } from '@/api/services/plan';

// ------------------------------------------------------------
import{ APIforBackEnd, type ClientDTO} from '@/api'
import {AxiosHttpRequest } from '@/api/core/AxiosHttpRequest';
const api = new APIforBackEnd({},AxiosHttpRequest);
// ------------------------------------------------------------

import type {ApiResults,ApiResponse} from '@/custom/api/models/models-common'
import type { FrontEndClientType } from '@/custom/client';

// ------------------------------------------------------------
// 初始化
// export const initClientForm = {
//   name: '',
//   contact:'',
//   phonenumber: '',
//   emergencycontact: '',
//   emergencycontactphone: '',
//   marks:'',
//   createdAt:null,
//   // 其他字段可以按需添加
// }

export const useClientStore = defineStore('client', {
  // 其他配置...
  state: () => {
    // 可以写一些逻辑
    return {
      data: {
        item:{} ,
        items:[] as ClientDTO[],
        total:0,
        selectID: '', // 要更新的对象
        loading:false  // store 的数据 (data)
      },
      initialized: false,
    }
  },
  getters: {  // store 的计算属性 (computed)
    addTodayTime:(state)=>(data:ClientDTO)=> {  // 在使用Create时，默认添加注册时间
      data.createdAt = dayjs() as unknown as string;
    },
  },
  actions: {  //actions 则是方法 (methods)
    // async calTotal(){
    //   this.createState.item.total = this.double;
    // },
    async initStateItem(){
      try{
        const response:ApiResponse<ClientDTO> = await api.client.clientControllerGetInit();
        const item = response?.results.data[0]
        this.data.item = item;
        // return 
        console.log("Init -- from BackEnd responseData:-----------",response?.results.data[0]);
        console.log("Init -- from FrontEnd Pinia State Data:-----------", this.data.item);
      }catch(error){
        console.error('Error fetching data:', error);
      }
      // this.clientData.items = response?.results?.data;
      // this.createState.item = initClientForm;
    },
    async create(data:any){
      try{
        console.log("data:-----------",data);
        
        // await this.addTodayTime(data);
        const createData:ApiResponse<ClientDTO> = await api.client.clientControllerCreate({requestBody:data});
        // api.client.clientControllerCreate();
        message.success("创建客户信息成功")
        // 更新本地 state 中的 party 数据 -------------------------------------------
        console.log("createData:",createData);
        
        this.data.items.unshift(createData.results.data[0]);
      } catch (error) {
        message.error(`创建失败!:${error}`);
        console.error("创建失败:", error);
        throw error;
      }
    },
    async read(params:any= {
     current: 1,
     pagesize: 10,
     
    }) { // 异步编程获取数据
      try {
        const response:ApiResponse<ClientDTO> = await api.client.clientControllerFindAll(params);
        // const data = await readClientAPI(params);
        this.data.items = response.results.data;
        this.data.total = response.results.total as number;
        // this.readStateData = data;
        console.log("data:",response.results.data);
        message.success("获取信息成功")
        // return data;
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    async readById(id: string): Promise<ClientDTO> {
      // this.loading = true;
      try {
        
        const response: ApiResponse<ClientDTO> = await api.client.clientControllerFindOne({id});
        const item = response.results.data[0];
        this.data.item = item;
        console.log("readById return data--------",item);
        // ------------------------------
        return item;
      } catch (error) {
        // this.error = error.message;
        return {} as ClientDTO;
      } finally {
        // this.loading = false;
      }
    },
    async update(id:string,requestBody: any) {
      try {
        //  向服务器 提出 put更新请求，响应 更新结果
        const response: ApiResponse<ClientDTO> = await api.client.clientControllerUpdate({id,requestBody});
        const item = response.results.data[0]
        // 向服务器 提出 get 获取指定ID对象 请求， 响应 获取结果
        // const updateData = await this.readById(id);
        const index = this.data.items.findIndex((item:any)=> item.id === id);
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
        // await deleteClientAPI(id);
        await api.client.clientControllerDelete({id})
        // 更新本地 state 中的 party 数据 -------------------------------------------
        const index = this.data.items.findIndex((item:any)=> item.id === id);
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
  },
})