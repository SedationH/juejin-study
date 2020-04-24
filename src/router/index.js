import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/home'
import User from '../views/user'
import Pin from '../views/pin'
import Search from '../views/search'
import Book from '../views/book'

import { homeRoutes } from './home'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
    children: homeRoutes
  }, {
    path: '/user',
    component: User,
  }, {
    path: '/search',
    component: Search,
  }, {
    path: '/books',
    component: Book,
  }, {
    path: '/pin',
    component: Pin
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
