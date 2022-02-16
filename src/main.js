import { createApp } from 'vue'
import App from './App.vue'
// import store from './store'
import axios from 'axios'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { createPinia } from 'pinia'
import router from './router'

// Vue.use(VueRouter)

// Vue.component(`font-awesome-icon`, FontAwesomeIcon)

// Vue.config.productionTip = false
// Vue.config.devtools = true

const baseURL = `https://pohlfolio-backend.herokuapp.com/api/v1/`

const v1API = axios.create({
  baseURL,
  timeout: 0,
  withCredentials: false,
  headers: { 'X-User-Token': `LyNX7-R9JFBpy3doJzGg` },
  data: {
    outputType: `JSON`
  }
})

// app.provide(`$http`, v1API)

const app = createApp(App)
  .component(`font-awesome-icon`, FontAwesomeIcon)
  .use(createPinia())
  .use(router)

app.config.globalProperties.$http = v1API

library.add(faUserSecret)

app.mount(`#app`)

// new Vue({
//   render: (h) => h(App),
//   store
// }).$mount(`#app`)
