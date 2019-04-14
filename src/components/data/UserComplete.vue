<template>
  <div>
    <button @click="getUserData()">get user plan from vuex</button>
    <div>test!!!!{{test}}</div>
    <div>comment:{{day}}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import { currentUser, db } from '../../firebaseConfig.js'

export default {
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  // https://vuex.vuejs.org/guide/state.html
  data() {
    return {
      test: 'coments here...'
    }
  },
  computed: {
    ...mapState(['currentUser']),
    comment() {
      let self = this
      let count = 'adamamda'
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc('01')
        .onSnapshot(function(doc) {
          console.log('Current data: ', doc.data())
          this.count = doc.data()
          console.log(this.count.comment)
          self.test = this.count.comment
        })
      //   this.test=   this.count.comment
    },

    // get userPlan
    userStateData() {
      return this.$store.state.userPlan
    },
    userGetterData() {
      return this.$store.getters.getUserPlan
    },
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
  methods: {
    // fire get 'userPlan', pass user uid
    getUserData() {
      this.$store.dispatch('userPlan', this.currentUser.uid)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>
