import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const home = () => import('views/home/Home')
const cart = () => import('views/cart/Cart')
const category = () => import('views/category/Category')
const profile = () => import('views/profile/Profile')
const detail = () => import('views/detail/Detail')

const routes = [
    { path: '', redirect: '/home' },
    { path: '/home', component: home },
    { path: '/cart', component: cart },
    { path: '/category', component: category},
    { path: '/profile', component: profile },
    { path: '/detail/:iid', component: detail}
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router