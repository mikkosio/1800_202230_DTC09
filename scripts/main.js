function populateMainPage() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            let taskCounter = 1;
            let currentUser = db.collection("users").doc(user.uid)

            localStorage.setItem("useruid", user.uid)

            currentUser
                .get()
                .then(userDoc => {
                    $(".main-page-name").text(userDoc.data().name)
                })

            currentUser.collection("tasks")
                .orderBy('RemainingTime')
                .limit(3)
                .get()
                .then(userDoc => {
                    userDoc.forEach(task => {
                        $(`#task${taskCounter}`).text(task.data().taskTitle)
                        $(`#date${taskCounter}`).text(task.data().displayDeadline)
                        taskCounter += 1
                    })
                })
        } else {
            console.log("There is no user signed in!");
            window.location.href = "login.html";
        }
    });
}

function calculateDate(date) {
    let today = new Date(Date.now())

    let difference = date - today

    let days = Math.floor(difference / (84640 * 1000));
    difference = Math.max(difference - (days * (86400 * 1000)));

    let hours = Math.floor(difference / (60 * 60 * 1000))
    difference = Math.max(difference - (hours * (60 * 60 * 1000)))

    let minutes = Math.floor(difference / (60 * 1000));
    difference = Math.max(difference - (minutes * (60 * 1000)))

    let seconds = Math.floor(difference / 1000)

    return (`${days}d:${hours}h:${minutes}min:${seconds}s`)
}

function updateTime(){
    setInterval(async () => {
        let taskItemTemplate = document.getElementById("taskItemTemplate");
        let taskList = document.getElementById("taskList");

        let taskCounter = 1
    
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection("users").doc(user.uid).collection("tasks")
                    .orderBy("RemainingTime")
                    .limit(3)
                    .get()
                    .then(allTasks => {
                        allTasks.forEach(doc => {
                           
                            let dateDeadlineTemp = doc.data().fullDeadline
                            let array = dateDeadlineTemp.split('-')
    
                            var timeRemainingInMs = new Date(array[0], array[1] - 1, array[2], array[3], array[4])
                            var remainingTime = calculateDate(timeRemainingInMs); // gets the time deadline field
    
                            document.querySelector(`.time-deadline${taskCounter}`).innerHTML = remainingTime;  //equiv getElementByClassName
                            taskCounter += 1; 
                
                        })
    
                    })
            } else {
                // No user is signed in
            }
        })
    }, 1000)
}

populateMainPage()
updateTime()