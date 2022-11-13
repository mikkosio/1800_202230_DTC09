

function submitTask() {

    var tasktitle = getInputValue('tasktitle');
    var taskdescription = getInputValue('taskdescription');

    var datedeadlinetemp = getInputValue('endDate');
    var month = datedeadlinetemp.slice(5, 7);
    var day = datedeadlinetemp.slice(8, 10);
    var year = datedeadlinetemp.slice(0, 4);

    if (month == '01') {
        month = 'January'
    } else if (month == '02') {
        month = 'February'
    }
    else if (month == '03') {
        month = 'March'
    }
    else if (month == '04') {
        month = 'April'
    }
    else if (month == '05') {
        month = 'May'
    }
    else if (month == '06') {
        month = 'June'
    }
    else if (month == '07') {
        month = 'July'
    }
    else if (month == '08') {
        month = 'August'
    }
    else if (month == '09') {
        month = 'September'
    }
    else if (month == '10') {
        month = 'October'
    }
    else if (month == '11') {
        month = 'November'
    }
    else if (month == '12') {
        month = 'December'
    }

    var datedeadline = month + " " + day + ", " + year


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
