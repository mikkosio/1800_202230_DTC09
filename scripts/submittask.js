function submitTask() {
    var tasktitle = getInputValue('tasktitle');
    var taskdescription = getInputValue('taskdescription');

    var datedeadline = getInputValue('endDate').split('-')
 
    let date = new Date(datedeadline[0], datedeadline[1] - 1 , datedeadline[2], Number(getInputValue("hour")), Number(getInputValue("minute")));

    let timeRemaining = calculateDate(date)

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            // User logged in already or has just logged in.
            var task = db.collection("users").doc(user.uid).collection('tasks').doc(task).set({
                TaskTitle: tasktitle,
                TaskDescription: taskdescription,
                DateDeadline: date,
                RemainingTime: timeRemaining
            });

        } else {
            // User not logged in or has just logged out.
        }
    });

    document.querySelector('#alert').style.display = "block";
}

function getInputValue(id) {
    return document.getElementById(id).value;
}


function calculateDate(date){
    let today = new Date(Date.now())

    let difference = date - today
 
    let days = Math.floor(difference / (84640 * 1000));
    difference -= days * (86400 * 1000); 

    let hours = Math.floor(difference / (60 * 60 * 1000))
    difference -= hours * (60 * 60 * 1000)

    let minutes = Math.floor(difference / (60 * 1000));
    difference -= minutes * (60 * 1000)

    let seconds = Math.floor(difference / 1000)

    return (`${days}d:${hours}h:${minutes}min:${seconds}s`)
}

calculateDate()
