<template>
  <section>
    <div>
      <h1>Sign up and Log in</h1>
      <p>
        Welcome to my sample training plan for a 10k run powered by
        <a href="https://vuejs.org/">Vue.js</a> and
        <a href="https://firebase.google.com/">Firebase</a>.

        <br />The plan is based on a
        <a
          href="https://www.runnersworld.com/uk/training/10km/a760075/rws-8-week-10k-schedule-5-days-per-week/"
          target="_blank"
          >runner's world</a
        >
        plan that I have modified based on my own experience.
        <br />You can view more of my work at my
        <a href="https://adp-cv.firebaseapp.com/" target="_blank">homepage</a>
        .
      </p>
    </div>
  </section>
</template>
<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/app.scss';
section {
  // padding: 2rem 1rem;;
  h1 {
    padding: 2rem 0;
  }
}
div {
  text-align: center;
  padding: 0 1rem;
  p {
    line-height: 1.2;
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }
}
a {
  color: orange;
}
</style>
