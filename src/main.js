import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import { store } from './store'
import SharedAlert from './components/Shared/Alert.vue'

Vue.config.productionTip = false
Vue.component('app-alert', SharedAlert)

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App),
  created () {
     }
}).$mount('#app')
