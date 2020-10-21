import Vue from 'vue'
import App from './App.vue'
import router from './router'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import store from './store'
import axios from 'axios'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { url } from '../src/helper/env'

import VueCharts from 'vue-chartjs'

axios.defaults.baseURL = url

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueCharts)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
