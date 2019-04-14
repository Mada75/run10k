<template>
  <!-- 
    Working with input fields, v-model.trim is useful because it automatically removes whitespace.
  -->
  <!-- 
    Also add submit.prevent to the form so the form doesn't submit. 
    This is important as the default behavior of a form submission is a page reload. 
    You want to hijack this event to save to the database without a page reload.
  -->
  <div>
    <div>
      <section>
        <div>
          <!--
             conditionally show
          <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          -->
          <form @submit.prevent>
            <h1>Get Running</h1>

            <label for="name">Name</label>
            <input
              v-model.trim="signupForm.name"
              type="text"
              placeholder="Enter a username"
              id="name"
            >

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

            <button @click="signup" class="button">Sign Up</button>

            <div class="extras">
              <a @click="toLogin">Back to Log In</a>
            </div>
          </form>
        </div>
      </section>
    </div>

    <div id="login">
      <transition name="fade">
        <div v-if="performingRequest" class="loading">
          <p>Loading...</p>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
// import firebase bits
const fb = require('../firebaseConfig.js')
export default {
  data() {
    return {
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      showLoginForm: true,
      performingRequest: false,
      errorMsg: '',
      name: 'login-text'
    }
  },
  methods: {
    toLogin() {
      this.errorMsg = ''
      this.$emit('toggle-form', 'login-text')
    },
    signup() {
      this.performingRequest = true
      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(user => {
          console.log('User signed up => ', user)

          this.$store.commit('setCurrentUser', user.user)
          // create user obj
          fb.usersCollection
            .doc(user.user.uid)
            .set({
              name: this.signupForm.name
            })
            .then(() => {
              console.log('Setting user data... ')
              this.$store.dispatch('fetchUserProfile')
              this.performingRequest = false
              this.$router.push('/dashboard')
            })
            .catch(err => {
              console.log('Setting user data error => ', err)
              this.performingRequest = false
              this.errorMsg = err.message
            })
        })
        .catch(err => {
          console.log('User sign up error => ', err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import 'src/assets/scss/_global.scss';

/* If the screen size is 601px wide or more */
@media screen and (min-width:743px) {
}
/* If the screen size is 600px wide or less */
@media screen and (max-width:742px) {
}
</style>
