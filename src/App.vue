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
<!--

<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
