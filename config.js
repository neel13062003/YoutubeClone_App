import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBoK0dn7Gsxo2TSNTmc8IkyMNcVX5pp95s",
  authDomain: "virtual-sylph-390212.firebaseapp.com",
  projectId: "virtual-sylph-390212",
  storageBucket: "virtual-sylph-390212.appspot.com",
  messagingSenderId: "860404961517",
  appId: "1:860404961517:web:a19b10685bcebb4daafce4",
  measurementId: "G-D7D0FBSDZB"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
export {firebase}