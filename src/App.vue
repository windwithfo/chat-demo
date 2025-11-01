<script setup>
import { ref } from 'vue'
import ServiceCard from './components/ServiceCard.vue'
</script>

<template>
  <div class="app-container">
    <div class="header">
      <h1 class="title">Welcome to Our Platform</h1>
      <p class="subtitle">Discover amazing services tailored just for you</p>
    </div>
    
    <div class="cards-grid">
      <ServiceCard @click="handleCardClick('design')">
        <template #icon>
          <span class="icon">🎨</span>
        </template>
        <template #title>
          Creative Design
        </template>
        <template #description>
          Beautiful and modern designs crafted with precision and passion
        </template>
        <template #button-text>
          View Designs
        </template>
      </ServiceCard>
      
      <ServiceCard @click="handleCardClick('development')">
        <template #icon>
          <span class="icon">💻</span>
        </template>
        <template #title>
          Web Development
        </template>
        <template #description>
          Custom web applications built with cutting-edge technologies
        </template>
        <template #button-text>
          Explore Projects
        </template>
      </ServiceCard>
      
      <ServiceCard @click="handleCardClick('marketing')">
        <template #icon>
          <span class="icon">📈</span>
        </template>
        <template #title>
          Digital Marketing
        </template>
        <template #description>
          Strategic marketing solutions to grow your business online
        </template>
        <template #button-text>
          Learn More
        </template>
      </ServiceCard>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
}

.header {
  text-align: center;
  color: white;
  max-width: 800px;
}

.title {
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  opacity: 0.95;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.subtitle {
  font-size: 1.2rem;
  line-height: 1.6;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  width: 100%;
}

.icon {
  font-size: 3rem;
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .cards-grid {
    grid-template-columns: 1fr;
  }
}
</style>
