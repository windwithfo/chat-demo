<script setup>
import QAApp from './components/QAApp.vue'
</script>

<template>
  <div class="app-container">
    <QAApp />
  </div>

  <!-- 更多服务按钮 -->
  <div style="text-align: center; margin: 20px 0;">
    <router-link to="/more-services">
      <button style="padding: 10px 20px; font-size: 16px; background-color: #409EFF; color: white; border: none; border-radius: 4px; cursor: pointer;">
        更多服务
      </button>
    </router-link>
  </div>
  
  <HelloWorld msg="Vite + Vue" />
  
  <!-- 路由出口 -->
  <router-view></router-view>

</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
}

.app-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}
</style>
