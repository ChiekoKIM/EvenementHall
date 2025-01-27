
import { createMemoryHistory, createRouter } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import Test from '../views/Test.vue'
import Simulation from '../views/Simulation.vue'
import Simulation2 from '../views/Simulation2.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/test', component: Test },
  { path: '/simulation', component: Simulation },
  { path: '/simulation2', component: Simulation2 },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;

