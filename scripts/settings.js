// firebase user global variable 
var currentUser

//check if user is logged in
firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        populateSettings()
    } else {
        console.log("No user is signed in!")
    }
});

//Edit user settings by allowing form to be fillable
function editUserSettings() {
    document.getElementById('personalInfoFields').disabled = false;
}

//Save user info and write to firestore database to save new username
function saveUserInfo() {
    firstName = document.getElementById("firstname").value
    lastName = document.getElementById("lastname").value

    currentUser.update({
        name: `${firstName} ${lastName}`,
    })
        .then(() => {
            console.log("Document successfully updated.")
            document.getElementById('personalInfoFields').disabled = true;
        })
    alert("Changes succesfully saved")
}

//populate the settings page by reading from firestore database, specifically the user's name on the settings page
function populateSettings() {
    currentUser
        .onSnapshot(userDoc => {
            var firstName = userDoc.data().name.split(' ')[0]
            var lastName = userDoc.data().name.split(' ')[1]

            if (firstName != null) {
                document.getElementById("firstname").value = firstName;
            }
            if (lastName != null) {
                document.getElementById("lastname").value = lastName;

                $(".name-goes-here").text(userDoc.data().name); 
                $(".email-goes-here").text(user_Email); 
            }
        })
}



