import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: `/routes/:routeId`,
    name: `Route`,
    component: () =>
      import(/* webpackChunkName: "Station" */ `../views/CtaRoute.vue`)
  },
  {
    path: `/stations/:stationId`,
    name: `Station`,
    // route level code-splitting
    // this generates a separate chunk (Station.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Station" */ `../views/CtaStation.vue`)
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
