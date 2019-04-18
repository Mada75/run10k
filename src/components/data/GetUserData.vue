<template>
  <div>
    <div>comment:{{ dayComment }}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import { db } from '../../firebaseConfig.js'

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
      return db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc('01')
        .onSnapshot(function(doc) {
          console.log('Current data: ', doc.data())
        })
      //   this.test=   this.count.comment
    }
  }
}
</script>

<style lang="scss" scoped></style>
