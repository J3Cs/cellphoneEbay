import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/storage'


let firebaseConfig = {
    apiKey: "AIzaSyD-qir3F9sTQp4U-k9VRUSedeqE7qYrd54",
    authDomain: "cellphoneebayfpi.firebaseapp.com",
    projectId: "cellphoneebayfpi",
    storageBucket: "cellphoneebayfpi.appspot.com",
    messagingSenderId: "221639726621",
    appId: "1:221639726621:web:041178c8125d1ce5add8f4"
};

const app = firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
export const db = app.firestore();
export const storage = app.storage();