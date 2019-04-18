<template>
  <div>
    <a href="https://github.com/gdg-tangier/vue-firestore"
      >https://github.com/gdg-tangier/vue-firestore</a
    >
    <div>
      heroes:
      {{ heroes }}
      {{ weekOne }}
      <button @click="marvelHeroes(weekOne)">filet</button>
      {{ result }}
    </div>
    <div>
      <input type="text" v-model="newReptile" @keyup.enter="addReptile" />
      <button @click="addReptile">Add Reptile</button>
    </div>
    <ul class="reptileList">
      <li v-for="(reptile, index) in reptiles" :key="index">
        {{ reptile.name }} - {{ ford }}
        <button @click="deleteReptile(reptile)">Remove</button>
      </li>
    </ul>
    {{ collectionRef }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { db, fs } from '@/firebaseConfig.js'

export default {
  data() {
    return {
      reptiles: [],
      collectionRef: '******************************',
      newReptile: '',
      currentUserPlan: [],
      message: 'im a atest',
      numbers: [1, 3, 6, 8, 11],
      heroes: [
        { name: '“Batman”', franchise: '“DC”' },
        { name: '“Ironman”', franchise: '“Marvel”' },
        { name: '“Thor”', franchise: '“Marvel”' },
        { name: '“Superman”', franchise: '“DC”' }
      ],
      result: []
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
      reptiles: db.collection('reptiles'),
      currentUserPlan: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k'),
        // Bind the collection as an object(true) or an Array(false)
        objects: false,
        resolve: data => {
          console.log('Collection Reference => ', data)
          // collection is resolved
        },
        reject: err => {
          // collection is rejected
          console.log('Collection Error => ', err)
        }
      }
    }
  },
  computed: {
    // receive userProfile, currentUser from vuex store
    ...mapState(['currentUser']),
    weekOne() {
      return this.currentUserPlan.slice(0, 7)
    }
  },
  methods: {
    marvelHeroes(week) {
      /* var heroes = [
        { name: '“Batman”', franchise: '“DC”' },
        { name: '“Ironman”', franchise: '“Marvel”' },
        { name: '“Thor”', franchise: '“Marvel”' },
        { name: '“Superman”', franchise: '“DC”' }
      ] */
      var filtered = []
      for (var i = 0; i < week.length; i++) {
        if (week[i].type != 'rest') {
          filtered.push(week[i])
        }
      }
      console.log(filtered)
    },
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
