import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store'
import Vuetify from 'vuetify'
import * as firebase from 'firebase'
import 'vuetify/dist/vuetify.min.css'
import AlertComp from './components/Shared/Alert'

Vue.use(Vuetify)

Vue.config.productionTip = false
Vue.component('app-lert', AlertComp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created () {
    //inicializa o firebase
    firebase.initializeApp({
      apiKey: 'AIzaSyCYFmczTV25iXT0Dxqvsm0ALTA1BivOQGU',
      authDomain: 'meetup-yt-course.firebaseapp.com',
      databaseURL: 'https://meetup-yt-course.firebaseio.com',
      projectId: 'meetup-yt-course',
      storageBucket: 'gs://meetup-yt-course.appspot.com'
    })
    //monitora o estado de logado do usuario, se existir towken chama a action do Vuex
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
    //Chama a action do Vuex para carregar os meetups
    this.$store.dispatch('loadingMeetups')
  }
})
