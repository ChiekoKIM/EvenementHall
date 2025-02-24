
import { createMemoryHistory, createRouter } from 'vue-router'


import HomeView from '../views/HomeView.vue'
import SimulationSalle from '../views/SimulationSalle.vue'
import Spaces from '../views/Spaces.vue'

const routes = [
  { path: '/', component: HomeView },
  { path: '/simulationsalle', component: SimulationSalle },
  { path: '/spaces', component: Spaces },
]

const router = createRouter({
  history: createMemoryHistory(),
  routes,
})

export default router;

