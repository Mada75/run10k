<template>
  <div>
    <week-view :week="currentUserPlanWeekOne" :weekNo="'1'"/>
    <week-view :week="currentUserPlanWeekTwo" :weekNo="'2'"/>
    <week-view :week="currentUserPlanWeekThree" :weekNo="'3'"/>
    <week-view :week="currentUserPlanWeekFour" :weekNo="'4'"/>
    <week-view :week="currentUserPlanWeekFive" :weekNo="'5'"/>
    <week-view :week="currentUserPlanWeekSix" :weekNo="'6'"/>
    <week-view :week="currentUserPlanWeekSeven" :weekNo="'7'"/>
    <week-view :week="currentUserPlanWeekEight" :weekNo="'8'"/>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import WeekView from '@/components/WeekView.vue'
import { db } from '../firebaseConfig.js'

export default {
  components: { WeekView },
  computed: {
    // receive userProfile, currentUser from vuex store
    ...mapState(['userProfile', 'currentUser'])
  },
  firestore() {
    return {
      // Collection binding
      currentUserPlanWeekOne: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k')
          .where('dayId', '>=', '01')
          .where('dayId', '<=', '07'),
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
      },
      currentUserPlanWeekTwo: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k')
          .where('dayId', '>=', '08')
          .where('dayId', '<=', '14'),
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
      },
      currentUserPlanWeekThree: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k')
          .where('dayId', '>=', '15')
          .where('dayId', '<=', '21'),
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
      },
      currentUserPlanWeekFour: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k')
          .where('dayId', '>=', '22')
          .where('dayId', '<=', '28'),
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
      },
      currentUserPlanWeekFive: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k')
          .where('dayId', '>=', '29')
          .where('dayId', '<=', '35'),
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
      },
      currentUserPlanWeekSix: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k')
          .where('dayId', '>=', '36')
          .where('dayId', '<=', '42'),
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
      },
      currentUserPlanWeekSeven: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k')
          .where('dayId', '>=', '43')
          .where('dayId', '<=', '49'),
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
      },
      currentUserPlanWeekEight: {
        ref: db
          .collection('users')
          .doc(this.currentUser.uid)
          .collection('10k')
          .where('dayId', '>=', '50')
          .where('dayId', '<=', '56'),
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
  }
}
</script>
