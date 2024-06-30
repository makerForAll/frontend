

import axios from '@/utils/request';

// 字段 配置区域 ------------------------------------------------------

// export const planColumnsArr = ['index', 'name', 'phonenumber','emergencycontact','emergencycontactphone','marks'];

// export const planColumns = [
//   {
//     title: '序号',
//     dataIndex: 'index',
//     width: '6%',
//   },
//   {
//     title: '客户名称',
//     dataIndex: 'name',
//     width: '10%',
//   },{
//     title: '联系方式',
//     dataIndex: 'phonenumber',
//     width: '10%',
//   },{
//     title: '紧急联系人',
//     dataIndex: 'emergencycontact',
//     width: '15%',
//   },{
//     title: '紧急联系人电话',
//     dataIndex: 'emergencycontactphone',
//     width: '15%',
//   },
//   {
//     title: '备注',
//     dataIndex: 'marks',
//     width: '15%',
//   },
//   {
//     title: '操作',
//     dataIndex: 'operation',
//   },
// ];
// 字段 配置区域 ------------------------------------------------------

export const initPlanForm = {
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
  is_default:false,
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
};


// 定义后端返回的原始数据类型
export interface FrontEndPlanType {
  id?: string; // id
  name: string; // 方案名称
  first_area?: string; // 第一个面积
  first_price?: string; // 第一个价格
  second_area?: string; // 第二个面积
  second_price?: string; // 第二个价格
  third_area?: string; // 第三个面积
  third_price?: string; // 第三个价格
  total_area?: string; // 总面积
  average_price?: string; // 平均单价
  initial_monthly_price?: string; //初期每月费用
  contract_type?: string; // 合同类型[租赁合同,销售合同]
  contract_status?: string; // 合同状态【起草,正常履行，】
  record_type?: string; // 是几个方案中的默认方案【默认】
  contract_duration_months?: string; // 合同期限（月）
  start_date?: Date; // 合同生效日期
  payment_interval_months?: string; // 支付方式（每多少个月）
  increase_interval_months?: string; // 增长率条件（每多少个月）
  increase_rate?: string; // 增长率（百分比）
  deposit?: string; // 押金（元）
  rent_free_months?: string; // 减免（月）
  initial_payment_duedays?: string; // 首次支付费用截止日期为合同生效日期后的第几天
  recurring_payment_duedays?: string; // 每期支付费用截止日期为每期应当提前多少月
  total_amount?: string; // 合同总金额
  remarks?: string; // 备注
  }


    // ---------------------------------------
  // mysql数据库的ID是自动生成的 int格式
  // 我们只 传输 id以外的数据 到 数据库 进行创建
  // ---------------------------------------
  export async function createPlanAPI(data:FrontEndPlanType): Promise<any> {
    const response = await axios.post<FrontEndPlanType>(`/plan/`,data);
    return response.data; // 返回数据，来修改本地状态
  }

  // ---------------------------------------
  // mysql数据库的ID是 int格式
  // 我们从数据库请求id 时，得到的是 int格式，为了给前端使用，因此这里需要我们转换到 string格式。
  // ---------------------------------------
  export async function readPlanAPI(): Promise<FrontEndPlanType[]> {
    const response = await axios.get<FrontEndPlanType[]>('/plan');
    return response.data.map(item => ({ // 返回数据，修改本地状态
      ...item,
      // id: item.id.toString()
    }));
  }

  // ---------------------------------------
  // mysql数据库的ID是 int格式
  // 我们从 前端中 store 中获取数据格式，其中id 为字符串，传输到mysql 时，需要转换为 int 【number】格式。
  // 但这里通过了 url 进行传递 id,让它自动转换了格式。
  // ---------------------------------------
  export async function updatePlanAPI(id:string,data:FrontEndPlanType): Promise<any> {
    // 传给 mysql数据库，需要 把从 前端获取的字符串id 改为 int的id.
    console.log("传递到 API的 data数据:",id,data);
    const responseObject = await axios.put<FrontEndPlanType>(`/plan/${id}`,data);
    // 返回的是一个对象
    console.log("发送到数据库后返回得到的数据:",responseObject);
    
    // const returnObject = {
    //   ...responseObject.data,
    //   id: responseObject.data.id
    // };
    return responseObject; // 返回数据修改本地状态
  }


  export async function deletePlanAPI(dataID:string): Promise<any> {
    return await axios.delete<FrontEndPlanType>(`/plan/${dataID}`);
    // console.log("id多少？：",dataID);
  }
