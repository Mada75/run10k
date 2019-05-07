<template>
  <div id="week-view">
    <div>{{ weekNo }}</div>

    <!-- user view, showing rest days -->
    <div v-if="showRestDays && $route.path === '/myplan'" class="week-wrapper">
      <div v-for="day in userWeek" :key="day.dayId" class="weekdays">
        <day-view
          :day="day"
          :class="[
            day.complete == true ? 'border-complete' : 'border-incomplete',
            'day'
          ]"
        />
      </div>
    </div>

    <!-- user view, hidden rest days -->
    <div v-if="!showRestDays && $route.path === '/myplan'" class="week-wrapper">
      <div v-for="day in userWeek" :key="day.dayId" class="weekdays" v-show="day.type != 'rest'">
        <day-view
          :day="day"
          :class="[
            day.complete == true ? 'border-complete' : 'border-incomplete',
            'day'
          ]"
        />
      </div>
    </div>

    <!-- home view, cannot edit rest view -->
    <div v-if="$route.path === '/home'" class="week-wrapper">
      <div v-for="day in userWeek" :key="day.dayId" class="weekdays">
        <day-view :day="day" class="day"/>
      </div>
    </div>
  </div>
</template>
<script>
import DayView from '@/components/DayView.vue'
export default {
  components: {
    DayView
  },
  props: {
    weekNo: {
      type: String,
      required: true
    },
    week: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showRest: false
    }
  },
  computed: {
    userWeek() {
      return this.week
    },
    showRestDays() {
      return this.$store.state.showRestDays
    },
    user() {
      return this.$store.state.currentUser
    }
  }
}
</script>
