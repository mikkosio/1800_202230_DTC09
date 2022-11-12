var currentUser

function changeName() {
    newFirstName = $("#firstname").val()
    newLastName = $("#lastname").val()

    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            if (newFirstName == "") {
                newFirstName = user.displayName.split(' ')[0]
            }

            if (newLastName == "") {
                newLastName = user.displayName.split(' ')[1]
            }
            
            user.updateProfile({
                displayName: `${newFirstName} ${newLastName}`,
            }).then(() => {
            }).catch((error) => {
                // An error occurred
                // ...
            });
            alert("Settings successfully saved!")
        } else {
            // No user is signed in.
        }
    });
}

function editUserSettings() {
    document.getElementById('personalInfoFields').disabled = false;
}

function populateSettings() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {

            console.log(user.uid);
            console.log(user.displayName);
    
            currentUser = db.collection("users").doc(user.uid);
            
            currentUser.get()
                .then(userDoc => {
                    var firstName = userDoc.data().name.split(' ')[0]
                    var lastName = userDoc.data().name.split(' ')[1]

                    if (firstName != null) {
                        document.getElementById("firstname").value = firstName;
                    }
                    if (lastName != null) {
                        document.getElementById("lastname").value = lastName;

                    user.updateProfile({
                        displayName: `${firstName} ${lastName}`,
                    }).then(() => {
                        console.log("Display name updated.")
                    }).catch((error) => {
                        console.log("Could not update display name.")
                    });

                    $(".name-goes-here").text(user.displayName); //using jquery
                    $(".email-goes-here").text(user_Email); //using jquery

                    }                    
                })

              

        } else {
            // No user is signed in.
        }
    });
}

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

populateSettings()
