<template>
  <div>
    <a
      href="https://firebase.google.com/docs/firestore/manage-data/transactions"
    >https://firebase.google.com/docs/firestore/manage-data/transactions</a>
    <div>
      <button @click="writeBatch()">Write Batch</button>
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
    writeBatch() {
      // Get a new write batch
      var batch = db.batch()

      // Set the value of 'NYC'
      var nycRef = db.collection('cities').doc('NYC')
      batch.set(nycRef, { name: 'New York City' })

      // Update the population of 'SF'
      var sfRef = db.collection('cities').doc('SF')
      batch.update(sfRef, { population: 1000000 })

      // Delete the city 'LA'
      var laRef = db.collection('cities').doc('LA')
      batch.delete(laRef)

      // Commit the batch
      batch
        .commit()
        .then(function() {
          console.log('Batch successfully committed!')
        })
        .catch(function(error) {
          console.log('Batch failed: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
