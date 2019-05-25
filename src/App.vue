<template>
  <div id="app">
    <app-nav-bar/>
    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppNavBar from './components/AppNavBar.vue'
import UserNavBar from './components/UserNavBar.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  components: { AppNavBar, UserNavBar, AppFooter },
  // mapState is a Vuex helper that lets you access properties on your state object
  // without having to type them manually each time you need to reference them.
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
<style lang="scss" scoped></style>
