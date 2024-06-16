
import { defineStore } from 'pinia'
import request from '@/utils/request'
import { message } from 'ant-design-vue'
// import instance from '@/utils/request'

// 创建 store
const useUserStore = defineStore('user', {
    // 定义状态：一个函数，返回一个对象
    state: () => {
        return {
            error: { status: false },
            token: '',
            loading: false,
            user: { isLogin: false }
        }
    },
    // localStorage.getItem('token') || 
    // 定义 getters，等同于组件的计算属性
    getters: {
        // getter 函数接收 state 作为参数，推荐使用箭头函数
        hello: state => 'Hello!' + state.user
    },

    // 定义 actions，有同步和异步两种类型
    actions: {
        // 异步 action，一般用来处理异步逻辑
        async login(userData: any) {
            try {
                const datas = await request.post('/users/login', userData)
                const { results, code } = datas.data
                console.log("actions:", results, code);
                if (code === 200) {
                    console.log("200:");
                    // action 中修改状态
                    this.user = { isLogin: true }
                    this.token = results[0].tokenStr
                    // localStorage.setItem('token', this.token)
                    // 下面来确定是否有权限登录
                    request.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
                    console.log("this.user", this.user);
                    console.log("this.user", this.token);
                }
            } catch (e) {
                message.error("user网络请求问题:" + e)
            }

        },

        // 同步 action
        logout() {
            // this.token = localStorage.getItem('token') || ''
            // this.user = { isLogin: false }
            this.token = ''
            this.user = {
                isLogin: false,
            }
            localStorage.removeItem('token')
            delete request.defaults.headers.common.Authorization
            
        },
        async fetchCurrentUser() { // 登录操作后 个人信息查看，state获取个人信息数据
            // return await instance({
            //     url:'/users/current',
            //     method:'get',
            // })
            try {
                // const { data } = await request.get('/users/current')
                await request.get('/users/current').then(res => {
                    this.user = { isLogin: true, ...res.data[0] }
                    console.log("data", res.data[0]);
                })
            } catch (e) {
                message.error("user网络请求问题:" + e)
            }
        },

    },
    persist: true

})

export default useUserStore