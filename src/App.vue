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
