<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
          <p>{{ userProfile.title }}</p>
          <div class="create-post">
            <p>create a post</p>
            <form @submit.prevent>
              <textarea v-model.trim="post.content"></textarea>
              <button @click="fire()">fire</button>
              <button @click="setMaster()">fire</button>
            </form>
          </div>
        </div>
      </div>
      <div>{{ performingRequest }},,,,</div>
      <div v-show="performingRequest">sending man</div>
      <div class="col2">
        <div>
          <p class="no-results">There are currently no posts</p>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
// https://stackoverflow.com/questions/46578701/firestore-add-custom-object-to-db
// https://firebase.google.com/docs/firestore/manage-data/transactions#batched-writes
// https://stackoverflow.com/questions/46795817/how-to-efficiently-add-items-to-collection-with-firebase-firestore/46797527
import { mapState } from 'vuex'
import { db } from '../firebaseConfig.js'

export default {
  data() {
    return {
      post: {
        content: ''
      },
      staticUser: '',
      performingRequest: false
    }
  },
  computed: {
    // receive userProfile, currentUser from vuex store
    ...mapState(['userProfile', 'currentUser'])
  },
  methods: {
    fire() {
      this.performingRequest = true
      // let colRef = db.collection('cars')
      // create a reference for the users collection
      let colRef = db
        .collection('users')
        .doc(this.currentUser.uid)
        .collection('10k')

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
          console.log('good, data => ', data)
          this.performingRequest = false
        })
        .catch(error => {
          console.log(error, 'there is an error')
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
          console.log('good, data => ', data)
          this.performingRequest = false
        })
        .catch(error => {
          console.log(error, 'there is an error')
        })
    }
  }
}
</script>
