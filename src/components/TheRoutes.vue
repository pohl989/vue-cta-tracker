<template>
  <div>
    I love my Chico
    <TheSpinner />
      <sui-icon name="heart" color="red" inverted />
      <sui-icon name="heart" color="orange" inverted />
      <sui-icon name="heart" color="violet" inverted />
      <sui-icon name="heart" color="purple" inverted />
      <sui-icon name="heart" color="pink" inverted />    
    <div is="sui-segment" inverted>
      <sui-button basic color="red" inverted>Get Routes</sui-button>
      <sui-button basic color="teal" inverted>Get </sui-button>
      <sui-button basic color="purple" inverted>Basic Purple</sui-button>
      <sui-button basic color="pink" inverted>Basic Pink</sui-button>
    </div>  
    <label>Trains </label>
    <select v-model="selectedTrain" @change="getStations" >
      <option 
        v-for="train in trains" 
        :key="train.code" 
        :value="train.code"
      >
        {{train.label}}
      </option>
    </select>
    <label>Stations </label>
    <select v-model="mapId" @change="getUpdate" >
      <option 
        v-for="station in selectedTrainStations" 
        :key="station.map_id" 
        :value="station.map_id"
      >
        {{station.station_name}}
      </option>
    </select>
    <div v-if="!this.selectedStation">
      Please select Train and Station 
    </div>
    <div v-else> 
      <h3>Station - {{this.selectedStation.station_name}}</h3>
      <h4>{{this.getArrivals["tmst"]}}</h4>
      <ul>
        <li v-for="arrival in getArrivals['eta']" :key="arrival['rn']" >
          <h5>
            {{arrival["stpDe"]}}
          </h5>
          <p>
            {{arrival["arrT"]}}
          </p>
          <p>
            {{arrival["prdt"]}}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TheSpinner from './TheSpinner'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: "TheRoutes",
  components: { TheSpinner },
  data: function(){
    return {
      isLoading: true, 
      errMessage: "",
      hasError: false,
      trains: [],
      selectedTrain: null, 
      stations: [],
      selectedTrainStations: [],
      mapId: null, 
      selectedStation: {},
    }
  },
  methods: {
    ...mapActions(['fetchStations', 'fetchArrivals']),
    getStations: function() {
      const stationMapIds = this.stations.filter(station => station[this.selectedTrain]).map(station => station.map_id)
      const mapIds = [ ...new Set(stationMapIds)] 
      const stations = mapIds.map(id => {
        return this.stations.find(station => station.map_id === id)
      })
      this.selectedTrainStations = stations
    },
    getUpdate: function() {
      this.getStation()
      this.fetchArrivals({mapid: this.mapId})
    },
    getStation: function() {
      this.selectedStation = this.stations.find(station => station.map_id === this.mapId)
    }
  },
  computed: {
    ...mapGetters(['getTrains', 'getArrivals'])
  },
  mounted() {
    const vue = this
    this.$store
      .dispatch('fetchTrains')
      .then((res) => {
        vue.isLoaded = true
        vue.trains = res.data
      })
      .catch(error => {
        vue.isLoaded = true
        vue.hasError = true
        vue.errMessage = error.message
      })
    this.$store
      .dispatch('fetchStations')
      .then((res) => {
        vue.isLoaded = true
        vue.stations = res.data
      })
      .catch(error => {
        vue.isLoaded = true
        vue.hasError = true
        vue.errMessage = error.message
      })
  }
}
</script>

<style>

</style>