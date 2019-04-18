<template>
  <header>
    <section>
      <div class="flex-container nav">
        <a href="https://adp-cv.firebaseapp.com/" target="_blank">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/adp-cv.appspot.com/o/base%2Fadam-logo.jpg?alt=media&token=2aa71b01-e382-4c1e-b29f-184a44b73e3a"
          />
        </a>
        <ul class="flex-container nav-items">
          <li>
            <router-link to="home" class="link">
              <fa-icon icon="home" class="icon" />Home
            </router-link>
          </li>
          <li>
            <router-link to="test" class="link">Test</router-link>
          </li>
          <li v-if="!currentUser">
            <router-link to="login" class="link">Login</router-link>
          </li>
          <li v-if="currentUser">
            <router-link to="myplan" class="link">
              <fa-icon icon="shoe-prints" class="icon" />My Plan
            </router-link>
          </li>
          <li v-if="currentUser">
            <router-link to="settings" class="link">
              <fa-icon icon="users-cog" class="icon" />Settings
            </router-link>
          </li>
          <li v-if="currentUser">
            <a @click="logout" class="link">
              <fa-icon icon="sign-out-alt" class="icon" />Logout
            </a>
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
.icon {
  margin-right: 0.1rem;
}
@import 'src/assets/scss/_global.scss';
.active {
  background: yellow;
}
// flex stuff
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
}
.nav-items {
  flex: 1 1 100px;
}
.nav-items li {
  margin: 0 1rem;
  border: 5px solid transparent;
  transition: all 1000ms ease;
  /*   &:first-child {
   text-align: left;
  }
 */
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
    justify-content: flex-end;
  }
  .nav-items li:hover {
    background: rgba($primary, 0.05);
  }

  /*   .nav-items li:first-of-type {
   flex: 1 1 100px;
  }
 */
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
