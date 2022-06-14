import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/HomeView.vue')
  },
  {
    path: '/gifts',
    name: 'GiftListView',
    component: () => import(/* webpackChunkName: "gifts" */ '../views/GiftListView.vue')
  },
  {
    path: '/products',
    name: 'ProductListView',
    component: () => import(/* webpackChunkName: "products" */ '../views/ProductListView.vue')
  }
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
});

export default router;
