import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  server: { // 跨域配置
    host: '0.0.0.0', // 允许外部访问
    port: 5175, // 修改为你使用的端口
		proxy: { //当 axios请求 url中包含 /api, 代理激活会 拦截 axios请求，然后进行修改它的url，用修改后的url去实际请求 API服务器。
       '/frontend': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => {
          console.log('Original path:', path);
          const newPath = path.replace(/^\/frontend/, '');
          console.log('Rewritten path:', newPath);
          return newPath;
        },

      }
		},
	},
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
