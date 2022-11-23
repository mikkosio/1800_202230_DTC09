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
                TaskTitle: tasktitle,
                TaskDescription: taskdescription,
                FullDeadline: dateDeadlineFireBase,
                DisplayDeadline: dateDeadlineDisplay,
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
