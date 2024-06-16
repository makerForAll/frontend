// import { number } from "echarts";

export interface PartyType {
	// _id?: string;
	party?: string;
}


// ------------------------------
export interface UnityType {
	_id?: string;
	unityCode?: string;
	unityArea?: string;
	allocatedArea?:string;
	state?: string;
	region?: string;
	selected?: string;
	setTextPos?:string;
	rotate?:string;
	unityPackageItem?: Array<UnityPackageType>;
	contractItem?: Array<ContractsType>;
	notes?: string;
}

export interface UnityPackageType {
	_id?: string;
	unityPackageCode?: string;
	unityPackageArea?: string;
	unityItems?: Array<UnityType>;
	notes?: string;
}

export interface StaticFileStoreType {
	_id?: string;
	nickName: string; //  文件上传时的名称
	forOssName: string; // 文件上传oss后，在oss中的名称
	perpetualUrl: string; // 可访问的 url
	signedUrl: string;
	tag: string;
}

export interface ContractsType {
	_id?: string;
	contractCode?: string;
	partyA?: string;
	partyB?: string;
	describe?: string;
	partyBContactInformation?: string;
	contractArea?: string;
	state?: string;
	notes?: string;
	unityItems?: Array<UnityType>;
	region?: string;
	staticFileStoreItems?: StaticFileStoreType[];
}


export interface APIResultForUnityType {
	// 返回单元结果
	code: number;
	message: string;
	results: UnityType[];
	total?: number;
	totalPage?: number;
}

export interface APIResultForContractsType {
	// 返回合同结果
	code: number;
	message: string;
	results: ContractsType[];
	total?: number;
	totalPage?: number;
}

export interface APIResultForStaticFileType {
	// 返回合同结果
	code: number;
	message: string;
	results: StaticFileStoreType[];
	total: number;
	totalPage: number;
}

export interface APIParams {
	// 传入 queryData 的参数
	current?: number;
	pageSize?: number;
	state?: number;
	'region[]'?:string;
}

// ----------------------------- 合同系统 --------------表格-多选项筛选功能
export const ItemStatus = [
	{ value: 0, text: '待处理', color: '#52c41a' }, //value 等于 合同模型数据库中的state值
	{ value: 1, text: '已出租', color: '#1890ff' },
	{ value: 2, text: '已卖', color: '#ff4d4f' },
	{ value: 3, text: '纠纷中', color: '#FFA500' },
	{ value: 4, text: '临时借用', color: '#F08080' },
	{ value: 5, text: '归档', color: '#F08032' },
];

export const transformItemStatus = ItemStatus.map((item) => ({
	label: item.text,
	value: item.value.toString(),
}));

export const ItemPartyA = [
	{ value: 0, text: '鄂州市银龙房地产开发有限公司', color: '#52c41a' }, //value 等于 合同模型数据库中的state值
	{ value: 1, text: '湖北银龙管业有限公司', color: '#1890ff' },
	{ value: 2, text: '鄂州市银龙实业有限责任公司', color: '#ff4d4f' },
	{ value: 3, text: '武汉市翔星建材销售中心', color: '#FFA500' },
];

export const transformItemPartyA = ItemPartyA.map((item) => ({
	label: item.text,
	value: item.value.toString(),
}));

// ----------------------------- 单元系统 --------------表格-多选项筛选功能
export const UnityStatus = [
	{ value: 0, text: '出租用', color: '#52c41a' }, //value 等于 单元模型数据库中的state值
	{ value: 1, text: '测绘报告', color: '#1890ff' },
	{ value: 2, text: '房产证数据', color: '#ff4d4f' },
	{ value: 3, text: '自测数据', color: '#FFA500' },
];

export const transformUnityStatus = UnityStatus.map((item) => ({
	label: item.text,
	value: item.value.toString(),
}));

export const UnityRegion = [
	// 管理地区
	{ value: 0, text: '银海龙城', color: '#52c41a' }, //value 等于 单元模型数据库中的region值
	{ value: 1, text: '管业厂房-银龙大酒店', color: '#1890ff' },
	{ value: 2, text: '鄂东钢材市场', color: '#ff4d4f' },
	{ value: 3, text: '武汉翔星建材销售中心', color: '#FFA500' },
];

export const transformUnityRegion = UnityRegion.map((item) => ({
	label: item.text,
	value: item.value.toString(),
}));

//   合同用         文字                                    路径层根据类型显示
//   出租用         路径(name=020201)              路径层根据类型显示
//   测绘用         路径(name=C020201)            路径层根据类型显示
//   房产证         路径(name=F020201)            路径层根据类型显示
//   自测用         路径(name=Z020201)            路径层根据类型显示

// ----------------------------- 静态文件系统 --------------表格-多选项筛选功能
export const FileSelectTag = [
	// 静态文件中的 选项
	{ value: 0, text: '默认', color: '#52c41a' },
	{ value: 1, text: '合同详情中的文件', color: '#1890ff' },
	// { value: 2, text: '已卖', color: '#ff4d4f' },
	// { value: 3, text: '纠纷中', color: '#FFA500' },
	// { value: 4, text: '临时借用', color: '#F08080' },
];

export const myData = [
	{
		value: '090101',
		disabled: false,
	},
	{
		value: '090102',
		disabled: false,
	},
];

export const myDataOption = [
	{
		value: '090101',
		// disabled:true,
		myData: '50',
	},
	{
		value: '090102',
		disabled: false,
		myData: '60',
	},
	{
		value: '090103',
		disabled: true,
	},
	{
		value: '090104',
		disabled: false,
	},
	{
		value: '090105',
		disabled: false,
	},
];


// // 前端的 jwt 验证库
// import jwtDecode from 'jwt-decode'
// // import * as dayjs from 'dayjs'

// export const getTokenExpirationDate = (token: string)  =>{
// 	const decodedToken:any = jwtDecode(token)
// 	if (!decodedToken.exp) {
// 	  return null
// 	}
// 	const expirationTime = decodedToken.exp * 1000 // 将过期时间转换为时间戳
// 	console.log("expirationTime:",expirationTime);
// 	console.log("new Date", new Date());
// 	return new Date(expirationTime)
//   }