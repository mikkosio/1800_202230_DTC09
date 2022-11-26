// Populate main page with user's name and urgent tasks
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

populateMainPage()