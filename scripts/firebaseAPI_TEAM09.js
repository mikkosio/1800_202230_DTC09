//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyADQDZBP6RTsx9bDl_nRMUeJILWkM8Dj4I",
    authDomain: "comp1800-f1811.firebaseapp.com",
    projectId: "comp1800-f1811",
    storageBucket: "comp1800-f1811.appspot.com",
    messagingSenderId: "335676124219",
    appId: "1:335676124219:web:e19cd695ca63e4514f801e"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();