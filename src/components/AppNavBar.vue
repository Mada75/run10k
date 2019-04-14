<template>
  <header>
    <section>
      <div class="flex-container nav">
        <a href="https://adp-cv.firebaseapp.com/" target="_blank">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/adp-cv.appspot.com/o/base%2Fadam-logo.jpg?alt=media&token=2aa71b01-e382-4c1e-b29f-184a44b73e3a"
          >
        </a>
        <ul class="flex-container nav-items">
          <li>
            <router-link to="home" class="link">Home</router-link>
          </li>
          <li>
            <router-link to="test" class="link">Test</router-link>
          </li>
          <li v-if="!currentUser">
            <router-link to="login" class="link">Login</router-link>
          </li>
          <li v-if="currentUser">
            <router-link to="dashboard" class="link">Dashboard</router-link>
          </li>
          <li v-if="currentUser">
            <router-link to="myplan" class="link">My Plan</router-link>
          </li>
          <li v-if="currentUser">
            <router-link to="settings" class="link">Settings</router-link>
          </li>
          <li v-if="currentUser">
            <a @click="logout" class="link">Logout</a>
          </li>
        </ul>
      </div>
    </section>
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
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/_global.scss';
.active {
  background: yellow;
}
// flex stuff
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}
.nav-items {
  flex: 1 1 100px;
}
.nav-items li {
  margin: 0 1rem;
  border: 5px solid transparent;
    &:first-child {
    text-align: left;
  }

}
.nav img {
  height: 50px;
}

// styling
header {
  background: $white;
  border-bottom: 1px solid black;
}
/* If the screen size is 601px wide or more */
@media screen and (min-width: 743px) {
  .nav {
    height: 50px;
  }
  .nav-items {
    justify-content: space-around;
  }

  .nav-items li:first-of-type {
    flex: 1 1 100px;
  }
} /* If the screen size is 600px wide or less */
@media screen and (max-width: 742px) {
  .nav {
    height: fit-content;
  }
  .nav-items {
    display: block;
  }
  .link {
    text-align: center;
    background: #e6ecf0;
    display: block;
  }
}
</style>
