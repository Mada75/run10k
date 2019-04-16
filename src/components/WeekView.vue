<template>
  <div class="wrapper">
    <button @click="showRest =!showRest">show</button>
    <div class="week-number">{{weekNo}}</div>
    <div v-if="showRest" class="wrapper">
      <div v-for="day in userWeek" :key="day.dayId" class="weekdays">
        <day-view :day="day" class="day"/>
      </div>
    </div>
    <div v-else class="wrapper">
    <div v-for="day in userWeek" :key="day.dayId" class="weekdays" v-show="day.type!='rest'">
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
    }
  }
}
</script>
<style lang="scss" scoped>
.rest-day {
  border: 2px solid green;
  background: greenyellow;
  display: none !important;
}

@import 'src/assets/scss/_global.scss';

.wrapper {
  color: #000000;
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
  border: 2px solid yellow;
}
.day {
  display: flex;
  flex-direction: column;
  width: 100%;
  &:hover {
    background-color: rgba($medium, 0.3);
  }
}
</style>
