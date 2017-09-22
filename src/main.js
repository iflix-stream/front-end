import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import 'vuetify/dist/vuetify.min.css'
import App from './App.vue'
import Home from './components/Home.vue'
import Index from './components/Index.vue'
import Login from './components/Login.vue'
import Welcome from './components/Welcome.vue'
import Dashboard from './components/Dashboard.vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuetify)

const routes = [
  {path: '/login', component: Login},
  {path: '/', component: Index, meta: {requireAuth: true}},
  {path: '/in', component: Welcome, meta: {requireAuth: true}, children: [{path: 'home', component: Home}]},
  {path: '/dashboard', component: Dashboard, meta: {requireAuth: true}, children: [{path: 'home', component: Home}]}
]

Vue.prototype.$apiUrl = 'http://localhost/iFlix/api'

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    if (!localStorage.getItem('iflix-user-token')) {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
