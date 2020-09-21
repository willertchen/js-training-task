import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/Index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/frontend/Login.vue'),
      },
      {
        path: '/products',
        name: 'Products',
        component: () => import('../views/frontend/Products.vue'),
      },
      {
        path: '/cart',
        name: 'Carts',
        component: () => import('../views/frontend/Cart.vue'),
      },
      {
        path: '/home',
        name: 'Home',
        component: () => import('../views/frontend/Home.vue'),
      },
    ],
  },
  {
    path: '/admin',
    name: 'Admin 頁面',
    component: () => import('../views/Dashboard.vue'),
    redirect: 'admin/products',
    children: [
      {
        path: 'products',
        name: '產品頁面',
        component: () => import('../views/backend/Products.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: 'orders',
        name: '訂單列表',
        component: () => import('../views/backend/Orders.vue'),
        meta: { requiresAuth: true },
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
