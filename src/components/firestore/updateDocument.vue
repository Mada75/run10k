<template>
  <div>
    <div>
      <button @click="updateDoc()">Update Document</button>
      <button @click="updateNestedDoc()">Update nested Document</button>
      <button @click="updateAddArrayDoc()">Update add to Array</button>
      <button @click="updateRemoveArrayDoc()">Update remove from Array</button>
      <button @click="incrementNumberDoc()">Increment a numeric value</button>
    </div>
  </div>
</template>
<script>
import { db, fs } from '@/firebaseConfig.js'
export default {
  methods: {
    updateDoc() {
      var washingtonRef = db.collection('cities').doc('DC')

      // Set the "capital" field of the city 'DC'
      return washingtonRef
        .update({
          capital: false
        })
        .then(function() {
          console.log('Document successfully updated!')
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    },
    updateNestedDoc() {
      // Create an initial document to update.
      var frankDocRef = db.collection('users').doc('frank')
      frankDocRef.set({
        name: 'Frank',
        favorites: { food: 'Pizza', color: 'Blue', subject: 'recess' },
        age: 12
      })

      // To update age and favorite color:
      db.collection('users')
        .doc('frank')
        .update({
          age: 13,
          'favorites.color': 'Pink'
        })
        .then(function() {
          console.log('Document successfully updated!')
        })
    },
    updateAddArrayDoc() {
      var washingtonRef = db.collection('cities').doc('DC')

      // Atomically add a new region to the "regions" array field.
      washingtonRef
        .update({
          regions: fs.FieldValue.arrayUnion('greater_virginia')
        })
        .then(function() {
          console.log('Array successfully updated!')
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    },
    updateRemoveArrayDoc() {
      var washingtonRef = db.collection('cities').doc('DC')

      // Atomically remove a region from the "regions" array field.
      washingtonRef
        .update({
          regions: fs.FieldValue.arrayRemove('east_coast')
        })
        .then(function() {
          console.log('Array successfully updated!')
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    },
    incrementNumberDoc() {
      var washingtonRef = db.collection('cities').doc('DC')

      // Atomically increment the population of the city by 50.
      washingtonRef
        .update({
          population: fs.FieldValue.increment(50)
        })
        .then(function() {
          console.log('Array successfully updated!')
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
