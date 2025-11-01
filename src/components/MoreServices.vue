<template>
  <div class="more-services">
    <h2>更多服务</h2>
    
    <!-- 医疗服务 -->
    <div class="service-category">
      <h3>医疗服务</h3>
      <div class="services-list">
        <div class="service-item" v-for="service in medicalServices" :key="service.id" @click="showToast(service.name)">
          <div class="service-icon" :style="{ backgroundColor: service.color }">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="white"/>
            </svg>
          </div>
          <span>{{ service.name }}</span>
        </div>
      </div>
    </div>
    
    <!-- 健康管理 -->
    <div class="service-category">
      <h3>健康管理</h3>
      <div class="services-list">
        <div class="service-item" v-for="service in healthServices" :key="service.id" @click="showToast(service.name)">
          <div class="service-icon" :style="{ backgroundColor: service.color }">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="white"/>
            </svg>
          </div>
          <span>{{ service.name }}</span>
        </div>
      </div>
    </div>
    
    <!-- 日常服务 -->
    <div class="service-category">
      <h3>日常服务</h3>
      <div class="services-list">
        <div class="service-item" v-for="service in dailyServices" :key="service.id" @click="showToast(service.name)">
          <div class="service-icon" :style="{ backgroundColor: service.color }">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="white"/>
            </svg>
          </div>
          <span>{{ service.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// 模拟toast提示
const showToast = (serviceName) => {
  alert(`跳转${serviceName}服务`);
};

// 医疗服务数据
const medicalServices = ref([
  { id: 1, name: '在线问诊', color: '#FF6B6B' },
  { id: 2, name: '预约挂号', color: '#4ECDC4' },
  { id: 3, name: '健康咨询', color: '#45B7D1' },
  { id: 4, name: '药品配送', color: '#96CEB4' }
]);

// 健康管理数据
const healthServices = ref([
  { id: 5, name: '健康档案', color: '#FFEAA7' },
  { id: 6, name: '体检预约', color: '#DDA0DD' },
  { id: 7, name: '运动计划', color: '#98FB98' },
  { id: 8, name: '饮食建议', color: '#FFB6C1' },
  { id: 9, name: '睡眠监测', color: '#87CEFA' }
]);

// 日常服务数据
const dailyServices = ref([
  { id: 10, name: '生活缴费', color: '#F4A460' },
  { id: 11, name: '快递查询', color: '#90EE90' },
  { id: 12, name: '外卖订餐', color: '#FF6347' },
  { id: 13, name: '出行打车', color: '#4682B4' },
  { id: 14, name: '电影订票', color: '#9370DB' },
  { id: 15, name: '酒店预订', color: '#FFD700' }
]);
</script>

<style scoped>
.more-services {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.service-category {
  margin-bottom: 40px;
}

.service-category h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #2c3e50;
  padding-bottom: 5px;
  border-bottom: 2px solid #3498db;
}

.services-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.service-item {
  width: calc(25% - 15px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.3s ease;
}

.service-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.service-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.service-icon svg {
  width: 30px;
  height: 30px;
}

.service-item span {
  text-align: center;
  font-size: 14px;
  color: #333;
}

@media (max-width: 768px) {
  .service-item {
    width: calc(50% - 10px);
  }
}

@media (max-width: 480px) {
  .service-item {
    width: 100%;
  }
}
</style>