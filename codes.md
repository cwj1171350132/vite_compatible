# Vue3 Legacy Browser Support - 完整项目文件

## 📁 项目目录结构

```
vue3-legacy-support/
├── 📄 package.json
├── 📄 vite.config.js
├── 📄 babel.config.js
├── 📄 index.html
├── 📄 README.md
├── 📁 src/
│   ├── 📄 main.js
│   ├── 📄 App.vue
│   └── 📁 styles/
│       └── 📄 variables.scss (可选)
└── 📁 public/
    └── 📄 favicon.ico (可选)
```

---

## 📄 根目录文件

### `package.json`

```json
{
  "name": "vue3-legacy-support",
  "version": "1.0.0",
  "description": "Vue3 + Element Plus 兼容旧浏览器项目 (Chrome 46+, Firefox 45+)",
  "main": "index.js",
  "scripts": {
    "dev": "vite --host",
    "build": "vite build",
    "preview": "vite preview",
    "serve": "vite preview"
  },
  "keywords": [
    "vue3",
    "element-plus",
    "legacy-browser",
    "chrome46",
    "firefox45",
    "windows-xp"
  ],
  "author": "Your Name",
  "license": "MIT",
  "dependencies": {
    "vue": "^3.4.0",
    "element-plus": "^2.4.0",
    "@element-plus/icons-vue": "^2.1.0",
    "core-js": "^3.35.0",
    "regenerator-runtime": "^0.14.0",
    "whatwg-fetch": "^3.6.2",
    "es6-promise": "^4.2.8"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "@vitejs/plugin-legacy": "^5.2.0",
    "vite": "^6.0.0",
    "@babel/core": "^7.23.0",
    "@babel/preset-env": "^7.23.0",
    "@babel/plugin-transform-runtime": "^7.23.0",
    "@babel/plugin-proposal-class-properties": "^7.18.0",
    "@babel/plugin-proposal-optional-chaining": "^7.21.0",
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.18.0",
    "@babel/plugin-transform-async-to-generator": "^7.22.0",
    "@vue/babel-plugin-jsx": "^1.1.0",
    "babel-plugin-transform-remove-console": "^6.9.4",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "postcss-preset-env": "^9.3.0",
    "terser": "^5.24.0"
  },
  "browserslist": [
    "Chrome >= 46",
    "Firefox >= 45",
    "ie >= 11"
  ],
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=7.0.0"
  }
}
```

### `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: [
        'Chrome >= 46',
        'Firefox >= 45',
        'ie >= 11'
      ],
      // 添加必要的polyfills
      additionalLegacyPolyfills: [
        'regenerator-runtime/runtime',
        'core-js/stable',
        'core-js/modules/es.promise',
        'core-js/modules/es.array.includes',
        'core-js/modules/es.string.includes',
        'core-js/modules/es.object.assign',
        'core-js/modules/es.array.find',
        'core-js/modules/es.array.from',
        'core-js/modules/es.set',
        'core-js/modules/es.map',
        'core-js/modules/es.symbol',
        'core-js/modules/es.symbol.iterator',
        'whatwg-fetch'
      ],
      modernPolyfills: false,
      renderLegacyChunks: true,
      // 确保polyfills在所有代码之前加载
      polyfills: true,
      // 支持动态导入
      externalSystemJS: false
    })
  ],
  build: {
    target: ['es2015', 'chrome46', 'firefox45'],
    cssTarget: ['chrome46', 'firefox45'],
    // 确保CSS兼容性
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        // 确保代码分割对旧浏览器友好
        manualChunks: undefined,
        inlineDynamicImports: false,
        format: 'iife'
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 如果使用SCSS
        additionalData: `@import "@/styles/variables.scss";`
      }
    },
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: [
            'Chrome >= 46',
            'Firefox >= 45',
            'ie >= 11'
          ]
        }),
        require('postcss-preset-env')({
          stage: 3,
          browsers: [
            'Chrome >= 46',
            'Firefox >= 45'
          ]
        })
      ]
    }
  },
  define: {
    // 确保环境变量兼容
    'process.env': process.env
  },
  server: {
    // 开发服务器配置
    host: true,
    port: 3000,
    open: true
  }
})
```

### `babel.config.js`

```javascript
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          chrome: '46',
          firefox: '45',
          ie: '11'
        },
        useBuiltIns: 'usage',
        corejs: {
          version: 3,
          proposals: true
        },
        modules: false,
        debug: false,
        // 确保转换所有现代JS特性
        include: [
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-proposal-nullish-coalescing-operator'
        ]
      }
    ]
  ],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    '@babel/plugin-transform-async-to-generator',
    // Vue 3 JSX支持（如果需要）
    '@vue/babel-plugin-jsx'
  ],
  env: {
    development: {
      plugins: []
    },
    production: {
      plugins: [
        ['transform-remove-console', { exclude: ['error', 'warn'] }]
      ]
    }
  }
}
```

### `index.html`

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Vue3 + Element Plus 兼容旧浏览器演示项目">
  <title>Vue3 Legacy Browser Support</title>
  
  <!-- 为旧版本浏览器添加基础兼容性支持 -->
  <!--[if lt IE 9]>
    <script src="https://cdn.jsdelivr.net/npm/html5shiv@3.7.3/dist/html5shiv.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/respond.js@1.4.2/dest/respond.min.js"></script>
  <![endif]-->
  
  <!-- 确保旧浏览器支持基本的CSS特性 -->
  <style>
    /* 为旧浏览器提供基础样式兼容 */
    * {
      box-sizing: border-box;
    }
    
    html, body {
      margin: 0;
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f5f5f5;
    }
    
    /* 确保在旧浏览器中正确显示flex布局的fallback */
    .fallback-flex {
      display: block;
      width: 100%;
    }
    
    @supports (display: flex) {
      .fallback-flex {
        display: flex;
      }
    }
    
    /* 加载动画 */
    .loading-spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #409eff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  </style>
</head>
<body>
  <div id="app">
    <!-- 加载状态，在Vue应用加载前显示 -->
    <div style="
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      font-size: 16px;
      color: #666;
      background: white;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0,0,0,0.1);
    ">
      <div class="loading-spinner"></div>
      <div style="margin-top: 15px;">正在加载应用...</div>
      <div style="margin-top: 10px; font-size: 12px; color: #999;">
        支持 Chrome 46+, Firefox 45+, IE 11+
      </div>
      <div style="margin-top: 5px; font-size: 11px; color: #ccc;">
        如果长时间未加载，请检查浏览器兼容性
      </div>
    </div>
  </div>
  
  <!-- 错误处理脚本 -->
  <script>
    // 全局错误处理
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error('Global Error: ', {
        message: msg,
        source: url,
        line: lineNo,
        column: columnNo,
        error: error
      });
      
      // 在旧浏览器中显示友好的错误信息
      var appDiv = document.getElementById('app');
      if (appDiv && (msg.indexOf('Unexpected token') > -1 || msg.indexOf('Syntax error') > -1)) {
        appDiv.innerHTML = '<div style="padding: 30px; text-align: center; max-width: 600px; margin: 50px auto; background: white; border-radius: 8px; box-shadow: 0 2px 12px rgba(0,0,0,0.1);">' +
          '<h2 style="color: #f56c6c; margin-bottom: 20px;">⚠️ 浏览器兼容性问题</h2>' +
          '<p style="color: #666; line-height: 1.6; margin-bottom: 20px;">当前浏览器版本可能不支持此应用，请升级浏览器或使用其他现代浏览器。</p>' +
          '<div style="background: #f8f9fa; padding: 15px; border-radius: 4px; margin-bottom: 20px;">' +
          '<h4 style="margin: 0 0 10px 0; color: #333;">推荐浏览器版本：</h4>' +
          '<ul style="text-align: left; color: #666; margin: 0; padding-left: 20px;">' +
          '<li>Google Chrome 46 或更高版本</li>' +
          '<li>Mozilla Firefox 45 或更高版本</li>' +
          '<li>Internet Explorer 11 或更高版本</li>' +
          '<li>Microsoft Edge (任意版本)</li>' +
          '</ul>' +
          '</div>' +
          '<p style="color: #999; font-size: 12px;">错误信息: ' + msg + '</p>' +
          '</div>';
      }
      return true;
    };
    
    // 检查关键API是否存在
    window.addEventListener('load', function() {
      var warnings = [];
      
      if (!window.Promise) {
        warnings.push('Promise API');
      }
      if (!window.fetch) {
        warnings.push('Fetch API');
      }
      if (!Object.assign) {
        warnings.push('Object.assign');
      }
      
      if (warnings.length > 0) {
        console.warn('Missing APIs (should be polyfilled):', warnings);
      }
    });
    
    // 简单的性能监控
    if (window.performance && window.performance.mark) {
      window.performance.mark('app-start');
    }
  </script>
  
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

## 📁 src/ 目录文件

### `src/main.js`

```javascript
// 引入所有必要的polyfills - 必须在最前面
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import 'whatwg-fetch'
import 'es6-promise/auto'

// 手动添加一些关键的polyfills以确保兼容性
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex) {
    if (this == null) {
      throw new TypeError('Array.prototype.includes called on null or undefined');
    }
    var o = Object(this);
    var len = parseInt(o.length) || 0;
    if (len === 0) return false;
    var n = parseInt(fromIndex) || 0;
    var k = n >= 0 ? n : Math.max(len + n, 0);
    
    function sameValueZero(x, y) {
      return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
    }
    
    for (; k < len; k++) {
      if (sameValueZero(o[k], searchElement)) {
        return true;
      }
    }
    return false;
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    if (typeof start !== 'number') {
      start = 0;
    }
    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// 确保Object.assign存在
if (typeof Object.assign !== 'function') {
  Object.assign = function(target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }
    var to = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var nextSource = arguments[index];
      if (nextSource != null) {
        for (var nextKey in nextSource) {
          if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
            to[nextKey] = nextSource[nextKey];
          }
        }
      }
    }
    return to;
  };
}

// 确保Array.from存在
if (!Array.from) {
  Array.from = function(arrayLike, mapFn, thisArg) {
    var C = this;
    var items = Object(arrayLike);
    if (arrayLike == null) {
      throw new TypeError('Array.from requires an array-like object - not null or undefined');
    }
    var len = parseInt(items.length) || 0;
    var A = typeof C === 'function' ? Object(new C(len)) : new Array(len);
    var k = 0;
    var kValue;
    while (k < len) {
      kValue = items[k];
      if (mapFn) {
        A[k] = typeof thisArg === 'undefined' ? mapFn(kValue, k) : mapFn.call(thisArg, kValue, k);
      } else {
        A[k] = kValue;
      }
      k += 1;
    }
    A.length = len;
    return A;
  };
}

import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'

console.log('Vue version:', createApp.version || 'Unknown');
console.log('Element Plus loaded successfully');

const app = createApp(App)

// 注册所有Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 配置Element Plus
app.use(ElementPlus, {
  // Element Plus配置
  size: 'default',
  zIndex: 3000,
})

// 全局错误处理
app.config.errorHandler = (err, vm, info) => {
  console.error('Vue Error:', err);
  console.error('Component:', vm);
  console.error('Info:', info);
}

// 性能标记
if (window.performance && window.performance.mark) {
  window.performance.mark('vue-mount-start');
}

app.mount('#app')

// 挂载完成后的性能标记
if (window.performance && window.performance.mark) {
  setTimeout(() => {
    window.performance.mark('vue-mount-end');
    if (window.performance.measure) {
      window.performance.measure('vue-mount-time', 'vue-mount-start', 'vue-mount-end');
    }
  }, 0);
}

console.log('Vue app mounted successfully');
```

### `src/App.vue`

```vue
<template>
  <div class="app-container">
    <el-container>
      <el-header class="header">
        <h1>Vue3 + Element Plus 兼容旧浏览器演示</h1>
        <p>支持 Chrome 46+, Firefox 45+</p>
      </el-header>
      
      <el-main class="main-content">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-card header="基础功能测试">
              <el-form :model="form" label-width="120px">
                <el-form-item label="用户名">
                  <el-input v-model="form.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                
                <el-form-item label="邮箱">
                  <el-input v-model="form.email" type="email" placeholder="请输入邮箱"></el-input>
                </el-form-item>
                
                <el-form-item label="日期">
                  <el-date-picker
                    v-model="form.date"
                    type="date"
                    placeholder="选择日期"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
                
                <el-form-item>
                  <el-button type="primary" @click="handleSubmit">提交</el-button>
                  <el-button @click="handleReset">重置</el-button>
                </el-form-item>
              </el-form>
            </el-card>
          </el-col>
          
          <el-col :span="12">
            <el-card header="ES6+ 特性测试">
              <div class="feature-test">
                <p><strong>箭头函数：</strong> {{ arrowFunctionTest }}</p>
                <p><strong>模板字符串：</strong> {{ templateStringTest }}</p>
                <p><strong>解构赋值：</strong> {{ destructuringTest }}</p>
                <p><strong>Promise：</strong> {{ promiseTest }}</p>
                <p><strong>async/await：</strong> {{ asyncTest }}</p>
                
                <el-button @click="testModernFeatures">测试现代JS特性</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
        
        <el-row style="margin-top: 20px;">
          <el-col :span="24">
            <el-card header="浏览器兼容性信息">
              <el-table :data="browserInfo" style="width: 100%">
                <el-table-column prop="feature" label="特性" width="200"></el-table-column>
                <el-table-column prop="supported" label="是否支持" width="120">
                  <template #default="scope">
                    <el-tag :type="scope.row.supported ? 'success' : 'danger'">
                      {{ scope.row.supported ? '支持' : '不支持' }}
                    </el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="description" label="说明"></el-table-column>
              </el-table>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

export default {
  name: 'App',
  setup() {
    const form = reactive({
      username: '',
      email: '',
      date: ''
    })
    
    const arrowFunctionTest = ref('')
    const templateStringTest = ref('')
    const destructuringTest = ref('')
    const promiseTest = ref('')
    const asyncTest = ref('')
    
    const browserInfo = ref([])
    
    const handleSubmit = () => {
      if (!form.username) {
        ElMessage.warning('请输入用户名')
        return
      }
      ElMessage.success('提交成功！')
    }
    
    const handleReset = () => {
      Object.assign(form, {
        username: '',
        email: '',
        date: ''
      })
      ElMessage.info('表单已重置')
    }
    
    const testModernFeatures = async () => {
      try {
        // 箭头函数测试
        const arrowFunc = () => '箭头函数工作正常'
        arrowFunctionTest.value = arrowFunc()
        
        // 模板字符串测试
        const name = 'Vue3'
        templateStringTest.value = `${name} 模板字符串工作正常`
        
        // 解构赋值测试
        const obj = { a: 1, b: 2 }
        const { a, b } = obj
        destructuringTest.value = `解构赋值: a=${a}, b=${b}`
        
        // Promise测试
        const promiseResult = await new Promise(resolve => {
          setTimeout(() => resolve('Promise工作正常'), 100)
        })
        promiseTest.value = promiseResult
        
        // async/await测试
        asyncTest.value = 'async/await工作正常'
        
        ElMessage.success('所有现代JS特性测试完成')
      } catch (error) {
        ElMessage.error('现代JS特性测试失败: ' + error.message)
      }
    }
    
    const checkBrowserSupport = () => {
      const features = [
        {
          feature: 'Promise',
          supported: typeof Promise !== 'undefined',
          description: 'ES6 Promise支持'
        },
        {
          feature: 'fetch',
          supported: typeof fetch !== 'undefined',
          description: '现代网络请求API'
        },
        {
          feature: 'Object.assign',
          supported: typeof Object.assign !== 'undefined',
          description: '对象合并方法'
        },
        {
          feature: 'Array.includes',
          supported: Array.prototype.includes !== undefined,
          description: '数组包含检查方法'
        },
        {
          feature: 'String.includes',
          supported: String.prototype.includes !== undefined,
          description: '字符串包含检查方法'
        },
        {
          feature: 'CSS Grid',
          supported: CSS.supports && CSS.supports('display', 'grid'),
          description: 'CSS网格布局'
        },
        {
          feature: 'CSS Flexbox',
          supported: CSS.supports && CSS.supports('display', 'flex'),
          description: 'CSS弹性布局'
        }
      ]
      
      browserInfo.value = features
    }
    
    onMounted(() => {
      checkBrowserSupport()
      ElMessage.success('应用加载成功，兼容性检查完成')
    })
    
    return {
      form,
      arrowFunctionTest,
      templateStringTest,
      destructuringTest,
      promiseTest,
      asyncTest,
      browserInfo,
      handleSubmit,
      handleReset,
      testModernFeatures
    }
  }
}
</script>

<style scoped>
.app-container {
  min-height: 100vh;
  background-color: #f5f5f5;
}

.header {
  background-color: #409eff;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.header p {
  margin: 8px 0 0 0;
  font-size: 14px;
  opacity: 0.9;
}

.main-content {
  padding: 20px;
}

.feature-test p {
  margin: 8px 0;
  padding: 8px;
  background-color: #f9f9f9;
  border-radius: 4px;
  border-left: 4px solid #409eff;
}

/* 为旧浏览器提供flex布局的fallback */
.el-row {
  display: block;
  width: 100%;
}

@supports (display: flex) {
  .el-row {
    display: flex;
  }
}

/* 确保在旧浏览器中的基本样式 */
.el-card {
  margin-bottom: 20px;
}

.el-button + .el-button {
  margin-left: 10px;
}
</style>