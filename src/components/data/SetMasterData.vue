<template>
  <div>
    <button @click="setMaster()">set master data</button>
  </div>
</template>
<script>
import { db } from '../../firebaseConfig.js'
import { weekOne, weekTwo, weekThree, weekFour, weekFive, weekSix, weekSeven, weekEight } from './weekClass'

export default {
  data() {
    return {
      daysStatic: ''
    }
  },
  created() {
    // move each week object into an Array
    let weeksArray = weekOne.concat(weekTwo, weekThree, weekFour, weekFive, weekSix, weekSeven, weekEight); 
    
    // convert the Array to a String
    const daysString = JSON.stringify(weeksArray)

    // convert the String to one javaScript Object
    // save in 'this.' to refernce in sending data
    this.daysStatic = JSON.parse(daysString)
  },
  methods: {
    setMaster() {
      // let colRef = db.collection('cars')
      // create a reference for the users collection
      let colRef = db.collection('10k-master')

      // Get a new write batch() function (firebase stuff)
      var batch = db.batch()

      console.log('firing!')

      // for each object in 'this.daysStatic' Array:
      this.daysStatic.forEach(day => {
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
          console.log('good')
        })
        .catch(error => {
          console.log(error, 'there is an error')
        })
    }
  }
}
</script>
