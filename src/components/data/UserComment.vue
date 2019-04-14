<template>
  <div>
    <div>
      <input type="text" placeholder="enter comment" v-model="day.comment">
      {{day.comment}}
      <button @click="setComment(day.dayId)">set</button>
    </div>
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
    watching() {
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc('14')
        .onSnapshot(function(doc) {
          var source = doc.metadata.hasPendingWrites ? 'Local' : 'Server'
          console.log(source, ' data: ', doc.data())
        })
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
    },
    setComment(dayId) {
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc(dayId)
        .update({ comment: ' man true' })
      console.log('Current data: ', new Date())
      //     self.test = this.count.comment

      //   this.test=   this.count.comment
    }
  }
}
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>
