<script setup>
import { ref } from 'vue'
import router from './router'
import './assets/vue.svg'
</script>

<template>
  <div id="app">
    <!-- 公共Header -->
    <header class="app-header">
      <div class="header-left">
        <img src="./assets/vue.svg" alt="Logo" class="logo" />
        <span class="header-title">系统登录</span>
      </div>
    </header>
    
    <!-- 路由视图 -->
    <router-view />
  </div>
</template>

<style scoped>
.app-header {
  height: 50px;
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.09);
}

.header-left {
  display: flex;
  align-items: center;
}

.logo {
  height: 32px;
  margin-right: 12px;
}

.header-title {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}
</style>
