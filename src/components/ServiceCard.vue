<template>
  <div class="service-card" @click="$emit('click')">
    <div class="card-icon">
      <slot name="icon"></slot>
    </div>
    <div class="card-content">
      <h3 class="card-title">
        <slot name="title"></slot>
      </h3>
      <p class="card-description">
        <slot name="description"></slot>
      </p>
      <button class="card-button">
        <slot name="button-text">Learn More</slot>
        <span class="button-icon">→</span>
      </button>
    </div>
    <div class="card-overlay"></div>
  </div>
</template>

<script setup>
defineEmits(['click'])
</script>

<style scoped>
.service-card {
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  padding: 2.5rem 2rem;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #f093fb 0%, #f5576c 100%);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover {
  transform: translateY(-10px) scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.service-card:hover::before {
  transform: scaleX(1);
}

.card-icon {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  opacity: 0.9;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.service-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-content {
  position: relative;
  z-index: 1;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  opacity: 0.95;
  transition: opacity 0.3s ease;
}

.service-card:hover .card-title {
  opacity: 1;
}

.card-description {
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.service-card:hover .card-description {
  opacity: 0.9;
}

.card-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.card-button:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.button-icon {
  font-size: 1.1rem;
  transition: transform 0.3s ease;
}

.card-button:hover .button-icon {
  transform: translateX(3px);
}

.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
}

.service-card:hover .card-overlay {
  opacity: 1;
}

@media (max-width: 768px) {
  .service-card {
    padding: 2rem 1.5rem;
  }
  
  .card-title {
    font-size: 1.3rem;
  }
  
  .card-description {
    font-size: 0.95rem;
  }
}
</style>