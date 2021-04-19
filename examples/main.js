import Vue from 'vue'
import App from './App.vue'
import VueComponentEasy from "../packages/index"
Vue.use(VueComponentEasy)
console.log(window)

Vue.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
