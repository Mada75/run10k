<template>
  <div>
    <a
      href="https://firebase.google.com/docs/firestore/manage-data/delete-data"
    >https://firebase.google.com/docs/firestore/manage-data/delete-data</a>
    <div>
      <button @click="deleteDoc()">Delete Document</button>
      <button @click="deleteFieldDoc()">Delete Document Field</button>
    </div>
  </div>
</template>
<script>
import { db, fs } from '@/firebaseConfig.js'
export default {
  methods: {
    deleteDoc() {
      db.collection('cities')
        .doc('DC')
        .delete()
        .then(function() {
          console.log('Document successfully deleted!')
        })
        .catch(function(error) {
          console.error('Error removing document: ', error)
        })
    },
    deleteFieldDoc() {
      var cityRef = db.collection('cities').doc('BJ')

      // Remove the 'capital' field from the document
      var removeCapital = cityRef
        .update({
          capital: fs.FieldValue.delete()
        })
        .then(function() {
          console.log('Document Field deleted ')
        })
        .catch(function(error) {
          console.error('Error deleting document field: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
