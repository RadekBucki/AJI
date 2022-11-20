import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import CartView from "@/views/CartView.vue";
import ThankYouPage from '@/views/ThankYouPage.vue';
import Login from "@/views/Admin/Login.vue";
import Dashboard from "@/views/Admin/Dashboard.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    props: true
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView,
    props: true
  },
  {
    path: '/thank-you-page',
    name: 'thank-you-page',
    component: ThankYouPage,
    props: true
  },
  {
    path: '/admin',
    name: 'admin',
    component: Login
  },
  {
    path: '/admin/dashboard',
    name: 'dashboard',
    component: Dashboard,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
