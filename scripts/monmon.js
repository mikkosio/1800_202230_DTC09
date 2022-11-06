var db = firebase.firestore();
var ui = new firebaseui.auth.AuthUI(firebase.auth());
var user = firebase.auth().currentUser;
var monmonRef = db.collection("users").doc(user.uid);

function insertMonmon() {
    monmonRef
        .get()
        .then(
            snap => {                       //input arg "snap" is snapshot return from get()
                console.log(snap.data());     //print key value pairs
            });
}
$(document).ready(insertMonmon)