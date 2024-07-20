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
// import dayjsPlugin from '@/plugins/dayjs';

// # ---- vue-print-next 打印预览 ---
import {printPlugin} from 'vue-print-next';


// ------------- begin
app.use(pinia) // 状态管理
app.use(Antd); // antd组件库
app.use(router)// 路由管理

app.use(printPlugin);
// app.use(dayjsPlugin, { locale: 'zh-cn' }); // 你可以根据用户偏好或浏览器设置动态设置这里

app.mount('#app')
