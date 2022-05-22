import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'


export const constantRoutes = [
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
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/profile',
    component: Layout,
    redirect: '/profile/index',
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        meta: { title: 'Profile', icon: 'user', noCache: true }
      }
    ]
  }
]


/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        }
      }
    ]
  },
  /** when your routing map is too long, you can split it into small modules **/
  // componentsRouter,
  // chartsRouter,
  // nestedRouter,
  // tableRouter,
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true },
]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()


export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}


export default router
