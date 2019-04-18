<template>
  <div>
    <a
      href="https://firebase.google.com/docs/firestore/manage-data/transactions"
      >https://firebase.google.com/docs/firestore/manage-data/transactions</a
    >
    <div>
      <button @click="runTransaction()">Run Transaction</button>
      <button @click="passingInfoOut()">
        Passing information out of the Transaction
      </button>
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
    runTransaction() {
      // Create a reference to the SF doc.
      var sfDocRef = db.collection('cities').doc('SF')

      // Uncomment to initialize the doc.
      // sfDocRef.set({ population: 0 });

      return db
        .runTransaction(function(transaction) {
          // This code may get re-run multiple times if there are conflicts.
          return transaction.get(sfDocRef).then(function(sfDoc) {
            if (!sfDoc.exists) {
              throw 'Document does not exist!'
            }

            // Add one person to the city population.
            // Note: this could be done without a transaction
            //       by updating the population using FieldValue.increment()
            var newPopulation = sfDoc.data().population + 1
            transaction.update(sfDocRef, { population: newPopulation })
          })
        })
        .then(function() {
          console.log('Transaction successfully committed!')
        })
        .catch(function(error) {
          console.log('Transaction failed: ', error)
        })
    },
    passingInfoOut() {
      // Create a reference to the SF doc.
      var sfDocRef = db.collection('cities').doc('SF')

      db.runTransaction(function(transaction) {
        return transaction.get(sfDocRef).then(function(sfDoc) {
          if (!sfDoc.exists) {
            throw 'Document does not exist!'
          }

          var newPopulation = sfDoc.data().population + 1
          if (newPopulation <= 1000000) {
            transaction.update(sfDocRef, { population: newPopulation })
            return newPopulation
          } else {
            return Promise.reject('Sorry! Population is too big.')
          }
        })
      })
        .then(function(newPopulation) {
          console.log('Population increased to ', newPopulation)
        })
        .catch(function(err) {
          // This will be an "population is too big" error.
          console.error(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
