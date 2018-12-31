//Arquivo de rotas da aplicacao
import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Profile from '@/components/User/Profile'
import Signin from '@/components/User/Signin'
import Signup from '@/components/User/Signup'
import Createmeetup from '@/components/Meetup/Createmeetup'
import Meetup from '@/components/Meetup/Meetup'
import Meetups from '@/components/Meetup/Meetups'
import AuthGuard from './auth-guard' // Funcao para verificar de usuario esta autenticado

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/meetup/new',
      name: 'Creatmeetup',
      component: Createmeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetup/:id',
      name: 'Meetup',
      props: true,
      component: Meetup
    },
    {
      path: '/meetups',
      name: 'Meetups',
      component: Meetups
    }
  ],
  mode: 'history'
})
