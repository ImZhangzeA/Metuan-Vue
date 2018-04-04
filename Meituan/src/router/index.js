import Vue from 'vue'
import app from '../App.vue'
import Router from 'vue-router'
import goods from '@/components/goods/goods'
import comment from '@/components/comment/comment'
import seller from '@/components/seller/seller'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: app,
    },
    {
      path:'/goods',
      name:'goods',
      component:goods,
    },
    {
      path:'/comment',
      name:'comment',
      component:comment,
    },
    {
      path:'/seller',
      name:'seller',
      component:seller,
    },
  ]
})
