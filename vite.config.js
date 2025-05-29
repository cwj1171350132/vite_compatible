import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ["Chrome >= 46", "Firefox >= 45", "ie >= 11"],
      // 添加必要的polyfills
      additionalLegacyPolyfills: [
        "regenerator-runtime/runtime",
        "core-js/stable",
        "core-js/modules/es.promise",
        "core-js/modules/es.array.includes",
        "core-js/modules/es.string.includes",
        "core-js/modules/es.object.assign",
        "core-js/modules/es.array.find",
        "core-js/modules/es.array.from",
        "core-js/modules/es.set",
        "core-js/modules/es.map",
        "core-js/modules/es.symbol",
        "core-js/modules/es.symbol.iterator",
        "whatwg-fetch",
      ],
      modernPolyfills: false,
      renderLegacyChunks: true,
      // 确保polyfills在所有代码之前加载
      polyfills: true,
      // 支持动态导入
      externalSystemJS: false,
    }),
  ],
  build: {
    target: ["es2015", "chrome46", "firefox45"],
    cssTarget: ["chrome46", "firefox45"],
    // 确保CSS兼容性
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // 确保代码分割对旧浏览器友好
        manualChunks: undefined,
        inlineDynamicImports: false,
        format: "iife",
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 如果使用SCSS
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
    postcss: {
      plugins: [
        require("autoprefixer")({
          overrideBrowserslist: ["Chrome >= 46", "Firefox >= 45", "ie >= 11"],
        }),
        require("postcss-preset-env")({
          stage: 3,
          browsers: ["Chrome >= 46", "Firefox >= 45"],
        }),
      ],
    },
  },
  define: {
    // 确保环境变量兼容
    "process.env": process.env,
  },
  server: {
    // 开发服务器配置
    host: true,
    port: 3000,
    open: true,
  },
});
