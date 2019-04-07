import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase/app";
import "firebase/auth";

import Login from "@/views/Login";
import Dashboard from "@/views/Dashboard";
import Settings from "@/views/Settings";

Vue.use(Router);

const router = new Router({
  // History mode allows us to use more readable url paths (/dashboard) as opposed to the default option (/#/dashboard).
  mode: "history",
  routes: [
    // Create a catchall route to handle incorrect routes.
    {
      path: "*",
      redirect: "/dashboard"
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/dashboard",
      name: "Dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings,
      meta: {
        requiresAuth: true
      }
    }
  ]
});
/*
Step 6: Set up the
beforeEach
navigation guard.
Check if the route exists and requires authentication. Then create a reference to the current user and authenticate routes.
If the route has the
requiresAuth
meta property set to true and the user is not logged in, redirect them to the log-in view. If the route has the
requiresAuth
meta property set to true and and the user is logged in, send them to whatever route they are trying to visit. For
else
, you just send them to whatever route they are trying to visit; this only fires if the route doesn't require authentication.
*/

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = firebase.auth().currentUser;

  if (requiresAuth && !currentUser) {
    next("/login");
  } else if (requiresAuth && currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
