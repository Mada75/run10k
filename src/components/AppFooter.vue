<template>
  <footer class="footer">
    <p>
      <strong>Run 10k</strong> by <a :href="adp">Adam Ponting</a>. The source
      code is licensed <a :href="MIT">MIT</a>. The website content is licensed
      <a :href="licence">CC BY NC SA 4.0</a>.
    </p>
    <div>
      <a href="#">Return to top</a>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      adp: "https://adp-cv.firebaseapp.com/",
      MIT: "http://opensource.org/licenses/mit-license.php",
      licence: "http://creativecommons.org/licenses/by-nc-sa/4.0/"
    };
  }
};
</script>

<style lang="scss" scoped>
@import "src/assets/scss/_global.scss";

.footer {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background: $white;

  box-shadow: 0 0 5px 0 rgba($dark, 5);
  border-top: 1px solid black;
  min-height: 100px;
  padding: 1rem 2rem;
  text-align: center;
}
.footer > div a {
  background: $white;
  border: 0;
  outline: 0;
  color: $primary;
  cursor: pointer;

  &:hover {
    background: lighten($primary, 90%);
    text-decoration: underline;
  }
  &:disabled {
    opacity: 0.5;

    &:hover {
      background: $primary;
    }
  }
}
</style>
