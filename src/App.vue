<template>
  <div id="app">
    <app-nav-bar v-if="currentUser"></app-nav-bar>
    <router-view />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppNavBar from "./components/AppNavBar.vue";
export default {
  components: { AppNavBar },
  // mapState is a Vuex helper that lets you access properties on your state object
  // without having to type them manually each time you need to reference them.
  computed: {
    ...mapState(["currentUser"])
  }
};
</script>
