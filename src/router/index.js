import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import(/* webpackChunkName: "contact" */ '../views/Contact.vue')
  },
  {
    path: '/news',
    name: 'News',
    component: () => import(/* webpackChunkName: "news" */ '../views/News.vue')
  },
   {
    path: '/newsdetails/:nid',
    name: 'NewsDetails',
    component: () => import(/* webpackChunkName: "newsdetails" */ '../views/NewsDetails.vue')
  },
  {
    path: '/product/:type',
    name: 'Product',
    component: () => import(/* webpackChunkName: "newsdetails" */ '../views/Product.vue')
  },
  {
    path: '/product_details/:pid',
    name: 'Product_details',
    component: () => import(/* webpackChunkName: "newsdetails" */ '../views/Product_details.vue'),
    // 参数可以通过属性的方式进行传参
    props:true
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue'),
    // 参数可以通过属性的方式进行传参
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    // 参数可以通过属性的方式进行传参
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
