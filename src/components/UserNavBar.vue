<template>
  <header id="user-nav-bar">
    <!-- start primary menu -->
    <ul class="user-menu">
      <!-- logo visible on all screens -->
      <!--       <li @click="toggleHideRestDays">
        <button>
          {{toggleRest}}
          <br>rest days
        </button>
      </li>
      <li @click="toggleHideExtras">
        <button>
          {{toggleExtras}}
          <br>details
        </button>
      </li>
      -->
      <li v-for="(week, index) in weekNumber" :key="index">
        <a :href="`#weekNo${week}`">
          Week
          <br>
          {{ week }}
        </a>
      </li>
    </ul>
    <!-- end primary menu -->
  </header>
</template>

<script>
import { mapState } from 'vuex'

const fb = require('../firebaseConfig.js')
export default {
  data() {
    return {
      //weekNumber: [1, 2, 3, 4, 5, 6, 7, 8],
      mobileMenuOpen: false,
      icon: 'bars',
      toggleRest: 'hide',
      toggleExtras: 'hide'
    }
  },
  created() {
    this.weekNumber = [1, 2, 3, 4, 5, 6, 7, 8]
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    toggleHideRestDays() {
      if (this.toggleRest === 'hide') {
        this.toggleRest = 'show'
      } else {
        this.toggleRest = 'hide'
      }
      this.$store.commit('toggleShowRestDays')
    },
    toggleHideExtras() {
      if (this.toggleExtras === 'hide') {
        this.toggleExtras = 'show'
      } else {
        this.toggleExtras = 'hide'
      }
      this.$store.commit('toggleShowExtras')
    },
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
#user-nav-bar {
  position: sticky;
  top: 0;
  z-index: 1;
  background: rgba(21, 29, 52, 1);
  color: white;
  height: 64px;
}
.user-menu {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: stretch;
  flex-wrap: nowrap;
  height: 100%;
  li a,
  li button {
    color: white;
    border: none;
    line-height: 20px;
    margin: 0 0.25rem;
    min-width: 80px;
    text-align: center;
    display: block;
    height: 100%;
    background: rgba(21, 29, 52, 1);
    filter: brightness(130%);
  }
  a {
    padding-top: 10px;
    &:hover {
      color: orange;
    }
  }
  button {
    text-transform: capitalize;
    &:hover {
      text-decoration: underline;
      color: orange;
      cursor: pointer;
    }
  }

  .toggle-mobile-menu {
    display: none;
  }
}
@media screen and (max-width: 800px) {
  #user-nav-bar {
    width: 100%;
    .user-menu {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: stretch;
      flex-wrap: nowrap;
      height: 100%;

      li a,
      li button {
        color: white;
        border: none;
        //  line-height: 32px;
        margin: 0 0.25rem;
        min-width: 30px;
        text-align: center;
        display: block;
        height: 100%;
        background: rgba(21, 29, 52, 1);
        filter: brightness(130%);
      }
      a {
        padding-top: 10px;
        &:hover {
          color: orange;
        }
      }
      button {
        text-transform: capitalize;
        &:hover {
          text-decoration: underline;
          color: orange;
          cursor: pointer;
        }
      }

      .toggle-mobile-menu {
        display: none;
      }
    }
  }
}
@media screen and (max-width: 500px) {
  #user-nav-bar {
    display: none;
  }
}
</style>
