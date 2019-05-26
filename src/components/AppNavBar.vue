<template>
  <header id="nav-bar">
    <!-- start primary menu -->
    <nav id="primary-nav">
      <ul class="primary-menu">
        <!-- logo visible on all screens -->
        <li class="logo">
          <a href="https://adp-cv.firebaseapp.com/" target="_blank">
            <img src="../../public/ap-logo.png" />
          </a>
        </li>
        <li class="desktop" v-if="currentUser">
          <router-link :to="{ name: 'MyPlan' }" class="link"
            >My Plan</router-link
          >
        </li>
        <li class="desktop">
          <router-link :to="{ name: 'Home' }" class="link">Home</router-link>
        </li>

        <li class="desktop" v-if="!currentUser">
          <router-link :to="{ name: 'Login' }" class="link">Login</router-link>
        </li>

        <li class="desktop" v-if="currentUser">
          <a @click="logout" class="link">Logout</a>
        </li>
        <!-- toggle mobile menu -->
        <li class="toggle-mobile-menu">
          <a href="#" @click="toggleMobileMenu()">
            <fa-icon :icon="icon" class="icon" />
          </a>
        </li>
      </ul>
    </nav>
    <!-- end primary menu -->

    <!-- start mobile menu -->
    <nav id="mobile-nav" class="mobile-menu" v-show="mobileMenuOpen">
      <ul>
        <li class="mobile" @click="toggleMobileMenu()">
          <router-link :to="{ name: 'Home' }" class="link">Home</router-link>
        </li>

        <li class="mobile" v-if="currentUser" @click="toggleMobileMenu()">
          <router-link :to="{ name: 'MyPlan' }" class="link"
            >My Plan</router-link
          >
        </li>

        <li class="mobile" v-if="!currentUser" @click="toggleMobileMenu()">
          <router-link :to="{ name: 'Login' }" class="link">Login</router-link>
        </li>
        <li class="mobile" v-if="currentUser">
          <a @click="logout" class="link">Logout</a>
        </li>
      </ul>
    </nav>
    <!-- end start mobile menu -->
  </header>
</template>

<script>
import { mapState } from 'vuex'

const fb = require('../firebaseConfig.js')
export default {
  components: {},
  data() {
    return {
      mobileMenuOpen: false,
      icon: 'bars',
      myPlan: false
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    toggleMobileMenu() {
      if (this.mobileMenuOpen === false) {
        this.mobileMenuOpen = true
        this.icon = 'times'
      } else {
        this.mobileMenuOpen = false
        this.icon = 'bars'
      }
    },
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch('clearData')
          this.$router.push({ name: 'Home' })
          this.mobileMenuOpen = false
          this.icon = 'bars'
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
//@import '@/assets/scss/_layout.scss';
</style>
