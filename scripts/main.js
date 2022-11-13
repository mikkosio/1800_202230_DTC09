function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid);
            localStorage.setItem("useruid", user.uid)
            console.log(user.displayName);
            user_Name = user.displayName;

            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
            $(".name-goes-here").text(user_Name); //using jquery

        } else {
            // No user is signed in.
        }
    });
}

function populuateMainpage () {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            let date = new Date();
            let taskCounter = 1;

            localStorage.setItem("useruid", user.uid)

            db.collection("users").doc(user.uid).collection("tasks").get()
                .then(userTask => {
                    userTask.forEach(userDoc => {
                        if (taskCounter <= 3) {
                            if(userDoc.data().DateDeadline == "November 12, 2022"){
                                console.log(userDoc.data().TaskTitle)
                                $(`#task${taskCounter}`).text(userDoc.data().TaskTitle)
                                $(`#date${taskCounter}`).text(userDoc.data().DateDeadline)
                                taskCounter += 1
                            }
                        }
                    })
            })

   
            //method #1:  insert with html only
            //document.getElementById("name-goes-here").innerText = user_Name;    //using javascript
            //method #2:  insert using jquery
        } else {
            // No user is signed in.
        }
    });
}

insertName(); //run the function
populuateMainpage()