var form = document.getElementById("taskForm");
function handleForm(event) { event.preventDefault(); }
form.addEventListener('submit', handleForm);
form.addEventListener('submit', submitTask);

//Function to initiate submit task
function submitTask() {
    var tasktitle = getInputValue('tasktitle');
    var taskdescription = getInputValue('taskdescription');
    var datedeadline = getInputValue('endDate').split('-')
    let dateDeadlineFireBase = `${datedeadline[0]}-${datedeadline[1]}-${datedeadline[2]}-${getInputValue("hour")}-${getInputValue("minute")}`
    let dateDeadlineDisplay = `${datedeadline[0]}-${datedeadline[1]}-${datedeadline[2]}`
    let timeRemainingInMs = new Date(datedeadline[0], datedeadline[1] - 1, datedeadline[2], getInputValue("hour"), getInputValue("minute")) - new Date(Date.now())

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            var task = db.collection("users").doc(user.uid).collection('tasks').doc(task).set({
                TaskTitle: tasktitle, // task title
                TaskDescription: taskdescription, // taskd description
                FullDeadline: dateDeadlineFireBase, // full deadline to use to update remaining time on task page 
                DisplayDeadline: dateDeadlineDisplay, // date formatted to display on HTMl 
                RemainingTime: timeRemainingInMs
            }).then(() => {
                window.location.href = "taskadded.html";
            })
        } else {
            // User not logged in or has just logged out.
        }
    });

}

function getInputValue(id) {
    return document.getElementById(id).value;
}


