<script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
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

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
