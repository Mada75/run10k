<template>
  <div>
    <section class="login-text">
      <div class="login-flex">
        <h1>Run 10k</h1>
        <p>
          Welcome to my sample training plan for a 10k run powered by Vue.js and
          Firebase.
          <br />The plan is based on a
          <a
            href="https://www.runnersworld.com/uk/training/10km/a760075/rws-8-week-10k-schedule-5-days-per-week/"
            target="_blank"
            >runner's world</a
          >
          plan that I have modified based on my own experience.
          <br />Firebase authorisation based on a guide by
          <a
            href="https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase"
            target="_blank"
            >Savvy</a
          >
          <br />You can view more of my work at my
          <a href="https://adp-cv.firebaseapp.com/" target="_blank">homepage</a>
          .
        </p>
      </div>
    </section>
    <a @click="toSignUp">Back to Log In</a>
  </div>
</template>
<script>
export default {
  methods: {
    toSignUp() {
      this.$emit('toggle-form', 'sign-up')
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/_global.scss';
/* If the screen size is 601px wide or more */
@media screen and (min-width: 743px) {
}
/* If the screen size is 600px wide or less */
@media screen and (max-width: 742px) {
}
</style>
