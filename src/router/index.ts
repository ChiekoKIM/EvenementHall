
import { createMemoryHistory, createRouter } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import Test from '../views/Test.vue'
import SimulationSalle from '../views/SimulationSalle.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/test', component: Test },
  { path: '/simulationsalle', component: SimulationSalle },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;

