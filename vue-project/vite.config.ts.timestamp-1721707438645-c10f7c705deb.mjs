// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///Users/webde/Desktop/frontend/vue-project/node_modules/.pnpm/vite@5.3.3_@types+node@20.14.10/node_modules/vite/dist/node/index.js";
import vue from "file:///Users/webde/Desktop/frontend/vue-project/node_modules/.pnpm/@vitejs+plugin-vue@5.0.5_vite@5.3.3_@types+node@20.14.10__vue@3.4.31_typescript@5.4.5_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import VueDevTools from "file:///Users/webde/Desktop/frontend/vue-project/node_modules/.pnpm/vite-plugin-vue-devtools@7.3.5_rollup@4.18.0_vite@5.3.3_@types+node@20.14.10__vue@3.4.31_typescript@5.4.5_/node_modules/vite-plugin-vue-devtools/dist/vite.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/webde/Desktop/frontend/vue-project/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    vue(),
    VueDevTools()
  ],
  server: {
    // 跨域配置
    host: "0.0.0.0",
    // 允许外部访问
    port: 5175,
    // 修改为你使用的端口
    proxy: {
      //当 axios请求 url中包含 /api, 代理激活会 拦截 axios请求，然后进行修改它的url，用修改后的url去实际请求 API服务器。
      "/frontend": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Original path:", path);
          const newPath = path.replace(/^\/frontend/, "");
          console.log("Rewritten path:", newPath);
          return newPath;
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2ViZGUvRGVza3RvcC9mcm9udGVuZC92dWUtcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3dlYmRlL0Rlc2t0b3AvZnJvbnRlbmQvdnVlLXByb2plY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3dlYmRlL0Rlc2t0b3AvZnJvbnRlbmQvdnVlLXByb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIFZ1ZURldlRvb2xzKCksXG4gIF0sXG4gIHNlcnZlcjogeyAvLyBcdThERThcdTU3REZcdTkxNERcdTdGNkVcbiAgICBob3N0OiAnMC4wLjAuMCcsIC8vIFx1NTE0MVx1OEJCOFx1NTkxNlx1OTBFOFx1OEJCRlx1OTVFRVxuICAgIHBvcnQ6IDUxNzUsIC8vIFx1NEZFRVx1NjUzOVx1NEUzQVx1NEY2MFx1NEY3Rlx1NzUyOFx1NzY4NFx1N0FFRlx1NTNFM1xuXHRcdHByb3h5OiB7IC8vXHU1RjUzIGF4aW9zXHU4QkY3XHU2QzQyIHVybFx1NEUyRFx1NTMwNVx1NTQyQiAvYXBpLCBcdTRFRTNcdTc0MDZcdTZGQzBcdTZEM0JcdTRGMUEgXHU2MkU2XHU2MjJBIGF4aW9zXHU4QkY3XHU2QzQyXHVGRjBDXHU3MTM2XHU1NDBFXHU4RkRCXHU4ODRDXHU0RkVFXHU2NTM5XHU1QjgzXHU3Njg0dXJsXHVGRjBDXHU3NTI4XHU0RkVFXHU2NTM5XHU1NDBFXHU3Njg0dXJsXHU1M0JCXHU1QjlFXHU5NjQ1XHU4QkY3XHU2QzQyIEFQSVx1NjcwRFx1NTJBMVx1NTY2OFx1MzAwMlxuICAgICAgICcvZnJvbnRlbmQnOiB7XG4gICAgICAgIHRhcmdldDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMCcsXG4gICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgcmV3cml0ZTogKHBhdGgpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZygnT3JpZ2luYWwgcGF0aDonLCBwYXRoKTtcbiAgICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5yZXBsYWNlKC9eXFwvZnJvbnRlbmQvLCAnJyk7XG4gICAgICAgICAgY29uc29sZS5sb2coJ1Jld3JpdHRlbiBwYXRoOicsIG5ld1BhdGgpO1xuICAgICAgICAgIHJldHVybiBuZXdQYXRoO1xuICAgICAgICB9LFxuXG4gICAgICB9XG5cdFx0fSxcblx0fSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKVxuICAgIH1cbiAgfVxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsU0FBUyxlQUFlLFdBQVc7QUFFaFYsU0FBUyxvQkFBb0I7QUFDN0IsT0FBTyxTQUFTO0FBQ2hCLE9BQU8saUJBQWlCO0FBSmtLLElBQU0sMkNBQTJDO0FBUTNPLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFDQSxRQUFRO0FBQUE7QUFBQSxJQUNOLE1BQU07QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDUixPQUFPO0FBQUE7QUFBQSxNQUNGLGFBQWE7QUFBQSxRQUNaLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxRQUNkLFNBQVMsQ0FBQyxTQUFTO0FBQ2pCLGtCQUFRLElBQUksa0JBQWtCLElBQUk7QUFDbEMsZ0JBQU0sVUFBVSxLQUFLLFFBQVEsZUFBZSxFQUFFO0FBQzlDLGtCQUFRLElBQUksbUJBQW1CLE9BQU87QUFDdEMsaUJBQU87QUFBQSxRQUNUO0FBQUEsTUFFRjtBQUFBLElBQ0o7QUFBQSxFQUNEO0FBQUEsRUFDQyxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLFNBQVMsd0NBQWUsQ0FBQztBQUFBLElBQ3REO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
