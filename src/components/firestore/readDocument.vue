<template>
  <div>
    <div>
      <p>Can be read on demand (function)</p>
      <button @click="readDoc()">Read Document</button>
      <p>Or on created()</p>
    </div>
  </div>
</template>
<script>
import { db } from '@/firebaseConfig.js'
export default {
  created() {
    {
      console.log('Reading documents...')
      db.collection('users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(`${doc.id} => ${doc.data()}`)
          })
          console.log('...documents read')
        })
    }
  },
  methods: {
    readDoc() {
      db.collection('users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            console.log(`${doc.id} => ${doc.data()}`)
          })
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
