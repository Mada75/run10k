<template>
  <div class="day-view" :class="classObject">
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
  data() {
    return {
      active: true,
      complete: false,
      'text-danger': false,
      extras: true
    }
  },
  computed: {
    classObject() {
      return {
        active: this.complete
      }
    },
    showExtras() {
      return this.$store.state.showExtras
    }
  },
  methods: {
    check() {
      console.log('checked!')
      this.complete = true
    }
  }
}
</script>
<style lang="scss" scoped>
.active {
  background: lightgreen !important;
}
@import 'src/assets/scss/_global.scss';
.day-view {
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  background: rgba($medium, 0.1);
  text-align: center;
}
.day-body {
  height: 100%;
  padding-top: 1rem;
}
.day-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
  height: 100%;
}
.day-type {
  text-transform: uppercase;
  font-variant-caps: all-small-caps;
  font-weight: bold;
  font-size: 1.2rem;
  padding-top: 1rem;
}
.day-activity {
  line-height: 1.4rem;
}
.day-day {
  border-bottom: 1px solid #000;
  border-top: 1px solid #000;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 0.4rem 0;
  text-transform: uppercase;
  color: #00008b;
}
</style>
