import axios from '@/utils/request';
import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';

import { type FrontEndClientType ,  readClientAPI, createClientAPI, updateClientAPI ,deleteClientAPI, type Client, type APIParams, readClientIDAPI} from '@/api/client';


export const useClientStore = defineStore('client', {
  // 其他配置...
  state: () => ({  // 为了解决 前端业务逻辑 区域的 CURD 的需求，需要提供 共享 状态的变量
    
    page:{
      items:[] as Client[],
      item:{} as Client,
      updateItem: { } as Client,
      total: 0 as number|undefined,
      // updateData:{} as Client,
    },
    // readStateData: {} as FrontEndClientType,
    currentSelectObjID: '',
    loading:false
  }),  // store 的数据 (data)

  getters: {  // store 的计算属性 (computed)
    // double: (state) => state.count * 2,
  },
  actions: {  //actions 则是方法 (methods)
    async create(data:any){
      try{
        const createData = await createClientAPI(data);
        message.success("创建客户信息成功")
        // 更新本地 state 中的 party 数据 -------------------------------------------
        // this.page.items.push(createData.results.data[0]);
        this.page.items.unshift(createData.results.data[0]);
        // this.read();
        // --------------------------------------------------------------------------------------
        
      } catch (error) {
        message.error(`创建失败!:${error}`);
        console.error("创建失败:", error);
        throw error;
      }
    },
    async read(params:APIParams= {
     current: 1,
     pagesize: 10
    }) { // 异步编程获取数据
      try {
        const data = await readClientAPI(params);
        this.page.items = data.results.data;
        this.page.total = data.results.total;
        // this.readStateData = data;
        console.log("data:",data);
        message.success("获取信息成功")
        // return data;
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    async readById(id: string): Promise<Client> {
      this.loading = true;
      try {
        const data: FrontEndClientType = await readClientIDAPI(id);
        this.page.updateItem = data.results.data[0];
        console.log("readById return data--------",data.results.data[0]);
        return data.results.data[0];
      } catch (error) {
        // this.error = error.message;
        return {} as Client;
      } finally {
        this.loading = false;
      }
    },
    async update(id:string,form: any) {
      try {
        // const response = await axios.put(`/party/${partyItem.id}`, partyItem);
        await updateClientAPI(id,form);
        const updateData = await this.readById(id);
        // console.log("updateData--------------------------------:",updateData);
        // 更新本地 state 中的 party 数据 -------------------------------------------
          //使用 更新数据 中 的ID，来寻找 状态数据中的 party的id对比，找到它在 party 数组里的index值。 
        const index = this.page.items.findIndex((item:Client)=> item.id === id);
        console.log('index---: ',index);
        
        if (index !== -1) { // 说明该找到了，有这个值。
          // 更新好的数据 response.data 来 赋值给 this.party[index],（更新了本地的状态数据）
          console.log('index2---: ',updateData);
          console.log('index3---: ',this.page.items[index]);
          this.page.items[index] = updateData;
          console.log('index4---: ',this.page.items[index]);
          
        }
        // --------------------------------------------------------------------------------------
        message.success("更新成功!")
        // return updateData;
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error updating data:", error);
        throw error;
      }
    },

    async delete(id: string) {
      try {
        // const response = await axios.delete(`/party/${partyItem.id}`, partyItem);
        await deleteClientAPI(id);
        
        // 更新本地 state 中的 party 数据 -------------------------------------------

        const index = this.page.items.findIndex((item:Client)=> item.id === id);

        if(index !== -1){
          this.page.items.splice(index,1);
          // console.log("this.readPartyStateData:",this.readStateData);
          console.log("index:",index);
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