function populateCardsDynamically() {
    let taskItemTemplate = document.getElementById("taskItemTemplate");
    let taskList = document.getElementById("taskList");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).collection("tasks").get()
                .then(allTasks => {
                    allTasks.forEach(doc => {
                        let datedeadlineTemp = userDoc.data().DateDeadline
                        let array = datedeadlineTemp.split('-')

                        var taskTitle = doc.data().TaskTitle; //gets the task title field
                        var taskDescription = doc.data().TaskDescription; //gets the task description field
                        var dateDeadline = calculateDate(new Date(array[0], array[1], array[2], array[3], array[4])); //gets the date deadline field
                        var remainingTime = doc.data().RemainingTime; // gets the time deadline field

                     
                        let dateDeadlineInMs = 

                        let testTaskList = taskItemTemplate.content.cloneNode(true);
                        testTaskList.querySelector('.task-title').innerHTML = taskTitle;     //equiv getElementByClassName
                        testTaskList.querySelector('.task-description').innerHTML = taskDescription;  //equiv getElementByClassName
                        testTaskList.querySelector('.date-deadline').innerHTML = dateDeadline;  //equiv getElementByClassName
                        testTaskList.querySelector('.time-deadline').innerHTML = remainingTime;  //equiv getElementByClassName
                        taskList.prepend(testTaskList);
                    })

                })
        } else {
            // No user is signed in
        }
    })
}
populateCardsDynamically();