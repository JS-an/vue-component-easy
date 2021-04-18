import Vue from 'vue'
import App from './App.vue'
import { VueNumberEasy } from "../packages/index.js"
Vue.use(VueNumberEasy)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
