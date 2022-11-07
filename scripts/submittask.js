

function submitTask() {

    var tasktitle = getInputValue('tasktitle');
    var taskdescription = getInputValue('taskdescription');
    var datedeadline = getInputValue('endDate');
    var timedeadline = String(getInputValue('hour')) + ":" + String(getInputValue('minute'));

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            var task = db.collection("users").doc(user.uid).collection('tasks').doc(task).set({
                TaskTitle: tasktitle,
                TaskDescription: taskdescription,
                DateDeadline: datedeadline,
                TimeDeadline: timedeadline
            });

        } else {
            // User not logged in or has just logged out.
        }
    });

    document.querySelector('#alert').style.display = "block";

    setTimeout(function () {
        location.reload();
    }, 1500);
}

function getInputValue(id) {
    return document.getElementById(id).value;
}
