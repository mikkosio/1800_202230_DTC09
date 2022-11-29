//Task form object
var form = document.getElementById("taskForm");

//Prevent user from inputting an empty form
function handleForm(event) { event.preventDefault(); }

//Event listeners for task submission
form.addEventListener('submit', handleForm);
form.addEventListener('submit', submitTask);

//Function to initiate submit task
function submitTask() {
    var taskTitle = getInputValue('tasktitle');
    var taskDescription = getInputValue('taskdescription');
    var dateDeadline = getInputValue('endDate').split('-')
    let dateDeadlineFireBase = `${dateDeadline[0]}-${dateDeadline[1]}-${dateDeadline[2]}-${getInputValue("hour")}-${getInputValue("minute")}`
    let dateDeadlineDisplay = `${dateDeadline[0]}-${dateDeadline[1]}-${dateDeadline[2]}`
    let timeRemainingInMs = new Date(dateDeadline[0], dateDeadline[1] - 1, dateDeadline[2], getInputValue("hour"), getInputValue("minute")) - new Date(Date.now())

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            var task = db.collection("users").doc(user.uid).collection('tasks').doc(task).set({
                taskTitle: taskTitle, // task title
                taskDescription: taskDescription, // task description
                fullDeadline: dateDeadlineFireBase, // full deadline to use to update remaining time on task page 
                displayDeadline: dateDeadlineDisplay, // date formatted to display on HTMl 
                RemainingTime: timeRemainingInMs
            }).then(() => {
                window.location.href = "taskadded.html";
            })
        } else {
            // User not logged in or has just logged out.
        }
    });

}

//Retrieve id value entered
function getInputValue(id) {
    return document.getElementById(id).value;
}


