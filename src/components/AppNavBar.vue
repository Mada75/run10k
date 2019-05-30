<template>
  <header id="nav-bar">
    <!-- start primary menu -->
    <nav id="primary-nav">
      <ul class="primary-menu">
        <!-- logo visible on all screens -->
        <li class="logo">
          <a href="https://adp-cv.firebaseapp.com/" target="_blank">
            <img src="../../public/ap-logo.png">
          </a>
        </li>
        <li class="desktop" v-if="currentUser">
          <router-link :to="{ name: 'MyPlan' }" class="link">My Plan</router-link>
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
        <li class="toggle-mobile-menu" @click="toggleMobileMenu()">
          <a>
            <fa-icon :icon="icon" class="icon"/>
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
          <router-link :to="{ name: 'MyPlan' }" class="link">My Plan</router-link>
        </li>

        <li class="mobile" v-if="!currentUser" @click="toggleMobileMenu()">
          <router-link :to="{ name: 'Login' }" class="link">Login</router-link>
        </li>
        <li class="mobile" v-if="currentUser">
          <a @click="logout" class="link">Logout</a>
        </li>
      </ul>
      <ul v-if="currentUser" id="href-week">
        <li v-for="(week, index) in weekNumber" :key="index" @click="toggleMobileMenu()">
          <a :href="`#weekNo${week}`">
            Week
            <br>
            {{ week }}
          </a>
        </li>
      </ul>
    </nav>
    <div class="bg-image"></div>
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
  created() {
    this.weekNumber = [1, 2, 3, 4, 5, 6, 7, 8]
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
#href-week {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  flex-wrap: wrap;
  text-align: center;
  border-top: 1px solid orange;
  background: rgba(21, 29, 52, 1);

  a {
    line-height: 24px;
    background: rgba(21, 29, 52, 1);
    filter: brightness(130%);
    margin: 0.25rem 0.25rem;
  }
}
.bg-image {
  background-image: url('https://peaksport.nz/wp-content/uploads/2018/09/ultra-running-banner-peak.jpg');
  background-size: cover; // always take up 100% available space
  background-position: center top; // center image as will move depending on screen width
  background-repeat: repeat;
  height: 202px;
  position: absolute;
  top: 48px;
  right: 0;
  width: 100%;
  z-index: -1;
}
</style>
