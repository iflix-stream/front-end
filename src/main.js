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
    {
        path: '/login',
        component: Login,
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/',
        component: Index,
        meta: {
            requireAuth: true
        },
        children: [
            {
                path: 'dashboard',
                component :Dashboard
            },
            {
                path: 'home',
                component : Home
            }
        ]
    }
]

Vue.prototype.$apiUrl = 'http://localhost/iFlix/api'


const router = new VueRouter({
    routes
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) {
        var jwtDecode = require('jwt-decode')
        var token = localStorage.getItem('iflix-user-token')
        if (token !== null) {
            var decoded = jwtDecode(token)
            if ((decoded.exp - Math.round(new Date().getTime() / 1000) <= 0)) {
                localStorage.removeItem('iflix-user-token')
                next({
                    path: '/login'
                })
            }
            else if (to.fullPath === '/login') {
                next({
                    path: '/home'
                })
            }
            else{
                next()
            }
        }
        else {
            if (token === null && to.fullPath !== '/login') {
                next({
                    path: '/login'
                })
            }
            else {
                next()
            }
        }
    }
    else {
        next()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
