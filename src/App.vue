<script setup>
import { ref, provide } from 'vue'
import QAApp from './components/QAApp.vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}

// 向子组件提供主题状态
provide('isDark', isDark)
</script>

<template>
  <div class="app-container">
    <header class="app-header">
      <h1 class="app-title">问答应用</h1>
      <button 
        class="theme-toggle-btn" 
        @click="toggleTheme" 
        aria-label="切换主题"
      >
        <span v-if="isDark" class="icon">🌞</span>
        <span v-else class="icon">🌙</span>
      </button>
    </header>
    <QAApp />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --bg-color: #f0f2f5;
  --header-bg: #1976d2;
  --header-text: white;
  --chat-bg: #f5f5f5;
  --chat-container-bg: white;
  --question-bg: white;
  --answer-bg: #dcf8c6;
  --button-yes: #4caf50;
  --button-no: #f44336;
  --button-finish: #1976d2;
  --button-retry: #ff9800;
  --text-color: #333;
  --shadow: rgba(0, 0, 0, 0.1);
}

.dark {
  --bg-color: #121212;
  --header-bg: #1f1f1f;
  --header-text: #e0e0e0;
  --chat-bg: #1e1e1e;
  --chat-container-bg: #2c2c2c;
  --question-bg: #3a3a3a;
  --answer-bg: #1e3a8a;
  --button-yes: #10b981;
  --button-no: #ef4444;
  --button-finish: #3b82f6;
  --button-retry: #f59e0b;
  --text-color: #e0e0e0;
  --shadow: rgba(255, 255, 255, 0.1);
}

body {
  font-family: Arial, sans-serif;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  gap: 20px;
}

.app-header {
  width: 100%;
  max-width: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: var(--header-bg);
  color: var(--header-text);
  border-radius: 8px;
  box-shadow: 0 2px 10px var(--shadow);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.app-title {
  margin: 0;
  font-size: 20px;
}

.theme-toggle-btn {
  background: none;
  border: none;
  color: var(--header-text);
  font-size: 24px;
  cursor: pointer;
  padding: 5px;
  border-radius: 50%;
  transition: background-color 0.2s ease, transform 0.3s ease;
}

.theme-toggle-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.1);
}

.theme-toggle-btn:active {
  transform: scale(0.95);
}

.icon {
  transition: transform 0.3s ease;
}

.dark .icon {
  transform: rotate(180deg);
}
</style>
