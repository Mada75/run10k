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
    performingRequest: false
  },
  mutations: {
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
