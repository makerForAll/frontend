import {defineStore} from 'pinia';

export const userLoginStore = defineStore('loginRemember',{
    state:()=>{
        return {
            isRemember:false,
            userName:'',
            password:''
        }
    },
    actions:{
        setIsRemember(isRemember: boolean, userName: string, password: string){
            // console.log("userName=====",userName);
            this.isRemember = isRemember
            this.userName = userName
            this.password = password
        }
    },
    getters:{

    }
})