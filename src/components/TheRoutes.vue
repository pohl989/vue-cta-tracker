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
    <select v-model="mapId" @change="getStation" >
      <option 
        v-for="station in selectedTrainStations" 
        :key="station.map_id" 
        :value="station.map_id"
      >
        {{station.station_name}}
      </option>
    </select>
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
      this.mapId = this.stations.filter(station => station[this.selectedTrain])
    },
    getStation: function() {
      this.mapId = this.stations.find(station => station[this.mapId])
    }
  },
  computed: {
    ...mapGetters(['getTrains'])
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