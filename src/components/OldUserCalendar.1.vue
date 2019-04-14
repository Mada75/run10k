<template>
  <div id="dashboard">
    <week-view :week="weekOne" :weekNo="'week 1'"/>

    <div>{{ retrieve }}</div>
    <ul>
      <li v-for="day in retrieve" :key="day.dayId">{{ day }}</li>
    </ul>
    <button @click="getData()">get data</button>
    <set-master-data/>
    <get-master-data/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
//import template from './data/weekOne'
const fb = require('../firebaseConfig.js')
import WeekView from '@/components/WeekView.vue'

import { db } from '../firebaseConfig.js'
import SetMasterData from '@/components/data/SetMasterData.vue'
import GetMasterData from '@/components/data/GetMasterData.vue'

export default {
  components: { SetMasterData, GetMasterData, WeekView },
  data() {
    return {
      retrieve: [],
      post: {
        content: ''
      },
      staticUser: '',
      performingRequest: false,
      masterPlan: ''
    }
  },
  created() {
    this.weekOne = weekOne

    let colRef = db.collection('10k-master').get()
    // console.log(colRef)
    //  const plan = db.collection('10k-master').doc('1')
    //  .orderBy('dayId', 'desc')
    //  .onSnapshot(querySnapshot => {})
    this.masterPlan = colRef

    // save the 'weekOne' Array as a String
    //   const daysString = JSON.stringify(weekOne)

    // convert the String to a javaScript Object
    // save in 'this.' to refernce in sending data
    // this.daysStatic = JSON.parse(daysString)
  },
  computed: {
    // receive userProfile, currentUser from vuex store
    ...mapState(['userProfile', 'currentUser']),
    weekOne() {
      return this.$store.getters.weekOne
    }
  },
  methods: {
    getData() {
      let self = this
      // get all documents in 10k-master collection, order by dayId.
      db.collection('10k-master')
        .orderBy('dayId', 'asc')
        .limit(7)
        // .where('complete', '==', 'true')
        .get()
        .then(function(querySnapshot) {
          querySnapshot.forEach(function(doc) {
            console.log(doc.id, ' => ', doc.data())
            self.retrieve.push(doc.data())
          })
        })
        .catch(function(error) {
          console.log('Error getting documents: ', error)
        })
    },
    setMaster() {
      this.performingRequest = true
      // let colRef = db.collection('cars')
      // create a reference for the users collection
      let colRef = db.collection('10k-master')

      // Get a new write batch() function (firebase stuff)
      var batch = db.batch()

      console.log('firing!')

      // for each object in 'this.daysStatic' Array:
      this.daysStatic.forEach(day => {
        // create .doc() with unique day.Id
        let docRef = colRef.doc(`${day.dayId}`)
        // .set in the 'docRef' location, each object
        batch.set(docRef, {
          dayId: `${day.dayId}`,
          day: `${day.day}`,
          type: `${day.type}`,
          activity: `${day.activity}`,
          comment: `${day.comment}`,
          complete: `${day.complete}`
        })
      })

      // fire the batch function
      return batch
        .commit()
        .then(data => {
          console.log('good')
          this.performingRequest = false
        })
        .catch(error => {
          console.log(error, 'there is an error')
        })
    },
    createPost() {
      var batch = { userOne, userTwo, userOne }
      //
      fb.postsCollection
        .add(Object.assign({}, batch))
        //  .add(Object.assign({}, userOne, userTwo, ) )
        //  fb.postsCollection
        //  .add({
        //  userTwo
        //   test: this.dayArrays

        // createdOn: new Date(),
        /*  content: this.post.content,
          userId: this.currentUser.uid,
          userName: this.userProfile.name,
          comments: 0,
          likes: 0
          */
        //    })
        .then(ref => {
          this.post.content = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>
