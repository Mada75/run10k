<template>
  <header>
    <nav>
      <ul>
        <li class="logo">
          <a href="https://adp-cv.firebaseapp.com/" target="_blank">
            <img src="../../public/ap-logo.png">
          </a>
        </li>
        <li class="home">
          <router-link :to="{ name: 'Home' }" class="link">Home</router-link>
        </li>

        <li v-if="currentUser">
          <router-link :to="{ name: 'MyPlan' }" class="link">My Plan</router-link>
        </li>

        <li v-if="!currentUser">
          <router-link :to="{ name: 'Login' }" class="link">Login</router-link>
        </li>
        <li v-if="currentUser">
          <a @click="logout" class="link">Logout</a>
        </li>
      </ul>
    </nav>
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
  /*   mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth)

      this.getWindowWidth() // Calls width method
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.getWindowWidth)
  },
 */ computed: {
    /*     toggleMenu() {
      let self = this
      if (this.windowWidth <= 1800) {
        return (self.navBarHidden = false)
      } else {
        return (self.navBarHidden = true)
      }
    },
 */ ...mapState(
      ['currentUser']
    )
  },
  methods: {
    /*     getWindowWidth() {
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
 */ logout() {
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
<style lang="scss" scoped>
//@import '@/assets/scss/_layout.scss';
header {
  background-image: url('https://peaksport.nz/wp-content/uploads/2018/09/ultra-running-banner-peak.jpg');
  background-size: 100%; // always take up 100% available width
  background-position: center; // center image as will move depening on screen width
  background-repeat: no-repeat;
  height: 300px;
  ul {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 64px;
    background-image: linear-gradient(
      to right,
      rgba(255, 0, 0, 0),
      rgba(21, 29, 52, 1)
    );
    .logo a img {
      filter: invert(100%);
      margin-right: auto;
      height: 64px;
    }
    .home {
      //  margin: 0 auto;
      justify-items: flex-start;
    }
    li:first-child {
      margin-right: auto;
    }
    li:not(:first-child) {
      //  line-height: 54px;

      a {
        display: inline-block;
        color: white;
        border: 1px solid black;
        min-width: 100px;
        text-align: center;
        margin: 0 10px;
        padding: 22px 10px;
      }
    }
    //  .logo a img {
    //  height: 64px;
    // background-color: red;
    // }
  }
}
@media screen and (max-width: 800px) {
  header {
    background-repeat: no-repeat;
    height: 200px;
  }
}
@media screen and (max-width: 550px) {
  header {
    background-position: left top; // center image as will move depening on screen width
    height: 150px;
  }
}
@media screen and (max-width: 500px) {
  header {
    display: none;
  }
}
</style>
