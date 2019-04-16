<template>
  <div>
    <div>comment:{{dayComment}}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import { currentUser, db } from '../../firebaseConfig.js'

export default {
  props: {
    dayComment: {
      type: String,
      required: false,
      default: 'im a comment'
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>