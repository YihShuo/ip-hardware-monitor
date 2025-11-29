import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard để check authentication
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user');
  
  if (to.meta.requiresAuth && !user) {
    // Nếu route yêu cầu auth nhưng chưa đăng nhập
    next('/login');
  } else if (to.path === '/login' && user) {
    // Nếu đã đăng nhập mà vào trang login thì redirect về home
    next('/home');
  } else {
    next();
  }
});

export default router;