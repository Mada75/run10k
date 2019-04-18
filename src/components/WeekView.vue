<template>
  <div class="wrapper">
    <div class="week-number">{{ weekNo }}</div>

    <!-- user view, showing rest days -->
    <div v-if="showRestDays && $route.path === '/myplan'" class="wrapper">
      <div v-for="day in userWeek" :key="day.dayId" class="weekdays">
        <day-view
          :day="day"
          :class="[
            day.complete == true ? 'day-complete' : 'day-incomplete',
            'day'
          ]"
        />
      </div>
    </div>

    <!-- user view, hidden rest days -->
    <div v-if="!showRestDays && $route.path === '/myplan'" class="wrapper">
      <div
        v-for="day in userWeek"
        :key="day.dayId"
        class="weekdays"
        v-show="day.type != 'rest'"
      >
        <day-view
          :day="day"
          class="day"
          :class="[day.complete == true ? 'day-complete' : 'day-incomplete']"
        />
      </div>
    </div>

    <!-- home view, cannot edit rest view -->
    <div v-if="$route.path === '/home'" class="wrapper">
      <div v-for="day in userWeek" :key="day.dayId" class="weekdays">
        <day-view :day="day" class="day" />
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
<style lang="scss" scoped>
@import 'src/assets/scss/_global.scss';
.test {
  border: 5px solid black;
}
.wrapper {
  display: flex;
  flex-direction: row;
  min-height: 200px;
  background: rgba($medium, 0.1);
  margin: 1rem;
  &:hover {
    background-color: rgba($medium, 0.2);
  }
}
.week-number {
  flex: 0 0 5%;
  align-self: center;
  text-align: center;
  text-transform: uppercase;
  color: #00202a;
}
.weekdays {
  display: flex;
  flex-direction: row;
  flex: 1 1 20%;
  padding: 10px 4px;
}
.day {
  display: flex;
  flex-direction: column;
  width: 100%;
  color: #00202a;
  &:hover {
    background-color: rgba(0, 164, 166, 0.3);
    cursor: default;
  }
}
.day-complete {
  background: rgba(lightgreen, 0.7);
  border-left: 5px solid rgba(0, 170, 0, 1);
}
.day-incomplete {
  border-left: 0px solid transparent;
}
</style>
