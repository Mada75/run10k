<template>
  <div id="login">
    <transition name="fade">
      <div v-if="performingRequest" class="loading">
        <p>Loading...</p>
      </div>
    </transition>
    <section>
      <div class="col1">
        <h1>10k Running Plan</h1>
        <p>
          Welcome to your 10k running plan powered by <a href="https://vuejs.org/">Vue.js</a>  and <a href="https://firebase.google.com/">Firebase</a>.
          <br>Sign up for access to your personalised plan allowing you to add
          notes and keep track of your progress.
        </p>
      </div>
      <div class="col2" :class="{ 'signup-form': !showLoginForm && !showForgotPassword }">
        <form v-if="showLoginForm" @submit.prevent>
          <h1>Welcome Back</h1>

          <label for="email1">Email</label>
          <input v-model.trim="loginForm.email" type="text" placeholder="you@email.com" id="email1">

          <label for="password1">Password</label>
          <input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="******"
            id="password1"
          >

          <div class="extras">
            <button @click="login" class="button">Log In</button>
            <div>
              <a @click="togglePasswordReset">Forgot Password</a>
              <a @click="toggleForm">Create an Account</a>
            </div>
          </div>
        </form>
        <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          <h1>Get Started</h1>

          <label for="name">Name</label>
          <input v-model.trim="signupForm.name" type="text" placeholder="Savvy Apps" id="name">

          <label for="title">Title</label>
          <input v-model.trim="signupForm.title" type="text" placeholder="Company" id="title">

          <label for="email2">Email</label>
          <input
            v-model.trim="signupForm.email"
            type="text"
            placeholder="you@email.com"
            id="email2"
          >

          <label for="password2">Password</label>
          <input
            v-model.trim="signupForm.password"
            type="password"
            placeholder="min 6 characters"
            id="password2"
          >

          <div class="extras">
            <button @click="signup" class="button">Sign Up</button>
            <div>
              <a @click="toggleForm">Back to Log In</a>
            </div>
          </div>
        </form>
        <form v-if="showForgotPassword" @submit.prevent class="password-reset">
          <div v-if="!passwordResetSuccess">
            <h1>Reset Password</h1>
            <p>We will send you an email to reset your password</p>

            <label for="email3">Email</label>
            <input
              v-model.trim="passwordForm.email"
              type="text"
              placeholder="you@email.com"
              id="email3"
            >

            <div class="extras">
              <button @click="resetPassword" class="button">Submit</button>
              <div>
                <a @click="togglePasswordReset">Back to Log In</a>
              </div>
            </div>
          </div>
          <div v-else>
            <h1>Email Sent</h1>
            <p>check your email for a link to reset your password</p>
            <button @click="togglePasswordReset" class="button">Back to login</button>
          </div>
        </form>
        <transition name="fade">
          <div v-if="errorMsg !== ''" class="error-msg">
            <p>{{ errorMsg }}</p>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import { db } from '@/firebaseConfig.js'
import {
  weekOne,
  weekTwo,
  weekThree,
  weekFour,
  weekFive,
  weekSix,
  weekSeven,
  weekEight
} from '@/components/data/weekClass'

const fb = require('../firebaseConfig.js')
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      passwordForm: {
        email: ''
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: '',
      weeksStatic: ''
    }
  },
  created() {
    // move each week object into an Array
    let weeksArray = weekOne.concat(
      weekTwo,
      weekThree,
      weekFour,
      weekFive,
      weekSix,
      weekSeven,
      weekEight
    )

    // convert the Array to a String
    const weeksString = JSON.stringify(weeksArray)

    // convert the String to one javaScript Object
    // save in 'this.' to refernce in sending data
    this.weeksStatic = JSON.parse(weeksString)
  },

  computed: {
    ...mapState(['currentUser'])
  },
  methods: {
    toggleForm() {
      this.errorMsg = ''
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true
        this.showForgotPassword = false
        this.passwordResetSuccess = false
      } else {
        this.showLoginForm = false
        this.showForgotPassword = true
      }
    },
    resetPassword() {
      this.performingRequest = true
      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false
          this.passwordResetSuccess = true
          this.passwordForm.email = ''
          this.errorMsg = ''
        })
        .catch(err => {
          console.log(err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
    },
    login() {
      this.performingRequest = true
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(res => {
          this.$store.commit('setCurrentUser', res.user)
          this.$store.dispatch('fetchUserProfile')
          this.performingRequest = false
          this.$router.push({ name: 'MyPlan', hash: '#weekNo1' }) // scrollTo #weekNo1
        })
        .catch(err => {
          console.log('error signing in => ', err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
    },
    signup() {
      this.performingRequest = true
      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(res => {
          this.$store.commit('setCurrentUser', res.user)
          // create user obj
          fb.usersCollection
            .doc(res.user.uid)
            .set({
              name: this.signupForm.name,
              title: this.signupForm.title
            })
            .then(() => {
              this.$store.dispatch('fetchUserProfile')
              this.performingRequest = false
              this.$router.push({ name: 'MyPlan', hash: '#weekNo1' }) // scrollTo #weekNo1

              this.setUserData()
            })
            .catch(err => {
              console.log(err)
              this.performingRequest = false
              this.errorMsg = err.message
            })
        })
        .catch(err => {
          console.log(err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
    },
    setUserData() {
      console.log(this.currentUser.uid)
      let colRef = db
        .collection('users')
        // .doc('im a doc')
        .doc(this.currentUser.uid)
        .collection('10k')

      // Get a new write batch() function (firebase stuff)
      var batch = db.batch()

      console.log('firing!')

      // for each object in 'this.daysStatic' Array:
      this.weeksStatic.forEach(day => {
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
          console.log(data)
        })
        .catch(error => {
          console.log(error, 'there is an error')
        })

    }
  }
}
</script>
