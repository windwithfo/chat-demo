import { createRouter, createWebHistory } from 'vue-router';
import Home from '../App.vue';
import MoreServices from '../components/MoreServices.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/more-services',
    name: 'MoreServices',
    component: MoreServices
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;