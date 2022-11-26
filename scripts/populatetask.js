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


function populateCardsDynamically() {
    let taskItemTemplate = document.getElementById("taskItemTemplate");
    let taskList = document.getElementById("taskList");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).collection("tasks")
                .orderBy("RemainingTime")
                .get()
                .then(allTasks => {
                    allTasks.forEach(doc => {
                        let dateDeadlineTemp = doc.data().FullDeadline
                        let array = dateDeadlineTemp.split('-')


                        var taskTitle = doc.data().TaskTitle; //gets the task title field
                        var taskDescription = doc.data().TaskDescription; //gets the task description field
                        var dateDeadline = doc.data().DisplayDeadline; //gets the date deadline field
                        var timeRemainingInMs = new Date(array[0], array[1] - 1, array[2], array[3], array[4])
                        var remainingTime = calculateDate(timeRemainingInMs); // gets the time deadline field



                        let testTaskList = taskItemTemplate.content.cloneNode(true);
                        testTaskList.querySelector('.task-title').innerHTML = taskTitle;     //equiv getElementByClassName
                        testTaskList.querySelector('.task-description').innerHTML = taskDescription;  //equiv getElementByClassName
                        testTaskList.querySelector('.date-deadline').innerHTML = dateDeadline;  //equiv getElementByClassName
                        testTaskList.querySelector('.time-deadline').innerHTML = remainingTime;  //equiv getElementByClassName

                        var timeLabel = new Date(timeRemainingInMs) - new Date(Date.now())

                        if (timeLabel <= (Number(84000 * 1000))) {
                            testTaskList.querySelector('.urgentBtn').innerHTML = (`<button type="button" style = "margin-bottom: 10px;" class="btn btn-danger btn-sm">Urgent</button>`)
                        } else if (timeLabel < (Number(7 * (84000 * 1000)))) {
                            testTaskList.querySelector('.urgentBtn').innerHTML = (`<button type="button" style = "margin-bottom: 10px;" class="btn btn-warning btn-sm">Warning</button>`)
                        } else if (timeLabel >= (Number(7 * (86400 * 1000)))) {
                            testTaskList.querySelector('.urgentBtn').innerHTML = (`<button type="button" style = "margin-bottom: 10px;" class="btn btn-success btn-sm">Healthy</button>`)
                        }

                        taskList.append(testTaskList);
                    })

                })
        } else {
            // No user is signed in
        }
    })
}
populateCardsDynamically();