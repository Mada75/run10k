import Vue from "vue";
import Vuex from "vuex";
// import firebase bits
const fb = require("./firebaseConfig.js");

Vue.use(Vuex);

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit("setCurrentUser", user);
    store.dispatch("fetchUserProfile");
  }
});

// create store library, imported to main.js
export const store = new Vuex.Store({
  /*
  State is an object that holds all your global objects/arrays/variables for your app. It allows you to set the currentUser and 
  userProfile object as a global object for the app, so you can access its properties on multiple views.
  */
  state: {
    currentUser: null,
    userProfile: {}
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    }
  },
  actions: {
    // https://vuex.vuejs.org/guide/actions.html
    clearData({ commit }) {
      commit("setCurrentUser", null);
      commit("setUserProfile", {});
      // commit("setPosts", null);
      // commit("setHiddenPosts", null);
    },
    fetchUserProfile({ commit, state }) {
      fb.usersCollection
        .doc(state.currentUser.uid)
        .get()
        .then(res => {
          commit("setUserProfile", res.data());
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
