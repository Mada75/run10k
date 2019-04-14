<template>
  <div>
    <a
      href="https://firebase.google.com/docs/firestore/quickstart"
    >https://firebase.google.com/docs/firestore/quickstart</a>
    <div>
      <button @click="addDoc()">Add Document</button>
      <button @click="addSecondDoc()">Add second Document</button>
      <button @click="addGenerateId()">Add with generated id</button>
    </div>
  </div>
</template>
<script>
import { db } from '@/firebaseConfig.js'
export default {
  methods: {
    addDoc() {
      db.collection('users')
        .add({
          first: 'Ada',
          last: 'Lovelace',
          born: 1815
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })
    },
    addSecondDoc() {
      // Add a second document with a generated ID.
      db.collection('users')
        .add({
          first: 'Alan',
          middle: 'Mathison',
          last: 'Turing',
          born: 1912
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })
    },
    addGenerateId() {
      // Add a new document with a generated id.
      db.collection('cities')
        .add({
          name: 'Tokyo',
          country: 'Japan'
        })
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })
      // Add a new document with a generated id.
      var newCityRef = db.collection('cities').doc()
      let data = { 'what am i?': 'data object!' }
      // later...
      newCityRef.set(data)
    }
  }
}
</script>

<style lang="scss" scoped></style>
