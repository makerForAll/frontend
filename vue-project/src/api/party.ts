// API层
// 1.处理来自 请求后端数据格式统一
// 比如把mysql的ID，在前端API层转换为 字符串，提供给前端组件使用。
// 2.放置 前后端 数据类型，管理数据类型统一。
  
  

import axios from '@/utils/request';


// 定义后端返回的原始数据类型
export interface BackEndPartyType {
    id: number;
    name: string;
    marks?: string;
  }
  
  // 定义前端使用的数据类型
  export interface FrontEndPartyType {
    id?: string;
    name: string;
    marks?: string;
  }



  // ---------------------------------------
  // mysql数据库的ID是自动生成的 int格式
  // 我们只 传输 id以外的数据 到 数据库 进行创建
  // ---------------------------------------
  export async function createPartyAPI(data:FrontEndPartyType): Promise<any> {
    const response = await axios.post<BackEndPartyType>(`/party/`,data);
    return response.data; // 返回数据，来修改本地状态
  }

  // ---------------------------------------
  // mysql数据库的ID是 int格式
  // 我们从数据库请求id 时，得到的是 int格式，为了给前端使用，因此这里需要我们转换到 string格式。
  // ---------------------------------------
  export async function readPartyAPI(): Promise<FrontEndPartyType[]> {
    const response = await axios.get<BackEndPartyType[]>('/party');
    return response.data.map(item => ({ // 返回数据，修改本地状态
      ...item,
      id: item.id.toString()
    }));
  }

  // ---------------------------------------
  // mysql数据库的ID是 int格式
  // 我们从 前端中 store 中获取数据格式，其中id 为字符串，传输到mysql 时，需要转换为 int 【number】格式。
  // 但这里通过了 url 进行传递 id,让它自动转换了格式。
  // ---------------------------------------
  export async function updatePartyAPI(id:string,data:FrontEndPartyType): Promise<any> {
    // 传给 mysql数据库，需要 把从 前端获取的字符串id 改为 int的id.
    console.log("传递到 API的 data数据:",id,data);
    const responseObject = await axios.put<BackEndPartyType>(`/party/${id}`,data);
    // 返回的是一个对象
    console.log("发送到数据库后返回得到的数据:",responseObject);
    
    // const returnObject = {
    //   ...responseObject.data,
    //   id: responseObject.data.id
    // };
    return responseObject; // 返回数据修改本地状态
  }


  export async function deletePartyAPI(dataID:string): Promise<any> {
    return await axios.delete<BackEndPartyType>(`/party/${dataID}`);
    // console.log("id多少？：",dataID);
  }
