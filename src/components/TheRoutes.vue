<template>
  <div>
    Hello World Route Information
    <p v-for="route in getRoutes" :key="route.serviceId">{{route.Route}}</p>
    <TheSpinner />
    <TheIcon  icon="user-secret"/>
    <div is="sui-segment" inverted>
      <sui-button basic color="red" inverted>Basic Red</sui-button>
      <sui-button basic color="orange" inverted>Basic Orange</sui-button>
      <sui-button basic color="yellow" inverted>Basic Yellow</sui-button>
      <sui-button basic color="olive" inverted>Basic Olive</sui-button>
      <sui-button basic color="green" inverted>Basic Green</sui-button>
      <sui-button basic color="teal" inverted>Basic Teal</sui-button>
      <sui-button basic color="blue" inverted>Basic Blue</sui-button>
      <sui-button basic color="violet" inverted>Basic Violet</sui-button>
      <sui-button basic color="purple" inverted>Basic Purple</sui-button>
      <sui-button basic color="pink" inverted>Basic Pink</sui-button>
      <sui-button basic color="brown" inverted>Basic Brown</sui-button>
      <sui-button basic color="grey" inverted>Basic Grey</sui-button>
      <sui-button basic color="black" inverted>Basic Black</sui-button>
    </div>  
  </div>
</template>

<script>
import TheSpinner from './TheSpinner'
import TheIcon from './TheIcon'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: "TheRoutes",
  components: { TheSpinner, TheIcon },
  methods: {
    ...mapActions(['fetchRoutes']),
  },
  computed: {
    ...mapGetters(['getRoutes'])
  },
  created(){
    this.fetchRoutes()
  }
}
</script>

<style>

</style>