import VueRouter from 'vue-router'
import Login from './Login'
import Home from './Home'
import Index from './Index'

const routes = [
    {path: '/login', component: Login},
    {path: '/', component: Index, meta: {requireAuth: true}, children: [{path: 'home', component: Home}]}
]

export default new VueRouter({
  routes
})
