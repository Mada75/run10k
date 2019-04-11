<template>
  <div>
    <div v-show="requesting" class="show">dsaaaaaaaaaaaaaaaaaaaaaa</div>
    <week-view :week="weekOne" />
    <week-view :week="weekOne" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
import WeekView from '@/components/WeekView.vue'

export default {
  components: {
    WeekView
  },
  data() {
    return {
      masterPlan: ''
    }
  },
  created() {
    // created methods firing twice.....

    // fire increment first to use in if/else statement for getMaster
    this.$store.dispatch('limitCreated')

    // sets request to true
    this.$store.dispatch('performingRequest')

    // get weekOne
    this.$store.dispatch('getMaster')
  },
  mounted() {
    this.performingRequest = false
  },
  computed: {
    weekOne() {
      return this.$store.state.master
    },
    requesting() {
      return this.$store.state.performingRequest
    },
    // receive userProfile, currentUser from vuex store
    ...mapState(['userProfile', 'currentUser'])
  }
}
</script>
<style lang="scss" scoped>
.show {
  height: 500px;
  width: 500px;
  background: pink;
}
</style>
