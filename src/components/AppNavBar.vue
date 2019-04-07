<template>
  <header>
    <section>
      <div class="flex-container nav">
        <a href="https://adp-cv.firebaseapp.com/">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/adp-cv.appspot.com/o/base%2Fadam-logo.jpg?alt=media&token=2aa71b01-e382-4c1e-b29f-184a44b73e3a"
            alt
          />
        </a>
        <ul class="flex-container nav-items">
          <li>
            <router-link to="dashboard">Home</router-link>
          </li>
          <li>
            <router-link to="myplan">My Plan</router-link>
          </li>
          <li>
            <router-link to="settings">Settings</router-link>
          </li>
          <li>
            <a @click="logout">logout</a>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
const fb = require("../firebaseConfig.js");
export default {
  methods: {
    logout() {
      fb.auth
        .signOut()
        .then(() => {
          this.$store.dispatch("clearData");
          this.$router.push("/login");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/scss/_global.scss";
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
  justify-content: space-around;
}
// styling
header {
  background: $white;
  border-bottom: 1px solid black;
}
.nav {
  height: 50px;
}
.nav img {
  height: 50px;
}
</style>
