<template>
  <div>
    <week-view :week="weekOne" :weekNo="'week 1'"/>
    <week-view :week="weekTwo" :weekNo="'week 2'"/>
    <week-view :week="weekThree" :weekNo="'week 3'"/>
    <week-view :week="weekFour" :weekNo="'week 4'"/>
    <week-view :week="weekFive" :weekNo="'week 5'"/>
    <week-view :week="weekSix" :weekNo="'week 6'"/>
    <week-view :week="weekSeven" :weekNo="'week 7'"/>
    <week-view :week="weekEight" :weekNo="'week 8'"/>
<!--     <set-master-data/>
    <get-master-data/>
 -->  </div>
</template>
<script>
import { mapState } from 'vuex'
const fb = require('../firebaseConfig.js')
import WeekView from '@/components/WeekView.vue'
import { db, currentUser } from '../firebaseConfig.js'
import SetMasterData from '@/components/data/SetMasterData.vue'
import GetMasterData from '@/components/data/GetMasterData.vue'

export default {
  components: { SetMasterData, GetMasterData, WeekView },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('userPlan', this.currentUser.uid)
  },
  computed: {
    // receive userProfile, currentUser from vuex store
    ...mapState(['userProfile', 'currentUser']),
    weekOne() {
      return this.$store.getters.weekOne
    },
    weekTwo() {
      return this.$store.getters.weekTwo
    },
    weekThree() {
      return this.$store.getters.weekThree
    },
    weekFour() {
      return this.$store.getters.weekFour
    },
    weekFive() {
      return this.$store.getters.weekFive
    },
    weekSix() {
      return this.$store.getters.weekSix
    },
    weekSeven() {
      return this.$store.getters.weekSeven
    },
    weekEight() {
      return this.$store.getters.weekEight
    }
  },
  methods: {}
}
</script>
