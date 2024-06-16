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

// ------------- begin
app.use(pinia) // 状态管理
app.use(Antd); // antd组件库
app.use(router)// 路由管理
app.mount('#app')
