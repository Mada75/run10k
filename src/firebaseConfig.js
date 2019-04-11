import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
const config = {
  apiKey: 'AIzaSyAqwW0SC1Pi6Srs5eR5FxyMpK54Q9ork0I',
  authDomain: 'adp-run-10k.firebaseapp.com',
  databaseURL: 'https://adp-run-10k.firebaseio.com',
  projectId: 'adp-run-10k',
  storageBucket: 'adp-run-10k.appspot.com',
  messagingSenderId: '402294319284'
}
firebase.initializeApp(config)

// firebase utils
const db = firebase.firestore()
const auth = firebase.auth()
const currentUser = auth.currentUser

// firebase collections
const usersCollection = db.collection('users')
const postsCollection = db.collection('posts')
const commentsCollection = db.collection('comments')
const likesCollection = db.collection('likes')

export {
  db,
  auth,
  currentUser,
  usersCollection,
  postsCollection,
  commentsCollection,
  likesCollection
}
