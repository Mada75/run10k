<template>
  <div>
    <a href="https://firebase.google.com/docs/firestore/manage-data/add-data"
      >https://firebase.google.com/docs/firestore/manage-data/add-data</a
    >
    <div>
      <button @click="setDoc()">Set Document</button>
      <button @click="mergeData()">merge data</button>
    </div>
  </div>
</template>
<script>
import { db } from '@/firebaseConfig.js'
export default {
  methods: {
    setDoc() {
      // Add a new document in collection "cities"
      db.collection('cities')
        .doc('LA')
        .set({
          name: 'Los Angeles',
          state: 'CA',
          country: 'USA'
        })
        .then(function() {
          console.log('Document successfully written!')
        })
        .catch(function(error) {
          console.error('Error writing document: ', error)
        })
    },
    mergeData() {
      var cityRef = db.collection('cities').doc('LA')

      cityRef
        .set(
          {
            capital: true
          },
          { merge: true }
        )
        .then(function() {
          console.log('Document successfully merged!')
        })
        .catch(function(error) {
          console.error('Error merging document: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
