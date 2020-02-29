import Vue from 'vue'
import App from './App.vue'
import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.config.devtools = true

const ctaBaseURL = "https://pohlfolio-backend.herokuapp.com/api/v1/"
Vue.use(SuiVue);


const v1API = axios.create({
    baseURL: `${ctaBaseURL}`,
    timeout: 0,
    withCredentials: false,
    headers: {auth: 'blah'},
    data: {
      outputType: 'JSON'
    },
  });


Vue.prototype.$http = v1API

new Vue({
  render: h => h(App),
  store,
}).$mount('#app')