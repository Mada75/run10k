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
    <div class="wrapper">
      <section class="login-text">
        <div class="login-flex">
          <h1>Run 10k</h1>
          <p>
            Welcome to my sample training plan for a 10k run powered by Vue.js
            and Firebase.
            <br />The plan is based on a
            <a
              href="https://www.runnersworld.com/uk/training/10km/a760075/rws-8-week-10k-schedule-5-days-per-week/"
              target="_blank"
              >runner's world</a
            >
            plan that I have modified based on my own experience. <br />Firebase
            authorisation based on a guide by
            <a
              href="https://savvyapps.com/blog/definitive-guide-building-web-app-vuejs-firebase"
              target="_blank"
              >Savvy</a
            >
            <br />You can view more of my work at my
            <a href="https://adp-cv.firebaseapp.com/" target="_blank"
              >homepage</a
            >
            .
          </p>
        </div>
      </section>
      <section class="sign-up-form">
        <div class="sign-up-flex">
          <!--
             conditionally show
          <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
          -->
          <form @submit.prevent>
            <h1>Get Started</h1>

            <label for="name">Name</label>
            <input
              v-model.trim="signupForm.name"
              type="text"
              placeholder="Enter a username"
              id="name"
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
        </div>
      </section>
    </div>

    <div id="login">
      <transition name="fade">
        <div v-if="performingRequest" class="loading">
          <p>Loading...</p>
        </div>
      </transition>

      <section>
        <div
          class="col2"
          :class="{ 'signup-form': !showLoginForm && !showForgotPassword }"
        >
          <form v-if="showLoginForm" @submit.prevent>
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

            <button @click="login" class="button">Log In</button>

            <div class="extras">
              <a @click="togglePasswordReset">Forgot Password</a>
              <a @click="toggleForm">Create an Account</a>
            </div>
          </form>
          <form v-if="!showLoginForm && !showForgotPassword" @submit.prevent>
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
          <form
            v-if="showForgotPassword"
            @submit.prevent
            class="password-reset"
          >
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
  </div>
</template>

<script>
// import firebase bits
const fb = require("../firebaseConfig.js");
export default {
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      },
      signupForm: {
        name: "",
        title: "",
        email: "",
        password: ""
      },
      passwordForm: {
        email: ""
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: ""
    };
  },
  methods: {
    toggleForm() {
      this.errorMsg = "";
      this.showLoginForm = !this.showLoginForm;
    },
    togglePasswordReset() {
      if (this.showForgotPassword) {
        this.showLoginForm = true;
        this.showForgotPassword = false;
        this.passwordResetSuccess = false;
      } else {
        this.showLoginForm = false;
        this.showForgotPassword = true;
      }
    },
    login() {
      this.performingRequest = true;
      fb.auth
        .signInWithEmailAndPassword(
          this.loginForm.email,
          this.loginForm.password
        )
        .then(res => {
          this.$store.commit("setCurrentUser", res.user);
          this.$store.dispatch("fetchUserProfile");
          this.performingRequest = false;
          this.$router.push("/dashboard");
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    signup() {
      this.performingRequest = true;
      fb.auth
        .createUserWithEmailAndPassword(
          this.signupForm.email,
          this.signupForm.password
        )
        .then(res => {
          this.$store.commit("setCurrentUser", res.user);
          // create user obj
          fb.usersCollection
            .doc(res.user.uid)
            .set({
              name: this.signupForm.name
            })
            .then(() => {
              this.$store.dispatch("fetchUserProfile");
              this.performingRequest = false;
              this.$router.push("/dashboard");
            })
            .catch(err => {
              console.log(err);
              this.performingRequest = false;
              this.errorMsg = err.message;
            });
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    },
    resetPassword() {
      this.performingRequest = true;
      fb.auth
        .sendPasswordResetEmail(this.passwordForm.email)
        .then(() => {
          this.performingRequest = false;
          this.passwordResetSuccess = true;
          this.passwordForm.email = "";
        })
        .catch(err => {
          console.log(err);
          this.performingRequest = false;
          this.errorMsg = err.message;
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "src/assets/scss/_global.scss";
.wrapper {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: wrap;
}
.login-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
.sign-up-flex {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 0 5%;
  width: 90%;
  min-height: 100vh;
}

.login-text {
  // background: $primary;
  background: lightgreen;
  color: $white;
  line-height: 2;
}
.login-text a {
  text-decoration: underline;
  color: $white;
}
.login-text p {
  line-height: 1.5rem;
}

/* If the screen size is 601px wide or more */
@media screen and (min-width: 601px) {
  .wrapper section {
    flex: 1;
  }
}
/* If the screen size is 600px wide or less */
@media screen and (max-width: 600px) {
  .wrapper section {
    flex: 1 1 100%;
  }
}
</style>
