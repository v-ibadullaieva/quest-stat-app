import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import MainPage from './components/MainPage.vue'
import QuestInfo from './components/QuestInfo'

Vue.use(VueRouter)
Vue.config.productionTip = false

const routes = [
  { path: '/', component: MainPage },
  { path: '/quest/:id', component: QuestInfo },
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
