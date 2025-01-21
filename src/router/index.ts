
import { createMemoryHistory, createRouter } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import Test from '../views/Test.vue'
import Simulation from '../views/Simulation.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/test', component: Test },
  { path: '/simulation', component: Simulation },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;

