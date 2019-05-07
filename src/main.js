import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

// import vue-firestore()
import VueFirestore from 'vue-firestore'

// import fontawesome https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faCoffee,
  faUserSecret,
  faComment,
  faCheck,
  faTimes,
  faRedo,
  faRunning,
  faShoePrints,
  faHome,
  faUsersCog,
  faSignOutAlt,
  faQuestion,
  faSave,
  faTrashAlt
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(
  faCoffee,
  faUserSecret,
  faComment,
  faCheck,
  faTimes,
  faRedo,
  faRunning,
  faShoePrints,
  faHome,
  faUsersCog,
  faSignOutAlt,
  faQuestion,
  faSave,
  faTrashAlt
)
Vue.component('fa-icon', FontAwesomeIcon)

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
