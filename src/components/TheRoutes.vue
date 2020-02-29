<template>
  <div>
    Hello World Route Information
    <p v-for="route in getRoutes" :key="route.serviceId">{{route.Route}}</p>
    <TheSpinner />
    <TheIcon  icon="user-secret"/>
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