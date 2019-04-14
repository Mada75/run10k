import Vue from 'vue'
import Vuex from 'vuex'
// import firebase bits
const fb = require('./firebaseConfig.js')
import { db } from './firebaseConfig.js'

Vue.use(Vuex)

// handle page reload

fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user)
    store.dispatch('fetchUserProfile')

    //  let createdByCurrentUser = store.state.currentUser.uid
  }
})

// create store library, imported to main.js
export const store = new Vuex.Store({
  /*
  State is an object that holds all your global objects/arrays/variables for your app. It allows you to set the currentUser and 
  userProfile object as a global object for the app, so you can access its properties on multiple views.
  */
  state: {
    // used to control created() methods
    created: 0,
    currentUser: null,
    userProfile: {},
    homeCalendar: [],
    master: [],
    performingRequest: false,
    userPlan: []
  },
  getters: {
    getUserPlan: state => {
      return state.userPlan
    },
    weekOne: state => {
      return state.userPlan.slice(0, 7)
    },
    weekTwo: state => {
      return state.userPlan.slice(7, 14)
    },
    weekThree: state => {
      return state.userPlan.slice(14, 21)
    },
    weekFour: state => {
      return state.userPlan.slice(21, 28)
    },
    weekFive: state => {
      return state.userPlan.slice(28, 35)
    },
    weekSix: state => {
      return state.userPlan.slice(35, 42)
    },
    weekSeven: state => {
      return state.userPlan.slice(42, 49)
    },
    weekEight: state => {
      return state.userPlan.slice(49, 56)
    }
  },
  mutations: {
    // sets 'userPlan' to 'userWeeks' array
    setUserPlan(state, userWeeks) {
      state.userPlan = userWeeks
      console.log('got it!')
    },
    setCurrentUser(state, val) {
      state.currentUser = val
    },
    setMaster(state, val) {
      state.master.push(val)
    },
    setUserProfile(state, val) {
      state.userProfile = val
    },
    modalDailySwitch(state) {
      state.homeCalendar = 'hello'
    },
    // used to control created() methods

    stopCreated(state) {
      state.created += 1
    },
    performingReq(state) {
      state.performingRequest = true
    },
    stoppingReq(state) {
      state.performingRequest = false
    }
  },

  // https://vuex.vuejs.org/guide/actions.html
  actions: {
    // get user plan
    userPlan(context, uid) {
      console.log('getting user data')
      // create empty to store day objects
      let userWeeks = []
      db.collection('users')
        .doc(uid)
        .collection('10k')
        .orderBy('dayId', 'asc')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // push each doc into 'userWeeks' Array
            userWeeks.push(doc.data())
          })
        })
        .catch(function(error) {
          console.log(error)
        })
      // fire 'setUserPlan' pass in 'userWeeks' array
      store.commit('setUserPlan', userWeeks)
    },
    getMaster({ commit, state }) {
      if (state.created === 1) {
        db.collection('10k-master')
          .orderBy('dayId', 'asc')
          .limit(7)
          .get()
          .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              console.log(doc.id, ' => ', doc.data())
              commit('setMaster', doc.data())
              commit('stoppingReq')
            })
          })
          .catch(function(error) {
            console.log('Error getting documents: ', error)
          })
      } else {
        console.log('nah')
        commit('stoppingReq')
      }
    },
    performingRequest({ commit }) {
      commit('performingReq')
    },
    // used to control created() methods
    limitCreated({ commit }) {
      commit('stopCreated')
    },
    clearData({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      // commit("setPosts", null);
      // commit("setHiddenPosts", null);
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit('setUserProfile', res.data())
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
})
