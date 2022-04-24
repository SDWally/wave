import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'


const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'Home',
        meta: { title: 'Home', icon: 'dashboard', affix: true }
      }
    ],
  },
  {
    path: '/stock',
    component: Layout,
    redirect: '/stock/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/stock/index'),
        name: 'Stock',
        meta: { title: 'Stock', icon: 'dashboard', affix: true }
      }
    ],
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/index/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/index/index'),
        name: 'Index',
        meta: { title: 'Index', icon: 'dashboard', affix: true }
      }
    ],
  },
  {
    path: '/industry',
    component: Layout,
    redirect: '/industry/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/industry/index'),
        name: 'Industry',
        meta: { title: 'Industry', icon: 'dashboard', affix: true }
      }
    ],
  },
  {
    path: '/about',
    component: Layout,
    // redirect: '/about/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/About'),
        name: 'About',
        meta: { title: 'About', icon: 'dashboard', affix: true }
      }
    ],
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
}
]

const router = new VueRouter({
  routes
})

export default router
