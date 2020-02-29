const state = {
  routes: []
}

const getters = {
  getRoutes: (state) => state.routes
}

const actions = {
  async fetchRoutes({ commit }) {
    await this._vm.$http.get('http://www.transitchicago.com/api/1.0/routes.aspx', { crossdomain: true }).then(res => {
      debugger // eslint-disable-line  
      commit('setRoutes', res.data)
    }).catch(err => {
      debugger // eslint-disable-line  

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
