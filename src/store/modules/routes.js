import axios from 'axios'

const state = {
  routes: []
}

const getters = {
  getRoutes: (state) => state.routes
}

const actions = {
  async fetchRoutes({ commit }) {
    await axios.get('http://www.transitchicago.com/api/1.0/routes.aspx').then(res => {
      commit('setRoutes', res.data)
    }).catch(err => {
      console.log(err)
    })
  }
}

const mutations = {
  setRoutes: (state, routes) => (state.routes = routes),
}

export default {
  state, getters, actions, mutations
}
