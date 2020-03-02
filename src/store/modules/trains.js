const state = {
  trains: [],
  stations: [],
  arrivals: [],
}

const getters = {
  getTrains: (state) => state.trains,
  getStations: (state) => state.stations, 
  getArrivals: (state) => state.arrivals
}

const actions = {
  fetchTrains ({ commit }) {
    const http = this._vm.$http 
    return new Promise((resolve, reject) => {
      http.get('/trains', { crossdomain: true }).then(response => {
        commit('setTrains', response.data)
        resolve(response) 
      }).catch(error => {
        reject(error) 
      })
    })
  },
  fetchStations ({ commit }, filters) {
    const http = this._vm.$http 
    return new Promise((resolve, reject) => {
      http.get('/stations', {params: filters}).then(response => {
        commit('setStations', response.data)
        resolve(response) 
      }).catch(error => {
        reject(error) 
      })
    })
  },
  fetchArrivals ({commit}, filters) {
    const http = this._vm.$http 
    return new Promise((resolve, reject) => {
      http.get('/train_tracker', {params: filters}).then(response => {
        commit('setArrivals', response.data)
        resolve(response) 
      }).catch(error => {
        reject(error) 
      })
    })
  }

}

const mutations = {
  setTrains: (state, trains) => (state.trains = trains),
  setStations: (state, stations) => (state.stations = stations),
  setArrivals: (state, arrivals) => (state.arrivals = arrivals),
}

export default {
  state, getters, actions, mutations
}
