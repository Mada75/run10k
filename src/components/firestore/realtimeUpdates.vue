<template>
  <div>
    <a href="https://github.com/gdg-tangier/vue-firestore"
      >https://github.com/gdg-tangier/vue-firestore</a
    >
    <a href="https://alligator.io/vuejs/vue-cloud-firestore/"
      >https://alligator.io/vuejs/vue-cloud-firestore/</a
    >
    <div>
      <input type="text" v-model="newReptile" @keyup.enter="addReptile" />
      <button @click="addReptile">Add Reptile</button>{{ persons }} {{ users
      }}{{ cities }}
    </div>
    <ul class="reptileList">
      <li v-for="(reptile, index) in reptiles" :key="index">
        {{ reptile }}
        {{ reptile.name }} -
        <button @click="deleteReptile(reptile)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { db, fs } from '@/firebaseConfig.js'

export default {
  name: 'app',
  data() {
    return {
      reptiles: [],
      newReptile: ''
    }
  },
  firestore() {
    return {
      persons: {
        // collection reference.
        ref: db.collection('users'),
        // Bind the collection as an object or an Array (false)
        objects: true,
        resolve: data => {
          console.log('resolved', data)
          // collection is resolved
        },
        reject: err => {
          console.log('error', err)

          // collection is rejected
        }
      },
      reptiles: db.collection('reptiles'),
      users: db.collection('users'),
      cities: db.collection('cities')
    }
  },
  methods: {
    addReptile() {
      this.$firestore.reptiles.add({
        name: this.newReptile,
        timestamp: fs.FieldValue.serverTimestamp()
      })
      this.newReptile = ''
    },
    deleteReptile(reptile) {
      this.$firestore.reptiles.doc(reptile['.key']).delete()
    }
  }
}
</script>

<style>
.reptileList {
  list-style: none;
}
</style>
