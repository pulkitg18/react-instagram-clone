import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAdFk6uUE5IxJmTCF47aQsdn3tVVp1CokI",
  authDomain: "instagram-reactjs-clone.firebaseapp.com",
  databaseURL: "https://instagram-reactjs-clone.firebaseio.com",
  projectId: "instagram-reactjs-clone",
  storageBucket: "instagram-reactjs-clone.appspot.com",
  messagingSenderId: "898450140839",
  appId: "1:898450140839:web:5111d5598541ca813a3582",
  measurementId: "G-EQQHDK6TPH",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
