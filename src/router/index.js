import Vue from 'vue'
import VueRouter from 'vue-router'
// import loginIndex from '@/views/login/loginV.vue'
import home from '@/views/home/homeV.vue'
import layOut from '@/views/home/layout/layOut.vue'
import QA from '@/views/home/qa/QA.vue'
import videoV from '@/views/home/video/VideoV.vue'
import MY from '@/views/home/my/MY.vue'
import SearchV from '@/views/home/search/search.vue'
import ArticleDetails from '@/components/articlr-item/ArticleDetails.vue'
import userProfile from '@/views/home//my/components/userProfile.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'loginIndex',
    component: () => import('@/views/login/loginV.vue')
  },
  {
    path: '/home',
    component: home,
    children: [
      { path: '/', redirect: '/layOut' },
      { path: '/layOut', component: layOut },
      { path: '/qa', component: QA },
      { path: '/video', component: videoV },
      { path: '/my', component: MY }
    ]
  },
  { path: '/search', component: SearchV },
  { path: '/articledetails/:articleid', component: ArticleDetails, props: true },
  { path: '/user/profile', component: userProfile }

// ————————————————
// 版权声明：本文为CSDN博主「aDiaoYa_」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/aDiaoYa_/article/details/129770401
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
