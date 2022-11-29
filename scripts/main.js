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
                     
                        let dateDeadlineTemp = task.data().fullDeadline
                        let array = dateDeadlineTemp.split('-')
                        var timeRemainingInMs = new Date(array[0], array[1] - 1, array[2], array[3], array[4])
                        var remainingTime = calculateDate(timeRemainingInMs); // gets the time deadline field

                        $(`#task${taskCounter}`).text(task.data().taskTitle)
                        $(`#date${taskCounter}`).text(task.data().displayDeadline)
                        $(`.time-deadline${taskCounter}`).text(remainingTime)

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
    difference = Math.max(difference - (days * (86400 * 1000)), 0);

    let hours = Math.floor(difference / (60 * 60 * 1000))
    difference = Math.max(difference - (hours * (60 * 60 * 1000)), 0)

    let minutes = Math.floor(difference / (60 * 1000));
    difference = Math.max(difference - (minutes * (60 * 1000)), 0)

    let seconds = Math.floor(difference / 1000)

    return (`${Math.max(days, 0)}d:${Math.max(hours, 0)}h:${Math.max(minutes, 0)}min:${Math.max(seconds, 0)}s`)
}

function updateTime(){
    setInterval(async () => {
    populateMainPage()
}, 400)}

updateTime()

