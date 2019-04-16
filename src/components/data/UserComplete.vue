<template>
  <div>
    <div>
      <div>{{day.complete}}</div>
      <button @click="setComplete(day.dayId)" v-if="!day.complete">set complete</button>
      <button @click="setInComplete(day.dayId)" v-else>set incomplete</button>
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
    setComplete(dayId) {
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc(dayId)
        .update({ complete: true })
      console.log('Complete day: ', dayId)
    },
    setInComplete(dayId) {
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc(dayId)
        .update({ complete: false })
      console.log('Incomplete day: ', dayId)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
