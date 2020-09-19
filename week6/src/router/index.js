import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        // 巢狀路由的 path 不需 '/'
        path: '',
        component: () => import('../views/Index.vue'),
      },
      {
        path: 'about',
        component: () => import('../views/About.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/Products.vue'),
      },
      {
        // 加上分號「：」為動態路由
        path: 'product/:id',
        component: () => import('../views/Product.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
