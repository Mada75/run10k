<template>
  <div>
    <button @click="setUserData()">set user: {{ currentUser.uid }} data</button>
  </div>
</template>
<script>
import { mapState } from 'vuex'

import { db } from '../../firebaseConfig.js'
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
      weeksStatic: ''
    }
  },
  created() {
    // move each week object into an Array
    let weeksArray = weekOne.concat(
      weekTwo,
      weekThree,
      weekFour,
      weekFive,
      weekSix,
      weekSeven,
      weekEight
    )

    // convert the Array to a String
    const weeksString = JSON.stringify(weeksArray)

    // convert the String to one javaScript Object
    // save in 'this.' to refernce in sending data
    this.weeksStatic = JSON.parse(weeksString)
  },
  computed: {
    ...mapState(['currentUser'])
  },
  firestore() {
    return {
      users: {
        // collection reference.
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k'),
        // Bind the collection as an object or an Array (false)
        // objects: true,
        resolve: data => {
          console.log('resolved', data)
          // collection is resolved
        },
        reject: err => {
          console.log('error', err)

          // collection is rejected
        }
      }
    }
  },

  methods: {
    setUserData() {
      console.log(this.currentUser.uid)
      let colRef = this.$firestore.users

      // Get a new write batch() function (firebase stuff)
      var batch = db.batch()

      console.log('firing!')

      // for each object in 'this.daysStatic' Array:
      this.weeksStatic.forEach(day => {
        // create .doc() with unique day.Id
        let docRef = colRef.doc(`${day.dayId}`)
        // .set in the 'docRef' location, each object
        batch.set(docRef, {
          dayId: `${day.dayId}`,
          day: `${day.day}`,
          type: `${day.type}`,
          activity: `${day.activity}`,
          comment: `${day.comment}`,
          complete: `${day.complete}`
        })
      })

      // fire the batch function
      return batch
        .commit()
        .then(data => {
          console.log('good, data=> ', data)
        })
        .catch(error => {
          console.log(error, 'there is an error')
        })

      // this.newReptile = ''
    }
  }
}
</script>
