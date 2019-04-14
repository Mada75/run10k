<template>
  <div>
    <button @click="getMaster()">get master data</button>
    <div>Retrieved master data: {{retrievedData}}</div>
  </div>
</template>
<script>
import { db } from '../../firebaseConfig.js'

export default {
  data() {
    return {
      // create Array to display data
      retrievedData: []
    }
  },
  methods: {
    getMaster() {
      // var docRef = db.collection('10k-master').where("capital", "==", true)
      // var docRef = db.collection('cities').where('capital', '==', true)
      // set self 'this' to reference below
      let self = this
      // get all documents in 10k-master collection, order by dayId.
      db.collection('10k-master')
        .orderBy('dayId', 'asc')
        .limit(7)
        // .where('complete', '==', 'true')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.id, ' => ', doc.data())
            self.retrievedData.push(doc.data())
          })
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error)
        })
    }
  }
}
</script>
