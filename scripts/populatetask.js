//Calculate a given date in MS in the format of days:hours:minutes:seconds
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

//Populate task cards dynamically on the task list page. Populates task by remaining time as well
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
                       
                        let dateDeadlineTemp = doc.data().fullDeadline
                        let array = dateDeadlineTemp.split('-')

                        var taskTitle = doc.data().taskTitle; //gets the task title field
                        var taskDescription = doc.data().taskDescription; //gets the task description field
                        var dateDeadline = doc.data().displayDeadline; //gets the date deadline field
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
            console.log("No user is signed in")
        }
    })
}

function updateTime(){
        setInterval(() => {
        let taskItemTemplate = document.getElementById("taskItemTemplate");
        let taskList = document.getElementById("taskList");
        
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                db.collection("users").doc(user.uid).collection("tasks")
                    .orderBy("RemainingTime")
                    .get()
                    .then(allTasks => {
                        allTasks.forEach(doc => {
                           
                            let dateDeadlineTemp = doc.data().fullDeadline
                            let array = dateDeadlineTemp.split('-')
    
                            var timeRemainingInMs = new Date(array[0], array[1] - 1, array[2], array[3], array[4])
                            var remainingTime = calculateDate(timeRemainingInMs); // gets the time deadline field
    
                            document.querySelector('.time-deadline').innerHTML = remainingTime;  //equiv getElementByClassName

                        })
    
                    })
            } else {
                // No user is signed in
            }
        })
    }, 1000)
}

populateCardsDynamically()
