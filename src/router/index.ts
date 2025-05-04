import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Import views
import HomeView from '../views/HomeView.vue';

// Define routes
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreateWineView.vue')
  },
  {
    path: '/edit/:id',
    name: 'edit',
    component: () => import('../views/EditWineView.vue'),
    props: true
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: () => import('../views/DetailWineView.vue'),
    props: true
  }
];

// Create router instance
const router = createRouter({
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/vineria/' : '/'),
  routes
});

export default router;