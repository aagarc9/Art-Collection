import { initializeApp } from 'firebase/app';
import firebase from "firebase";

// const firebaseConfig = {
//   apiKey: "AIzaSyBlolUPeYkvSP2l7j_bvTi5ddG5-iHI1K8",
//   authDomain: "art-collection-5ed5c.firebaseapp.com",
//   databaseURL: "https://art-collection-5ed5c-default-rtdb.firebaseio.com",
//   projectId: "art-collection-5ed5c",
//   storageBucket: "art-collection-5ed5c.appspot.com",
//   messagingSenderId: "629638784085",
//   appId: "1:629638784085:web:7d305321fa5b02235460dc",
//   measurementId: "G-HV65PWMQZL"
// };

// const app = initializeApp(firebaseConfig);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBlolUPeYkvSP2l7j_bvTi5ddG5-iHI1K8",
  authDomain: "art-collection-5ed5c.firebaseapp.com",
  databaseURL: "https://art-collection-5ed5c-default-rtdb.firebaseio.com",
  projectId: "art-collection-5ed5c",
  storageBucket: "art-collection-5ed5c.appspot.com",
  messagingSenderId: "629638784085",
  appId: "1:629638784085:web:7d305321fa5b02235460dc",
  measurementId: "G-HV65PWMQZL"
});


const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

