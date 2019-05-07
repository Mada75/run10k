<template>
  <div id="day-view">
    <div class="day-day">{{ day.day }}</div>
    <div class="day-type">{{ day.type }}</div>
    <div class="day-body">
      <div class="day-activity">{{ day.activity }}</div>
    </div>
    <div v-if="$route.path === '/myplan'">
      <user-comment :day="day" v-show="showExtras" />
    </div>
  </div>
</template>
<script>
import UserComment from '@/components/data/UserComment.vue'
export default {
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  components: {
    UserComment
  },
  computed: {
    showExtras() {
      return this.$store.state.showExtras
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
