import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../views/login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: login,
    hidden: true,
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/home.vue'),
    hidden: true,
  },
  {
    path: '/teacher',
    name: '讲师管理',
    component: () => import('@/views/home.vue'),
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
        hidden: true,
      },
    ],
  },
  {
    path: '/subject',
    name: '课程分类管理',
    component: () => import('@/views/home.vue'),
    redirect: '/subject/list',
    children: [
      {
        path: '/subject/list',
        name: '课程分类列表',
        component: () => import('@/views/edu/subject/list.vue'),
      },
      {
        path: '/subject/import',
        name: '课程分类导入',
        component: () => import('@/views/edu/subject/import.vue'),
      },
    ],
  },
  {
    path: '/course',
    name: '课程管理',
    component: () => import('@/views/home.vue'),
    redirect: '/course/list',
    children: [
      {
        path: '/course/list',
        name: '课程列表',
        component: () => import('@/views/edu/course/list.vue'),
      },
      {
        path: '/course/info',
        name: '课程添加',
        component: () => import('@/views/edu/course/info.vue'),
      },
      {
        path: 'info/:id',
        name: 'EduCourseInfoEdit',
        component: () => import('@/views/edu/course/info'),
        meta: { title: '编辑课程基本信息', noCache: true },
        hidden: true,
      },
      {
        path: 'chapter/:id',
        name: 'EduCourseChapterEdit',
        component: () => import('@/views/edu/course/chapter'),
        meta: { title: '编辑课程大纲', noCache: true },
        hidden: true,
      },
      {
        path: 'publist/:id',
        name: 'EduCoursePublishEdit',
        component: () => import('@/views/edu/course/publish'),
        meta: { title: '发布课程', noCache: true },
        hidden: true,
      },
    ],
  },
]

const router = new VueRouter({
  //mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
