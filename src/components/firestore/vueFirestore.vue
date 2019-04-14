<template>
  <div>
    <a
      href="https://github.com/gdg-tangier/vue-firestore"
    >https://github.com/gdg-tangier/vue-firestore</a>
    <div>
      <input type="text" v-model="newReptile" @keyup.enter="addReptile">
      <button @click="addReptile">Add Reptile</button>
    </div>
    <ul class="reptileList">
      <li v-for="(reptile, index) in reptiles" :key="index">
        {{ reptile.name }} - {{ford}}
        <button @click="deleteReptile(reptile)">Remove</button>
      </li>
    </ul>
    {{collectionRef}}
  </div>
</template>

<script>
import { db, fs } from '@/firebaseConfig.js'

export default {
  data() {
    return {
      reptiles: [],
      collectionRef: '******************************',
      newReptile: ''
    }
  },
  firestore() {
    return {
      // Collection binding
      persons: {
        ref: db.collection('users'),
        // Bind the collection as an object or an Array (false)
        objects: true,
        resolve: data => {
          console.log('Collection Reference => ', data)
          // collection is resolved
        },
        reject: err => {
          // collection is rejected
          console.log('Collection Error => ', err)
        }
      },
      // Doc binding
      ford: {
        ref: db.collection('users').doc('frank'),
        // Bind the collection as an object or an Array (false)
        resolve: data => {
          console.log('Document Reference => ', data)
          // collection is resolved
        },
        reject: err => {
          // collection is rejected
          console.log('Document Error => ', err)
        }
      },
      // Collection shorthand
      collectionRef: db.collection('data').doc('one'),
      // Document shorthand
      reptiles: db.collection('reptiles')
    }
  },
  methods: {
    addReptile() {
      let self = this
      this.$firestore.reptiles
        .add({
          name: this.newReptile,
          timestamp: fs.FieldValue.serverTimestamp()
        })
        .then(function() {
          console.log('Document successfully written!')
          self.newReptile = 'new'
        })
        .catch(function(error) {
          console.error('Error writing document: ', error)
        })
    },
    deleteReptile(reptile) {
      let self = this
      this.$firestore.reptiles
        .doc(reptile['.key'])
        .delete()
        .then(function() {
          console.log(reptile, 'Document successfully deleted!')
          self.newReptile = 'deleted!'
        })
        .catch(function(error) {
          console.error('Error writing document: ', error)
        })
    }
  }
}
</script>

<style>
.reptileList {
  list-style: none;
}
</style>
