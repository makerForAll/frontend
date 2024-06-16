import {defineStore} from 'pinia';

const useHeaderStore = defineStore('header',{
    state:()=>{
        return {
            companyCode:window.location.href.split('/')[window.location.href.split('/').length-2],
            lastSegment:window.location.href.split('/')[window.location.href.split('/').length-1]
        }
    },
    actions:{
        setCompanyCode(newCompanyCode: string){
            // console.log("userName=====",userName);
            this.companyCode = newCompanyCode;
        },
        setLastSegment(newCompanyCode: string){
            // console.log("userName=====",userName);
            this.lastSegment = newCompanyCode;
        },
    },
    getters:{

    },
    persist: true
})

export default useHeaderStore