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
                        let datedeadlineTemp = doc.data().FullDeadline
                        let array = datedeadlineTemp.split('-')

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

                        if (remainingTime[0] == 0) {
                            testTaskList.querySelector('.urgentBtn').innerHTML = (`<button type="button" style = "margin-bottom: 10px;" class="btn btn-danger btn-sm">Urgent</button>`)
                        } else if ((5 > Number(remainingTime[0])) > 0) {
                            testTaskList.querySelector('.urgentBtn').innerHTML = (`<button type="button" style = "margin-bottom: 10px;" class="btn btn-warning btn-sm">Warning</button>`)
                        } else {
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