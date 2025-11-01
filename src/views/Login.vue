<script setup>
import { ref, reactive, toRefs } from 'vue'
import { ElMessage } from 'element-plus'
import router from '../router'

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度应在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度应在 6 到 20 个字符', trigger: 'blur' }
  ]
}

// 表单数据
const form = reactive({
  username: '',
  password: ''
})

// 切换类型
const activeName = ref('password')

// 表单引用
const formRef = ref(null)

// 登录方法
const login = async () => {
  if (!formRef.value) return
  
  try {
    // 表单验证
    await formRef.value.validate()
    
    // 模拟登录请求
    const response = await mockLogin(form)
    
    if (response.success) {
      ElMessage.success('登录成功')
      // 这里可以添加跳转到首页的逻辑
      // router.push('/home')
    } else {
      ElMessage.error(response.message)
    }
  } catch (error) {
    console.error('登录失败:', error)
  }
}

// 模拟登录接口
const mockLogin = async (data) => {
  // 模拟网络请求延迟
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // 从mock文件中获取数据
  try {
    const response = await fetch('/src/mock/login.json')
    const result = await response.json()
    
    // 简单的模拟验证
    if (data.username === 'admin' && data.password === '123456') {
      return {
        ...result,
        success: true
      }
    } else {
      return {
        success: false,
        message: '用户名或密码错误'
      }
    }
  } catch (error) {
    console.error('读取mock数据失败:', error)
    return {
      success: false,
      message: '登录失败，请稍后重试'
    }
  }
}
</script>

<template>
  <div class="login-container">
    <div class="login-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="账密登录" name="password">
          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            label-position="top"
            class="login-form"
          >
            <el-form-item label="用户名" prop="username">
              <el-input
                v-model="form.username"
                placeholder="请输入用户名"
                prefix-icon="User"
              />
            </el-form-item>
            
            <el-form-item label="密码" prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
                prefix-icon="Lock"
                show-password
              />
            </el-form-item>
            
            <el-form-item class="login-btn-group">
              <el-button
                type="primary"
                size="large"
                class="login-btn"
                @click="login"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        
        <el-tab-pane label="扫码登录" name="qrcode">
          <div class="qrcode-container">
            <div class="qrcode-image">
              <!-- 这里可以放置二维码图片 -->
              <el-icon class="qrcode-icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              </el-icon>
              <p>请使用手机扫码登录</p>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  display: flex;
  justify-content: flex-end;
  padding: 60px 200px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 50px);
}

.login-card {
  width: 400px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.login-form {
  margin-top: 30px;
}

.login-btn-group {
  margin-top: 20px;
}

.login-btn {
  width: 100%;
}

.qrcode-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0;
}

.qrcode-image {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.qrcode-icon {
  font-size: 80px;
  color: #409eff;
  margin-bottom: 20px;
}
</style>