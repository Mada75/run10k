<template>
  <div>
    <div>
      <fa-icon
        :icon="myIcon"
        @click="setInComplete(day.dayId)"
        v-if="day.complete == true"
        class="icon"
        title="Reset today"
        @mouseover="myIcon = 'redo'"
        @mouseout="myIcon = 'running'"
      />
      <fa-icon
        icon="check"
        @click="setComplete(day.dayId)"
        v-else
        title="Complete today"
        class="icon"
      />
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
  data() {
    return {
      myIcon: 'running'
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    setComplete(dayId) {
      let self = this
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc(dayId)
        .update({ complete: true })
        .then(function() {
          console.log('Complete day: ', dayId)
          self.dayComplete = true
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    },
    setInComplete(dayId) {
      db.collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc(dayId)
        .update({ complete: false })
        .then(function() {
          console.log('Incomplete day: ', dayId)
          self.dayComplete = false
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'src/assets/scss/_global.scss';

.icon {
  width: 100%;
  cursor: pointer;
  color: #00008b;
  flex: 0 1 50%;
  transition: all 100ms ease;

  &:hover {
    color: $primary;
  }
}
.active {
  // background: green;
}
.nope {
}
</style>
