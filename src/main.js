import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

// import vue-firestore()
import VueFirestore from 'vue-firestore'

//use firestore()
Vue.use(VueFirestore)

// Import Firebase configuration
const fb = require('./firebaseConfig.js')
// Import scss files
import './assets/scss/app.scss'

Vue.config.productionTip = false

/*
set up the Firebase method
onAuthStateChanged. This will make sure Firebase initializes before loading the app when a user refreshes a page.
*/

// handle page reloads
let app
// eslint-disable-next-line no-unused-vars
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      render: h => h(App)
    })
  }
})
