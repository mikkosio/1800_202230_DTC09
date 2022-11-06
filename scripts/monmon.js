function insertMonmon() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {                                                               //arrow notation                 //.data() returns data object
                    document.getElementById("creature-name").innerHTML = userDoc.data().monmon;
                    document.getElementById("room-name").innerHTML = userDoc.data().monmon;
                    document.getElementById("monmonimage").src = "./images/" + userDoc.data().monmon + ".gif";
                })
        }
        else {
            console.log("Error: Not a user.")
        }
    })
}
insertMonmon(); //run the function