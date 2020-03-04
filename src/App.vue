<template>
  <div id="app">
    <TheRoutes />
  </div>
</template>

<script>
import TheRoutes from './components/TheRoutes.vue'

export default {
  name: 'App',
  components: {
    TheRoutes
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #1b1c1d;
  height: 100%;
}

body {
}
</style>
