import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    hidden:true
  },
  {
    path: '/home',
    name: '讲师管理',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '/teacher/list',
        name: '讲师列表',
        component: () => import('@/views/edu/teacher/list.vue'),
      },
      {
        path: '/teacher/save',
        name: '讲师添加',
        component: () => import('@/views/edu/teacher/save.vue'),
      },
      {
        path: '/teacher/edit/:id',   
        name: '编辑讲师',
        component: () => import('@/views/edu/teacher/save.vue'),        
        hidden: true
      }
    ]
  }
 
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
