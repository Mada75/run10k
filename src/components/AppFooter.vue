<template>
  <footer id="footer">
    <p>
      <strong>Run 10k</strong> by
      <a :href="adp" target="_blank">Adam Ponting</a>. The source code is
      licensed <a :href="MIT" target="_blank">MIT</a>. The website content is
      licensed <a :href="licence" target="_blank">CC BY NC SA 4.0</a>.
    </p>
    <div>
      <a href="#">Return to top</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@media screen and (max-width: 500px) {
  #footer {
    margin-top: 2em;
  }
}
#footer {
  margin-top: 1em;
}
</style>

<script>
export default {
  data() {
    return {
      adp: 'https://adp-cv.firebaseapp.com/',
      MIT: 'http://opensource.org/licenses/mit-license.php',
      licence: 'http://creativecommons.org/licenses/by-nc-sa/4.0/'
    }
  }
}
</script>
