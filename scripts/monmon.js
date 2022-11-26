var currentUser
const monmonNames = ["Katty", "Poochy", "Croaky"];
const random = Math.floor(Math.random() * monmonNames.length);

//authenticate if user is logged in
firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        localStorage.setItem("useruid", user.uid)
        currentUser = db.collection("users").doc(user.uid)

        //functions to populate tasks on quest of day and monmon 
        insertMonmon()
        updateTasks();
        updateMonmon();
        populateTasks()
    }
    else {
        console.log("Error: Not a user.")
    }
})

//Inject monmon into html
function insertMonmon() {
    currentUser
        .onSnapshot(userDoc => {
            document.getElementById("creature-name").innerHTML = userDoc.data().monmon;
            document.getElementById("room-name").innerHTML = userDoc.data().monmon;
            document.getElementById("monmonimage").src = "./images/" + userDoc.data().monmon + ".gif";
            document.getElementById("hatch_status").innerHTML = " hasn't hatched yet... Complete more requests so he/she grows up!"
        })
}

//Task progress updater to hatch mon mon
function updateTasks() {
    currentUser
        .onSnapshot(userDoc => {
            document.getElementById("number_of_tasks").innerHTML = userDoc.data().tasks_completed + "/10 Tasks Complete";
            document.getElementById("progressBar").style.width = `${(userDoc.data().tasks_completed) * 10}%`;
        })
}

//Updating monmon upon hatching
function updateMonmon() {
    currentUser
        .onSnapshot(userDoc => {
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

//Populate tasks on the monmon page
function populateTasks() {
    let monmonTaskTemplate = document.getElementById("monmonTaskTemplate");
    let monmonTaskContainer = document.getElementById("monmonTaskContainer")

    let date = new Date();
    let taskCounter = 1;

    currentUser.collection("tasks")
        .orderBy("RemainingTime")
        .limit(1)
        .get()
        .then(userDoc => {
            userDoc.forEach(task => {
                let monmonTaskCard = monmonTaskTemplate.content.cloneNode(true);

                monmonTaskCard.querySelector(".task").innerHTML = task.data().taskTitle
                monmonTaskCard.querySelector(".date").innerHTML = task.data().displayDeadline
                monmonTaskContainer.appendChild(monmonTaskCard)
            })
        })
}
