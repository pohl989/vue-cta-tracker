/*
import { format } from 'date-fns'

const state = {
  trains: [],
  stations: [],
  arrivals: []
}

const getters = {
  getTrains: (state) => state.trains,
  getStations: (state) => state.stations,
  getArrivals: (state) =>
    state.arrivals.map((arrival) => {
      const prediction_generated = new Date(arrival.prdt)
      const destination = arrival.destNm
      const arrival_time = format(new Date(arrival.arrT), `p`)
      const stop_destination = arrival.stpDe
      const run_number = arrival.rn
      return {
        prediction_generated,
        destination,
        arrival_time,
        stop_destination,
        run_number
      }
    })
}

const actions = {
  fetchTrains({ commit }) {
    const http = this._vm.$http
    return new Promise((resolve, reject) => {
      http
        .get(`/trains`, { crossdomain: true })
        .then((response) => {
          commit(`setTrains`, response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchStations({ commit }, filters) {
    const http = this._vm.$http
    return new Promise((resolve, reject) => {
      http
        .get(`/stations`, { params: filters })
        .then((response) => {
          commit(`setStations`, response.data)
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  fetchArrivals({ commit }, params) {
    const http = this._vm.$http
    return new Promise((resolve, reject) => {
      http
        .get(`/train_tracker`, { params: params })
        .then((response) => {
          if (response.data.ctatt && response.data.ctatt.eta) {
            commit(`setArrivals`, response.data.ctatt.eta)
          }
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

const mutations = {
  setTrains: (state, trains) => (state.trains = trains),
  setStations: (state, stations) => (state.stations = stations),
  setArrivals: (state, arrivals) => (state.arrivals = arrivals)
}

export default {
  state,
  getters,
  actions,
  mutations
}
*/
