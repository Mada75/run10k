import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'

import Home from '@/views/Home'
import Login from '@/views/Login'
import Dashboard from '@/views/test/Dashboard'
import UserPlan from '@/views/UserPlan'
import Settings from '@/views/test/Settings'
import Error404 from '@/views/Error404.vue'
import Test from '@/views/test/Test.vue'

Vue.use(Router)

const router = new Router({
  // History mode allows us to use more readable url paths (/dashboard) as opposed to the default option (/#/dashboard).
  mode: 'history',
  routes: [
    // Create a catchall route to handle incorrect routes.
    {
      path: '*',
      redirect: '/404'
    },
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/test',
      name: 'test',
      component: Test
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/myplan',
      name: 'MyPlan',
      component: UserPlan,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/404',
      name: '404',
      component: Error404
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    if (to.hash) {
      return { selector: to.hash }
    }
    return { x: 0, y: 0 }
  }
})

/*
Step 6: Set up the 'beforeEach' navigation guard.
Check if the route exists and requires authentication. Then create a reference to the current user and authenticate routes.
If the route has the 'requiresAuth' meta property set to true and the user is not logged in, redirect them to the home view. 
If the route has the 'requiresAuth' meta property set to true and and the user is logged in, send them to whatever route they are trying to visit.
For else, you just send them to whatever route they are trying to visit; this only fires if the route doesn't require authentication.
*/

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser
  // redirect to home if needs auth & not logged in
  if (requiresAuth && !currentUser) {
    next({ name: 'Home' })
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
