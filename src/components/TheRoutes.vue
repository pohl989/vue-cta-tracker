<template>
  <div>
    <h1>CTA Train Tracker</h1>
    <h2>1. Select A Train Line</h2>    
    <div v-if="!isLoading">
      <TheSpinner />
    </div>
    <div v-else class="train-selection-buttons">
      <button 
        v-for="train in trains" 
        :key="train.code"
        class="line-button"
        :class="{'active': train.code === selectedTrain}" 
        @click="updateSelectedTrain(train.code)"
      >
        {{train.name}}
      </button>
    </div>
    <h2>2. Select A Station</h2>    

    <div v-if="!this.selectedTrain">
      Please select Train Line first
    </div>
    <div v-else>
      <!-- <sui-dropdown
        placeholder="Station"
        selection
        :options="stationSelectionList"
        :prompt="'select a station...'"
        v-model="mapId"
        @click.native="getUpdate"
      /> -->
      <div> 
        <h3 v-if="!!selectedStation">Station - {{this.selectedStation.station_name}}</h3>
       <TrainArrival v-for="arrival in getArrivals" :arrival="arrival" :key="arrival.run_number" /> 
      </div>
    </div>
  </div>
</template>

<script>
import TheSpinner from './TheSpinner'
import TrainArrival from './TrainArrival'
import TrainLineSelection from './TrainLineSelection'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: "TheRoutes",
  components: { TheSpinner, TrainArrival },
  data: function(){
    return {
      isLoading: true, 
      errMessage: "",
      hasError: false,
      trains: [],
      selectedTrain: "", 
      stations: [],
      selectedTrainStations: [],
      mapId: null, 
      selectedStation: {},
    }
  },
  methods: {
    ...mapActions(['fetchStations', 'fetchArrivals']),
    updateSelectedTrain: function(code) {
      this.selectedTrain = code
      this.getStations()
    },
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
    ...mapGetters(['getTrains', 'getArrivals']),
    stationSelectionList: function() {
      const list = this.selectedTrainStations.map(station => {
        const text = station.station_name 
        const value = station.map_id
        return { text, value }
      })
      return list
    },
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

<style scoped>
  h2 {
    text-align: left;
  }

  .train-selection-buttons {
    display: flex; 
    flex-wrap: wrap-reverse;
    align-content: center;
    justify-content: center;
    padding: 20px;
  }
</style>