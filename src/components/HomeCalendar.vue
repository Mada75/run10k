<template>
  <div>
    <week-view :week="weekOne" :weekNo="'week 1'" />
    <week-view :week="weekTwo" :weekNo="'week 2'" />
    <week-view :week="weekThree" :weekNo="'week 3'" />
    <week-view :week="weekFour" :weekNo="'week 4'" />
    <week-view :week="weekFive" :weekNo="'week 5'" />
    <week-view :week="weekSix" :weekNo="'week 6'" />
    <week-view :week="weekSeven" :weekNo="'week 7'" />
    <week-view :week="weekEight" :weekNo="'week 8'" />
  </div>
</template>
<script>
import WeekView from '@/components/WeekView.vue'
import {
  weekOne,
  weekTwo,
  weekThree,
  weekFour,
  weekFive,
  weekSix,
  weekSeven,
  weekEight
} from './data/weekClass'

export default {
  components: {
    WeekView
  },
  created() {
    this.weekOne = weekOne
    this.weekTwo = weekTwo
    this.weekThree = weekThree
    this.weekFour = weekFour
    this.weekFive = weekFive
    this.weekSix = weekSix
    this.weekSeven = weekSeven
    this.weekEight = weekEight
  }
}
</script>
