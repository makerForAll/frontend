import axios from '@/utils/request';
import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';

import { type FrontEndClientType ,  readClientAPI, createClientAPI, updateClientAPI ,deleteClientAPI } from '@/api/client';


export const useClientStore = defineStore('client', {
  // 其他配置...
  state: () => ({ 
    readStateData: [] as FrontEndClientType[],
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
        this.readStateData.push(createData);
        // --------------------------------------------------------------------------------------
        
      } catch (error) {
        message.error(`创建失败!:${error}`);
        console.error("创建失败:", error);
        throw error;
      }
    },
    async read() { // 异步编程获取数据
      try {
        this.readStateData = await readClientAPI();
        await readClientAPI();
        message.success("获取信息成功")
        return this.readStateData;
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    async update(id:string,item: any) {
      try {
        // const response = await axios.put(`/party/${partyItem.id}`, partyItem);
        const updateData = await updateClientAPI(id,item);
        // console.log("updateData--------------------------------:",updateData);
        // 更新本地 state 中的 party 数据 -------------------------------------------
          //使用 更新数据 中 的ID，来寻找 状态数据中的 party的id对比，找到它在 party 数组里的index值。 
        const index = this.readStateData.findIndex((item:FrontEndClientType)=> item.id === id);
        console.log('index---: ',index);
        
        if (index !== -1) { // 说明该找到了，有这个值。
          // 更新好的数据 response.data 来 赋值给 this.party[index],（更新了本地的状态数据）
          console.log('index2---: ',updateData.data);
          console.log('index3---: ',this.readStateData[index]);
          this.readStateData[index] = updateData.data;
          console.log('index4---: ',this.readStateData[index]);
          
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

        const index = this.readStateData.findIndex((item:FrontEndClientType)=> item.id === id);

        if(index !== -1){
          this.readStateData.splice(index,1);
          console.log("this.readPartyStateData:",this.readStateData);
          console.log("index:",index);
        }
        message.success("删除成功!")
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error updating data:", error);
        throw error;
      }
    },
  },
})