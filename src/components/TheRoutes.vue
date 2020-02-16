<template>
  <div>
    Hello World Route Information
    <p v-for="route in getRoutes" :key="route.serviceId">{{route.Route}}</p>


  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "TheRoutes",
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