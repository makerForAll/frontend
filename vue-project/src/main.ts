// import './assets/main.css'

// ## ----------------------------- create vue
import { createApp } from 'vue'
import App from './App.vue'
const app = createApp(App)


// ## ----------------------------- Pinia
// import { createPinia } from 'pinia'
import pinia from './stores';
  // ## ------- 缓存插件
  import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
  pinia.use(piniaPluginPersistedstate)

// ## ----------------------------- Antd
import 'ant-design-vue/dist/reset.css';
import Antd from 'ant-design-vue';

// ## ----------------------------- router
import router from './router'

// ## ------------------------------ dayjs
// import dayjs from 'dayjs';
// import 'dayjs/locale/zh-cn';
// import localizedFormat from 'dayjs/plugin/localizedFormat';
// dayjs.extend(localizedFormat);
// dayjs.locale('zh-cn');

// ------------- begin
app.use(pinia) // 状态管理
app.use(Antd); // antd组件库
app.use(router)// 路由管理

// app.config.globalProperties.$dayjs = dayjs; // 将 dayjs 添加到全局属性中，以便在所有组件中使用
app.mount('#app')
