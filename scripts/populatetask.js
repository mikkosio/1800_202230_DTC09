function populateCardsDynamically() {
    let taskItemTemplate = document.getElementById("taskItemTemplate");
    let taskList = document.getElementById("taskList");

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(123)
            db.collection("users").doc(user.uid).collection("tasks").get()
                .then(allTasks => {
                    allTasks.forEach(doc => {
                        var taskTitle = doc.data().TaskTitle; //gets the task title field
                        var taskDescription = doc.data().TaskDescription; //gets the task description field
                        var dateDeadline = doc.data().DateDeadline; //gets the date deadline field
                        var timeDeadline = doc.data().TimeDeadline; // gets the time deadline field
                        let testTaskList = taskItemTemplate.content.cloneNode(true);
                        testTaskList.querySelector('.task-title').innerHTML = taskTitle;     //equiv getElementByClassName
                        testTaskList.querySelector('.task-description').innerHTML = taskDescription;  //equiv getElementByClassName
                        testTaskList.querySelector('.date-deadline').innerHTML = dateDeadline;  //equiv getElementByClassName
                        testTaskList.querySelector('.time-deadline').innerHTML = timeDeadline;  //equiv getElementByClassName
                        taskList.prepend(testTaskList);
                    })

                })
        } else {
            // No user is signed in
        }
    })
}
populateCardsDynamically();