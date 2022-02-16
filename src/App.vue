<template>
  <div>
    <div id="nav">
      <!-- <router-link to="/">Routes</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <router-view />
    <TheRoutes />
  </div>
</template>

<script>
// !TODO move to the store
import TheRoutes from './components/TheRoutes.vue'

export default {
  name: `App`,
  components: {
    TheRoutes
  }
}
</script>

<style>
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #1b1c1d;
  height: 100%;
}
</style>
