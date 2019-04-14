<template>
  <div>
    <button @click="setUserData()">set user comment</button>
    <button @click="setUserData2()">set user day2</button>
    <form action>
      <input type="text" name id v-model="day.comment" placeholder="enter a comment">
    </form>
    <div>{{day.comment}}</div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import { usersCollection, db, user10k } from '../../firebaseConfig.js'
import {
  weekOne,
  weekTwo,
  weekThree,
  weekFour,
  weekFive,
  weekSix,
  weekSeven,
  weekEight
} from './weekClass'

export default {
  data() {
    return {
      weeksStatic: '',
      day: {
        comment: ''
      }
    }
  },
  created() {},
  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    setUserData() {
      console.log('updating comment...')
      // create a reference in 'users' > 'user.uid' > '10k'
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc('01')
      //
      let comment = this.day.comment
      colRef
        .update({
          createdOn: new Date(),
          comment: comment
        })
        .then(ref => {
          console.log('done. no error.')

          this.day.comment = 'success!'
        })
        .catch(err => {
          console.log(err)
        })
      console.log('done. no error.')
    },
    setUserData2() {
      console.log('updating comment...')
      // create a reference in 'users' > 'user.uid' > '10k'
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')
        .doc('02')
      //
      let comment = this.day.comment
      colRef
        .update({
          createdOn: new Date(),
          comment: comment
        })
        .then(ref => {
          console.log('done. no error.')

          this.day.comment = 'success!'
        })
        .catch(err => {
          console.log(err)
        })
      console.log('done. no error.')
    }
  }
}
</script>
