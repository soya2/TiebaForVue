import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageDetail from '../views/pagedetail.vue'
import ErrorPage from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Home },
  { path: '/page/:id', component: PageDetail },
  { path: '*', component: ErrorPage}
]

const router = new VueRouter({
  routes
})

export default router
