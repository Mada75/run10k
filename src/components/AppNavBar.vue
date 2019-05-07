<template>
  <header id="navBar">
    <a href="https://adp-cv.firebaseapp.com/" target="_blank">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/adp-cv.appspot.com/o/base%2Fadam-logo.jpg?alt=media&token=2aa71b01-e382-4c1e-b29f-184a44b73e3a"
      />
    </a>
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }" class="link">Home</router-link>
      </li>
      <!--       <li>
        <router-link :to="{name:'test'}" class="link">Test</router-link>
      </li>
 -->
      <li v-if="!currentUser">
        <router-link :to="{ name: 'Login' }" class="link">Login</router-link>
      </li>
      <li v-if="currentUser">
        <router-link :to="{ name: 'MyPlan' }" class="link">My Plan</router-link>
      </li>
      <!--       <li v-if="currentUser">
        <router-link :to="{name: 'Settings'}" class="link">Settings</router-link>
      </li>
 -->
      <li v-if="currentUser">
        <a @click="logout" class="link">
          Logout
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
import { mapState } from 'vuex'

const fb = require('../firebaseConfig.js')
export default {
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('clearData')
          this.$router.push({ name: 'Home' })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped></style>
