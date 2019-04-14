<template>
  <div>
    <a
      href="https://firebase.google.com/docs/firestore/manage-data/add-data"
    >https://firebase.google.com/docs/firestore/manage-data/add-data</a>
    <div>
      <button @click="setTypes()">Set different data types</button>
    </div>
  </div>
</template>
<script>
import { db, fs } from '@/firebaseConfig.js'
export default {
  methods: {
    setTypes() {
      var docData = {
        stringExample: 'Hello world!',
        booleanExample: true,
        numberExample: 3.14159265,
        dateExample: fs.Timestamp.fromDate(new Date('December 10, 1815')),
        arrayExample: [5, true, 'hello'],
        nullExample: null,
        objectExample: {
          a: 5,
          b: {
            nested: 'foo'
          }
        }
      }
      db.collection('data')
        .doc('one')
        .set(docData)
        .then(function() {
          console.log('Document successfully written!')
        })
        .catch(function(error) {
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
