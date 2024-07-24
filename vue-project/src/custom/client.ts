

import axios from '@/utils/request';

// import { format } from 'date-fns-tz';
// 字段 配置区域 ------------------------------------------------------

export const clientColumnsArr = ['index', 'name', 'phonenumber','emergencycontact','emergencycontactphone','createdAt','marks'];

// const formatDate = (date: Date | undefined) => {
//   return date ? format(date, 'yyyy-MM-dd HH:mm:ss') : '';
// };

export const initClientForm = {
  name: '',
  phonenumber: '',
  emergencycontact: '',
  emergencycontactphone: '',
  marks:''
  // 其他字段可以按需添加
}

export const clientColumns = [
  {
    title: '序号',
    dataIndex: 'index',
    width: '6%',
    fixed: 'left'
  },
  {
    title: '客户名称',
    dataIndex: 'name',
    sorter: true,
    width: '10%',
    fixed: 'left'
  },{
    title: '联系方式',
    dataIndex: 'phonenumber',
    width: '10%',
  },{
    title: '紧急联系人',
    dataIndex: 'emergencycontact',
    width: '12%',
  },{
    title: '紧急联系人电话',
    dataIndex: 'emergencycontactphone',
    width: '15%',
  },{
    title: '注册时间',
    dataIndex: 'createdAt',
    width:'25%',
    // customRender: ({ text }: { text: string }) => formatDate(new Date(text)) // 本地化显示
  },
  {
    title: '备注',
    dataIndex: 'marks',
    width: '15%',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    fixed: 'right',
    width: '30%',
  },
];
// 字段 配置区域 ------------------------------------------------------

// 定义后端返回的原始数据类型

export interface FrontEndClientType {
  code: number; // 响应状态码
  message: string; // 响应消息
  results: ResultsClientType
}

export interface ResultsClientType{
    data:Client[],
    total?: number,
}

export interface Client {
  id?: string;
  name: string;
  phonenumber?: string; // 联系号码
  emergencycontact?: string; // 紧急联系人
  emergencycontactphone?: string; // 紧急联系人号码
  marks?: string; // 备注
  createdAt?: Date;
}

export type APIParams = {
  pagesize: number;
  current?: number;
  sortField?: string;
  sortOrder?: number;
  [key: string]: any;
};



// export interface FrontEndClientType {
//     id?: string;
//     name: string;
//     phonenumber?: string; // 联系号码
//     emergencycontact?: string; // 紧急联系人
//     emergencycontactphone?: string; // 紧急联系人号码
//     marks?: string; //备注
//   }




// import { format, toZonedTime } from 'date-fns-tz';

// const timeZone = 'Asia/Shanghai'; // 你的时区


    // ---------------------------------------
  // mysql数据库的ID是自动生成的 int格式
  // 我们只 传输 id以外的数据 到 数据库 进行创建
  // ---------------------------------------
  export async function createClientAPI(Clientdata:FrontEndClientType): Promise<FrontEndClientType> {
    const response = await axios.post<FrontEndClientType>(`/client/`,Clientdata);
    // return response.data; // 返回数据，来修改本地状态
    const data = response.data;
    // console.log("data-----------:", data);
    
    // 转换数据中的时间格式
    data.results.data = data.results.data.map((item: Client) => ({
    ...item,
    // createdAt: item.createdAt ? toZonedTime(new Date(item.createdAt), timeZone) : undefined,
  }));
    return data;
  }

  // ---------------------------------------
  // mysql数据库的ID是 int格式
  // 我们从数据库请求id 时，得到的是 int格式，为了给前端使用，因此这里需要我们转换到 string格式。
  // ---------------------------------------
  export async function readClientAPI(params:APIParams): Promise<FrontEndClientType> {
    const response = await axios.get<FrontEndClientType>('/client',{params});
    const data = response.data;
    // console.log("data-----------:", data);
    
    // 转换数据中的时间格式
    data.results.data = data.results.data.map((item: Client) => ({
    ...item,
    // createdAt: item.createdAt ? toZonedTime(new Date(item.createdAt), timeZone) : undefined,
    // createdAt: item.createdAt ? toZonedTime(new Date(item.createdAt), timeZone) : undefined,
  }));
    return data;
  }

  
// ---------------------------------------
  // mysql数据库的ID是 int格式
  // 我们从数据库请求id 时，得到的是 int格式，为了给前端使用，因此这里需要我们转换到 string格式。
  // ---------------------------------------
  export async function readClientIDAPI(id:string): Promise<FrontEndClientType> {
    const response = await axios.get<FrontEndClientType>(`/client/${id}`);
    const data = response.data;
    // console.log("data-----------:", data);
    
    // 转换数据中的时间格式
    data.results.data = data.results.data.map((item: Client) => ({
    ...item,
    // createdAt: item.createdAt ? toZonedTime(new Date(item.createdAt), timeZone) : undefined,
    // createdAt: item.createdAt ? toZonedTime(new Date(item.createdAt), timeZone) : undefined,
  }));
    return data;
  }

  // ---------------------------------------
  // mysql数据库的ID是 int格式
  // 我们从 前端中 store 中获取数据格式，其中id 为字符串，传输到mysql 时，需要转换为 int 【number】格式。
  // 但这里通过了 url 进行传递 id,让它自动转换了格式。
  // ---------------------------------------
  export async function updateClientAPI(id:string,data:FrontEndClientType): Promise<any> {
    // 传给 mysql数据库，需要 把从 前端获取的字符串id 改为 int的id.
    console.log("传递到 API的 data数据:",id,data);
    const responseObject = await axios.put<FrontEndClientType>(`/client/${id}`,data);
    // 返回的是一个对象
    // console.log("发送到数据库后返回得到的数据:",responseObject);
    
    // const returnObject = {
    //   ...responseObject.data,
    //   id: responseObject.data.id
    // };
    return responseObject.data; // 返回数据修改本地状态
  }


  export async function deleteClientAPI(dataID:string): Promise<any> {
    return (await axios.delete<FrontEndClientType>(`/client/${dataID}`)).data;
    // console.log("id多少？：",dataID);
  }
