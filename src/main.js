import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Vuetify from 'vuetify'
import App from './App.vue'
import Home from './components/home/Home.vue'
import Index from './components/Index.vue'
import Perfil from './components/usuario/Perfil.vue'
import Login from './components/Login.vue'
import CadastroFilme from './components/filme/CadastroFilme.vue'
import Dashboard from './components/Admin.vue'
import VueVideoPlayer from 'vue-video-player'
import VeeValidate from 'vee-validate'
import Registrar from './components/Registrar.vue'
import Cinema from './components/cinema/Cinema.vue'
import Meus from './components/meus/Meu.vue'
import VueMask from 'v-mask'

Vue.use(VueMask)
Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuetify)
Vue.use(VueVideoPlayer)
Vue.use(VeeValidate)

Vue.http.headers.common['Authorization'] = localStorage.getItem('iflix-user-token')
const routes = [
  {
    path: '/login',
    component: Login,
    meta: {
      requireAuth: true
    }
  },

  {
    path: '/registrar',
    component: Registrar
  },
  {
    path: '/',
    component: Index,
    redirect: '/home',
    meta: {
      requireAuth: true
    },
    children: [
      {
        path: 'dashboard',
        component: Dashboard
      },
      {
        path: 'home',
        component: Home
      },
      {
        path: 'perfil',
        component: Perfil
      },
      {
        path: 'filme',
        component: CadastroFilme
      },
      {
        path: 'genero/:nomegenero',
        component: Home
      },
      {
        path: 'search/:nome',
        component: Home
      },
      {
        path: 'watch/:tipo/:id',
        component: Cinema
      },
      {
        path: ':nomeusuario/minha-lista',
        component: Meus
      },
      {
        path: '/:nomeusuario/perfil',
        component: Perfil
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    let jwtDecode = require('jwt-decode')
    let token = localStorage.getItem('iflix-user-token')
    if (token !== null) {
      let decoded = jwtDecode(token)
      if ((decoded.exp - Math.round(new Date().getTime() / 1000) <= 0)) {
        localStorage.removeItem('iflix-user-token')
        next({
          path: '/login'
        })
      } else if (to.fullPath === '/login') {
        next({
          path: '/home'
        })
      } else {
        next()
      }
    } else {
      if (token === null && to.fullPath !== '/login') {
        next({
          path: '/login'
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({

  el: '#app',
  router,

  render: h => h(App)
})
