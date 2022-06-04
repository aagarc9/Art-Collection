import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDPe2o8U3j-Za1J9-AOYBt2S7nNO-QpTIQ",
  authDomain: "evoke-c8f71.firebaseapp.com",
  projectId: "evoke-c8f71",
  storageBucket: "evoke-c8f71.appspot.com",
  messagingSenderId: "876928279699",
  appId: "1:876928279699:web:cf7e7915f1a05f5d499966"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
