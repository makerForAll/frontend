// import axios from '@/api/request';
import {PlanService,CreatePlanDTO,UpdateClientDTO} from '@/api'

import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';

// import { type FrontEndPartyType ,  readPartyAPI, updatePartyAPI,deletePartyAPI,createPartyAPI, type Party } from '@/api/services/party';
// const updateLocaPiniaState = () =>{
//   const getState = usePartyStore
//    //使用 更新数据 中 的ID，来寻找 状态数据中的 party的id对比，找到它在 party 数组里的index值。 
//    const index = this.party.findIndex((item:any)=> item.id === partyItem.id);
//    if (index !== -1) { // 说明该找到了，有这个值。
//      // 更新好的数据 response.data 来 赋值给 this.party[index],（更新了本地的状态数据）
//      this.party[index] = response.data;
//    }
// }

export const usePartyStore = defineStore('party', {
  // 其他配置...
  state: () => ({ 
    createState:{// 要上传的表单数据
      item:initPlanForm as unknown as Plan,
      item2:initPlanForm as CreatePlanDTO
    },
    deleteState:{
      selectID: '', // 要删除的ID
    },
    readState:{
      items:[] as Plan[],
      selectID: '' as string|undefined, // 要更新的对象
      // formatItems: [] as any[],
      total: 0 as number|undefined,
    },
    updateState:{  // create , update 都可以使用的 form 变量容器
      item: {} as Plan, // 保存最新数据
      selectID: '' as string|undefined, // 要更新的对象
    },
    loading:false
  }),  // store 的数据 (data)

  getters: {  // store 的计算属性 (computed)
    // double: (state) => state.count * 2,
  },
  actions: {  //actions 则是方法 (methods)
    async createParty(data:FrontEndPartyType):Promise<void>{
      try{
        const createData = await createPartyAPI(data);
        console.log("createData:",createData.results);
        
        message.success("创建甲方信息成功")
        // 更新本地 state 中的 party 数据 -------------------------------------------
        this.readPartyStateData.results.push(createData.results[0]);
        console.log("this.readPartyStateData:",this.readPartyStateData);
        // results.push(createData.results[0]);
        // --------------------------------------------------------------------------------------
        
      } catch (error) {
        message.error(`创建失败!:${error}`);
        console.error("创建失败:", error);
        throw error;
      }
    },
    async readParty() { // 异步编程获取数据
      try {
        const getPartyData = await readPartyAPI()
        this.readPartyStateData = getPartyData;
        // console.log("getPartyData:",getPartyData.);
        // await readPartyAPI();
        message.success("获取信息成功")
        return this.readPartyStateData;
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    async updateParty(id:string,partyItem: any) {
      try {
        // const response = await axios.put(`/party/${partyItem.id}`, partyItem);
        const updateData = await updatePartyAPI(id,partyItem);
        // console.log("updateData--------------------------------:",updateData);
        // 更新本地 state 中的 party 数据 -------------------------------------------
          //使用 更新数据 中 的ID，来寻找 状态数据中的 party的id对比，找到它在 party 数组里的index值。 
        const index = this.readPartyStateData.results.findIndex((item:Party)=> item.id === id);
        console.log('index---: ',index);
        
        if (index !== -1) { // 说明该找到了，有这个值。
          // 更新好的数据 response.data 来 赋值给 this.party[index],（更新了本地的状态数据）
          // console.log('index2---: ',updateData.results[0]);
          // console.log('index3---: ',this.readPartyStateData.results[index]);
          this.readPartyStateData.results[index] = updateData.results[0];
          // console.log('index4---: ',this.readPartyStateData.results[index]);
          
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

    async deleteParty(id: string) {
      try {
        // const response = await axios.delete(`/party/${partyItem.id}`, partyItem);
        await deletePartyAPI(id);
        
        // 更新本地 state 中的 party 数据 -------------------------------------------
        const index = this.readPartyStateData.results.findIndex((item:Party)=> item.id === id);
        // console.log("deleteObject多少？：",deleteObject);
        if(index !== -1){
          this.readPartyStateData.results.splice(index,1);
          console.log("this.readPartyStateData:",this.readPartyStateData);
          console.log("index:",index);
        }

        // if (index !== -1) {
        //   this.getPartyStateData[index] = response.data;
        // }
        // dataSource.value = this.getPartyStateData.filter(item => item.id !== id);
        // --------------------------------------------------------------------------------------
        message.success("删除成功!")
      } catch (error) {
        message.error(`请求错误!:${error}`);
        console.error("Error updating data:", error);
        throw error;
      }
    },
  },
})