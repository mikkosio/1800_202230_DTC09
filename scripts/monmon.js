function insertMonmon() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {                                                               //arrow notation                 //.data() returns data object
                    document.getElementById("creature-name").innerHTML = userDoc.data().monmon;
                    document.getElementById("room-name").innerHTML = userDoc.data().monmon;
                    document.getElementById("monmonimage").src = "./images/" + userDoc.data().monmon + ".gif";
                    document.getElementById("hatch_status").innerHTML = " hasn't hatched yet... Complete more requests so he/she grows up!"

                })
        }
        else {
            console.log("Error: Not a user.")
        }
    })
}
insertMonmon(); //run the function

function updateTasks() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {                                                               //arrow notation                 //.data() returns data object
                    document.getElementById("number_of_tasks").innerHTML = userDoc.data().tasks_completed + "/10 Tasks Complete";
                    document.getElementById("progressBar").style.width = `${(userDoc.data().tasks_completed) * 10}%`;
                })
        }
        else {
            console.log("Error: Not a user.")
        }
    })
}
updateTasks();

const monmonNames = ["Katty", "Poochy", "Croaky"];
const random = Math.floor(Math.random() * monmonNames.length);

function updateMonmon() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            db.collection("users").doc(user.uid)
                .onSnapshot(userDoc => {                                                               //arrow notation                 //.data() returns data object
                    var userTasks = userDoc.data().tasks_completed;
                    if (userTasks >= 10) {
                        var userMonmon = userDoc.data().monmon;
                        if (userMonmon == 'Eggy') {
                            db.collection("users").doc(user.uid).update({
                                monmon: monmonNames[random]
                            })
                        }
                        else {
                            document.getElementById("hatch_status").innerHTML = " has hatched! Congratulations on your new friend!";
                            console.log("Your MonMon has already hatched!")
                        }
                    }
                })
        }
    })

}
updateMonmon();

function populateTasks() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            let monmonTaskTemplate = document.getElementById("monmonTaskTemplate");
            let monmonTaskContainer = document.getElementById("monmonTaskContainer")

            let date = new Date();
            let taskCounter = 1;

            localStorage.setItem("useruid", user.uid)

            db.collection("users").doc(user.uid).collection("tasks")
                .orderBy("RemainingTime")
                .limit(3)
                .get()
                .then(userDoc => {
                    userDoc.forEach(task => {
                        let monmonTaskCard = monmonTaskTemplate.content.cloneNode(true);

                        monmonTaskCard.querySelector(".task").innerHTML = task.data().TaskTitle
                        monmonTaskCard.querySelector(".date").innerHTML = task.data().DisplayDeadline
                        monmonTaskContainer.appendChild(monmonTaskCard)
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

populateTasks()