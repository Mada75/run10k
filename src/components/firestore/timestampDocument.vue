<template>
  <div>
    <a href="https://firebase.google.com/docs/firestore/quickstart"
      >https://firebase.google.com/docs/firestore/quickstart</a
    >
    <div>
      <button @click="timestampDoc()">Timestamp Document</button>
    </div>
  </div>
</template>
<script>
import { db, fs } from '@/firebaseConfig.js'
export default {
  methods: {
    timestampDoc() {
      let docRef = db.collection('users').doc('frank')

      // Update the timestamp field with the value from the server
      docRef
        .update({
          timestamp: fs.FieldValue.serverTimestamp()
        })
        .then(function(docRef) {
          console.log('Document updated with timestamp', docRef)
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
