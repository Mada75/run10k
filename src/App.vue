<template>
  <div id="app">
    <app-nav-bar/>
<!--     <app-nav-bar-1/>
 -->    <router-view/>
    <app-footer/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import AppNavBar from './components/AppNavBar.vue'
import AppNavBar1 from './components/AppNavBar1.vue'
import AppFooter from './components/AppFooter.vue'
export default {
  components: { AppNavBar, AppNavBar1, AppFooter },
  // mapState is a Vuex helper that lets you access properties on your state object
  // without having to type them manually each time you need to reference them.
  computed: {
    ...mapState(['currentUser'])
  }
}
</script>
<style lang="scss" scoped></style>
