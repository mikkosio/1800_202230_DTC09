//Task complete submit button inside modal
const input = document.getElementsByName("btn btn-primary");

//Delete HTML bootstrap for task that is completed
function bootstrapDelete() {
    $(this).parent().parent().remove();
    console.log("Task Deleted")
};

//Edit the firestore database to remove completed tasks by querying for tasks in database with same task title as the completed task
function editFirestoreTask() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in
        if (user) {
            var tasks_query = db.collection('users').doc(user.uid).collection('tasks').where('taskTitle', '==', $(this).parent().find(".task-title").text());
            tasks_query.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                    db.collection("users").doc(user.uid).update({ "tasks_completed": firebase.firestore.FieldValue.increment(1) });
                });
            });
        }
        else {
            console.log("No user is signed in")
        };
    })
};

function deleteTask() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here:
            $('#deleteTask').on('hidden.bs.modal', editFirestoreTask)
            $('#deleteTask').on('hidden.bs.modal', bootstrapDelete)
        } else {
            console.log("No user is signed in")
        }
    });
};

//Show confirmation modal for delete task
function deleteTaskModal() {
    $('#deleteTask').modal('show')
}

//Close modal 
function closeModal() {
    $('#deleteTask').modal('hide')
}

