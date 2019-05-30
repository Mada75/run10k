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
    <div>HELLO</div>
    <div>
      <section>
        <transition name="fade">
          <div v-if="performingRequest" class="loading">
            <p>Loading...</p>
          </div>
        </transition>
      </section>
    </div>
    <section>
      <div class="col2" :class="{ 'signup-form': !showForgotPassword }">
        <form @submit.prevent>
          <h1>Welcome Back</h1>

          <label for="email1">Email</label>
          <input
            v-model.trim="loginForm.email"
            type="text"
            placeholder="you@email.com"
            id="email1"
          />

          <label for="password1">Password</label>
          <input
            v-model.trim="loginForm.password"
            type="password"
            placeholder="******"
            id="password1"
          />

          <!--           <button @click="login" class="button">Log In</button>
          -->
          <div class="extras">
            <a @click="togglePasswordReset">Forgot Password</a>
            <a @click="toggleForm">Create an Account</a>
          </div>
        </form>
        <form v-if="!showForgotPassword" @submit.prevent>
          <h1>Get Started</h1>

          <label for="name">Name</label>
          <input
            v-model.trim="signupForm.name"
            type="text"
            placeholder="Savvy Apps"
            id="name"
          />

          <label for="title">Title</label>
          <input
            v-model.trim="signupForm.title"
            type="text"
            placeholder="Company"
            id="title"
          />

          <label for="email2">Email</label>
          <input
            v-model.trim="signupForm.email"
            type="text"
            placeholder="you@email.com"
            id="email2"
          />

          <label for="password2">Password</label>
          <input
            v-model.trim="signupForm.password"
            type="password"
            placeholder="min 6 characters"
            id="password2"
          />

          <button @click="signup" class="button">Sign Up</button>

          <div class="extras">
            <a @click="toggleForm">Back to Log In</a>
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
            />

            <button @click="resetPassword" class="button">Submit</button>

            <div class="extras">
              <a @click="togglePasswordReset">Back to Log In</a>
            </div>
          </div>
          <div v-else>
            <h1>Email Sent</h1>
            <p>check your email for a link to reset your password</p>
            <button @click="togglePasswordReset" class="button">
              Back to login
            </button>
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
// import firebase bits
const fb = require('../firebaseConfig.js')
export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: ''
      },

      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: ''
    }
  },
  methods: {
    toSignUp() {
      this.errorMsg = ''
      this.$emit('toggle-form', 'sign-up')
    },

    toggleForm() {
      this.errorMsg = ''
      this.showLoginForm = !this.showLoginForm
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
@media screen and (min-width: 743px) {
}
/* If the screen size is 600px wide or less */
@media screen and (max-width: 742px) {
}
</style>
