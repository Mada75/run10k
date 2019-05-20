<template>
  <header id="nav-bar">
    <a href="https://adp-cv.firebaseapp.com/" target="_blank">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/adp-cv.appspot.com/o/base%2Fadam-logo.jpg?alt=media&token=2aa71b01-e382-4c1e-b29f-184a44b73e3a"
      />
    </a>
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }" class="link">HomeLARGE</router-link>
      </li>
      <li v-if="!currentUser">
        <router-link :to="{ name: 'Login' }" class="link">Login</router-link>
      </li>
      <li v-if="currentUser">
        <router-link :to="{ name: 'MyPlan' }" class="link">My Plan</router-link>
      </li>
      <li v-if="currentUser">
        <a @click="logout" class="link">Logout</a>
      </li>
    </ul>
    <!--     <div v-show="navBarHidden" class="small-nav" :class="{ 'nav-sm': toggleMenu }">
      <a href="https://adp-cv.firebaseapp.com/" target="_blank">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/adp-cv.appspot.com/o/base%2Fadam-logo.jpg?alt=media&token=2aa71b01-e382-4c1e-b29f-184a44b73e3a"
        >
      </a>

      <div @click="toggleBurgerMenu()" class="burger link">
        {{ menu }}
        <fa-icon :icon="icon" style="margin-left:1px;"/>
      </div>
      <ul v-show="navMenuOpen">
        <li>
          <router-link :to="{ name: 'Home' }" class="link" @click="toggleBurgerMenu">Home</router-link>
        </li>
        <li v-if="!currentUser">
          <router-link :to="{ name: 'Login' }" class="link" @click="toggleBurgerMenu">Login</router-link>
        </li>
        <li v-if="currentUser">
          <router-link :to="{ name: 'MyPlan' }" class="link" @click="toggleBurgerMenu">My Plan</router-link>
        </li>
        <li v-if="currentUser">
          <a @click="logout">Logout</a>
        </li>
      </ul>
    </div>
 -->
  </header>
</template>

<script>
import { mapState } from 'vuex'

const fb = require('../firebaseConfig.js')
export default {
  data() {
    return {
      navMenuOpen: false,
      largeDisplay: true,
      navBarHidden: true,
      windowWidth: 0,
      icon: 'bars',
      menu: 'Menu'
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth)

      this.getWindowWidth() // Calls width method
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
  },
  computed: {
    toggleMenu() {
      let self = this
      if (this.windowWidth <= 1800) {
        return (self.navBarHidden = false)
      } else {
        return (self.navBarHidden = true)
      }
    },
    ...mapState(['currentUser'])
  },
  methods: {
    getWindowWidth() {
      // windowWidth function
      this.windowWidth = document.documentElement.clientWidth
    },
    toggleBurgerMenu() {
      this.navMenuOpen = !this.navMenuOpen
      if (this.navMenuOpen) {
        this.icon = 'times'
        this.menu = 'Close'
      } else {
        this.icon = 'bars'
        this.menu = 'Menu'
      }
    },
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
