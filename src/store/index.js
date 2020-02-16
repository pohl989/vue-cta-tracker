import Vue from 'vue';
import Vuex from 'vuex'
import routes from './modules/routes'


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    routes,
  }
})