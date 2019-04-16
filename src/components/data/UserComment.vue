<template>
  <div>
    <div>
      <div v-if="day.comment">{{day.comment}}</div>
      <input type="text" placeholder="enter comment" v-model="day.comment">
      <button @click="setComment(day.dayId)">save comment</button>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import { db } from '../../firebaseConfig.js'

export default {
  props: {
    day: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    setComment(dayId) {
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc(dayId)
        .update({ comment: this.day.comment })
      console.log('Current data: ', new Date())
      //     self.test = this.count.comment

      //   this.test=   this.count.comment
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
