<template>
  <div class="day-view">
    <div class="day-day">{{ day.day }}</div>
    <div class="day-type">{{ day.type }}</div>
    <div class="day-body">
      <div class="day-activity">{{ day.activity }}</div>
    </div>
    <div v-if="$route.path==='/myplan'">
      <user-comment :day="day"/>
      <user-complete :day="day"/>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import { currentUser } from '../firebaseConfig.js'
import UserComment from '@/components/data/UserComment.vue'
import UserComplete from '@/components/data/UserComplete.vue'
export default {
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  components: {
    UserComment,
    UserComplete
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/_global.scss';
.day-view {
  padding: 1rem 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  height: 100%;
  background: rgba($medium, 0.3);
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
