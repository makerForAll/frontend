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
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => {
          console.log("Original path:", path);
          const newPath = path.replace(/^\/api/, "api/v1");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvd2ViZGUvRGVza3RvcC9mcm9udGVuZC92dWUtcHJvamVjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL3dlYmRlL0Rlc2t0b3AvZnJvbnRlbmQvdnVlLXByb2plY3Qvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL3dlYmRlL0Rlc2t0b3AvZnJvbnRlbmQvdnVlLXByb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tICdub2RlOnVybCdcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IFZ1ZURldlRvb2xzIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1kZXZ0b29scydcblxuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW1xuICAgIHZ1ZSgpLFxuICAgIFZ1ZURldlRvb2xzKCksXG4gIF0sXG4gIHNlcnZlcjogeyAvLyBcdThERThcdTU3REZcdTkxNERcdTdGNkVcbiAgICBob3N0OiAnMC4wLjAuMCcsIC8vIFx1NTE0MVx1OEJCOFx1NTkxNlx1OTBFOFx1OEJCRlx1OTVFRVxuICAgIHBvcnQ6IDUxNzUsIC8vIFx1NEZFRVx1NjUzOVx1NEUzQVx1NEY2MFx1NEY3Rlx1NzUyOFx1NzY4NFx1N0FFRlx1NTNFM1xuXHRcdHByb3h5OiB7IC8vXHU1RjUzIGF4aW9zXHU4QkY3XHU2QzQyIHVybFx1NEUyRFx1NTMwNVx1NTQyQiAvYXBpLCBcdTRFRTNcdTc0MDZcdTZGQzBcdTZEM0JcdTRGMUEgXHU2MkU2XHU2MjJBIGF4aW9zXHU4QkY3XHU2QzQyXHVGRjBDXHU3MTM2XHU1NDBFXHU4RkRCXHU4ODRDXHU0RkVFXHU2NTM5XHU1QjgzXHU3Njg0dXJsXHVGRjBDXHU3NTI4XHU0RkVFXHU2NTM5XHU1NDBFXHU3Njg0dXJsXHU1M0JCXHU1QjlFXHU5NjQ1XHU4QkY3XHU2QzQyIEFQSVx1NjcwRFx1NTJBMVx1NTY2OFx1MzAwMlxuICAgICAgICcvYXBpJzoge1xuICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0OjMwMDAnLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICAgIHJld3JpdGU6IChwYXRoKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coJ09yaWdpbmFsIHBhdGg6JywgcGF0aCk7XG4gICAgICAgICAgY29uc3QgbmV3UGF0aCA9IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICdhcGkvdjEnKTtcbiAgICAgICAgICBjb25zb2xlLmxvZygnUmV3cml0dGVuIHBhdGg6JywgbmV3UGF0aCk7XG4gICAgICAgICAgcmV0dXJuIG5ld1BhdGg7XG4gICAgICAgIH0sXG5cbiAgICAgIH1cblx0XHR9LFxuXHR9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgfVxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UyxTQUFTLGVBQWUsV0FBVztBQUVoVixTQUFTLG9CQUFvQjtBQUM3QixPQUFPLFNBQVM7QUFDaEIsT0FBTyxpQkFBaUI7QUFKa0ssSUFBTSwyQ0FBMkM7QUFRM08sSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLEVBQ2Q7QUFBQSxFQUNBLFFBQVE7QUFBQTtBQUFBLElBQ04sTUFBTTtBQUFBO0FBQUEsSUFDTixNQUFNO0FBQUE7QUFBQSxJQUNSLE9BQU87QUFBQTtBQUFBLE1BQ0YsUUFBUTtBQUFBLFFBQ1AsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDLFNBQVM7QUFDakIsa0JBQVEsSUFBSSxrQkFBa0IsSUFBSTtBQUNsQyxnQkFBTSxVQUFVLEtBQUssUUFBUSxVQUFVLFFBQVE7QUFDL0Msa0JBQVEsSUFBSSxtQkFBbUIsT0FBTztBQUN0QyxpQkFBTztBQUFBLFFBQ1Q7QUFBQSxNQUVGO0FBQUEsSUFDSjtBQUFBLEVBQ0Q7QUFBQSxFQUNDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
