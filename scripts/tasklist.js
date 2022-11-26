const input = document.getElementsByName("input");

function bootstrapDelete() {
    $(this).parent().parent().remove();
};

function editFirestoreTask() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            var tasks_query = db.collection('users').doc(user.uid).collection('tasks').where('TaskTitle', '==', $(this).parent().find(".task-title").text());
            tasks_query.get().then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    doc.ref.delete();
                    db.collection("users").doc(user.uid).update({ "tasks_completed": firebase.firestore.FieldValue.increment(1) });
                });
            });
        }

        else {
            // No user is signed in.
        };
    })
};

function deleteTask() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here:
            $("body").on("click", "input", editFirestoreTask);
            $("body").on("click", "input", bootstrapDelete);
        } else {
            // No user is signed in.
        }
    });
};

$("body").on("click", "input", function confirmDelete() {
    if (confirm("Mark task complete?")) {
        deleteTask();
        txt = "Task completed!"
    }
    else {
        txt = "Cancelled.";
    }
});
