import axios from 'axios';

// 创建实例
const instance = axios.create({
	baseURL: '/api',
	timeout: 20000,
});

// 添加请求拦截器
instance.interceptors.request.use(
	function (config) {
		// 发送请求之前做些什么
		return config;
	},
	function (error) {
		// 对请求错误做些什么
		return Promise.reject(error);
	}
);

// 添加响应拦截器
instance.interceptors.response.use(
	function (response) {
		// 2xx 范围内的状态码都会触发该函数。
		// 对响应数据做点什么
		return response;
	},
	function (error) {
		// 超出 2xx 范围的状态码都会触发该函数。
		// 对响应错误做点什么
		
		console.log("request",error);
		const newError = new Error(error.response.data.message);
		return Promise.reject(newError);
	}
);

export default instance;

// import axios from 'axios' // ------------------axios

// const myIcode = 'E4993F09B37DE0E4'
// // 替换 baseURL
// axios.defaults.baseURL = 'http://apis.imooc.com/api/'
// // 下面的 icode 值是从慕课网获取的 token 值，可以在课程右侧的项目接口校验码找到
// axios.interceptors.request.use(config => {
//   //... 其他代码
//   // get 请求，添加到 url 中
//   config.params = { ...config.params, icode: myIcode }
//   // 其他请求，添加到 body 中
//   // 如果是上传文件，添加到 FormData 中
//   if (config.data instanceof FormData) {
//     config.data.append('icode', myIcode)
//   } else {
//   // 普通的 body 对象，添加到 data 中
//     config.data = { ...config.data, icode: myIcode }
//   }
//   // console.log("config数据: ",config);
//   return config
// })

// // axios 拦截器，来实现loading 效果
// axios.interceptors.request.use(config => {
//     store.commit('setLoading', true)
//     store.commit('setError', {status:false, message: ''})
//     return config
// })

// axios.interceptors.response.use(config =>{
//     setTimeout(()=>{
//         store.commit('setLoading', false)
//     },500)
//     return config
// }, e =>{
//   const {error} = e.response.data
//   store.commit('setError', {status:true, message: error})
//   store.commit('setLoading', false)
//   return Promise.reject(error)
// })
