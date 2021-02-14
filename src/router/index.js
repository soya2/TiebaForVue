import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PageDetail from '../views/pagedetail.vue'
import searchPage from '../views/worksSearch.vue'
import ChartsPage from '../views/charts.vue'
import ErrorPage from '../views/404.vue'

Vue.use(VueRouter)
const originalPath = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPath.call(this, location).catch((err) => err)
}

const routes = [
  { path: '/', component: Home },
  { path: '/page/:id', component: PageDetail },
  { path: '/search', component: searchPage },
  { path: '/wiki/:id', component: ChartsPage },
  { path: '*', component: ErrorPage }
]

const router = new VueRouter({
  routes
})

export default router
