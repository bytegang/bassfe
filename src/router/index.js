import Vue from 'vue'
import Router from 'vue-router'

import Profile from '@/components/User/Profile'
import Signup from '@/components/User/Signup'
import Signin from '@/components/User/Signin'
import Main from '@/components/Main'

import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [

    {
      path: '/login',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/main',
      name: 'Main',
      component: Main,
      beforeEnter: AuthGuard
    },

    {
      path: '/register',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile
    }
  ],
  mode: 'history'
})
