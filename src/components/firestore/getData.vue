<template>
  <div>
    <a
      href="https://firebase.google.com/docs/firestore/query-data/get-data"
    >https://firebase.google.com/docs/firestore/query-data/get-data</a>
    <div>
      <button @click="exampleData()">Set example data</button>
      <button @click="getData()">Get Data Document</button>
      <button @click="getOfflineData()">Get Data Document (offline)</button>
      <button @click="getMultipleDocs()">Get multiple Documents</button>
      <button @click="getAllDocs()">Get ALL Documents in a Collection</button>
    </div>
  </div>
</template>
<script>
import { db } from '@/firebaseConfig.js'
export default {
  methods: {
    exampleData() {
      var citiesRef = db.collection('cities')

      citiesRef.doc('SF').set({
        name: 'San Francisco',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 860000,
        regions: ['west_coast', 'norcal']
      })
      citiesRef.doc('LA').set({
        name: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        capital: false,
        population: 3900000,
        regions: ['west_coast', 'socal']
      })
      citiesRef.doc('DC').set({
        name: 'Washington, D.C.',
        state: null,
        country: 'USA',
        capital: true,
        population: 680000,
        regions: ['east_coast']
      })
      citiesRef.doc('TOK').set({
        name: 'Tokyo',
        state: null,
        country: 'Japan',
        capital: true,
        population: 9000000,
        regions: ['kanto', 'honshu']
      })
      citiesRef
        .doc('BJ')
        .set({
          name: 'Beijing',
          state: null,
          country: 'China',
          capital: true,
          population: 21500000,
          regions: ['jingjinji', 'hebei']
        })
        .then(function() {
          console.log('Example Document written')
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        })
    },
    getData() {
      // Note: If there is no document at the location referenced by docRef, the resulting document will be empty and calling exists on it will return false.
      var docRef = db.collection('cities').doc('SF')

      docRef.get().then(function(doc) {
        if (doc.exists) {
          console.log('Document data:', doc.data())
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!')
        }
      })
    },
    getOfflineData() {
      var docRef = db.collection('cities').doc('SF')

      // Valid options for source are 'server', 'cache', or
      // 'default'. See https://firebase.google.com/docs/reference/js/firebase.firestore.GetOptions
      // for more information.
      var getOptions = {
        source: 'cache'
      }

      // Get a document, forcing the SDK to fetch from the offline cache.
      docRef
        .get(getOptions)
        .then(function(doc) {
          // Document was found in the cache. If no cached document exists,
          // an error will be returned to the 'catch' block below.
          console.log('Cached document data:', doc.data())
        })
        .catch(function(error) {
          console.log('Error getting cached document:', error)
        })
    },
    getMultipleDocs() {
      db.collection('cities')
        .where('capital', '==', true)
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
          })
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error)
        })
    },
    getAllDocs() {
      db.collection('citieas')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data())
          })
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error)
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
