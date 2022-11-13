function bootstrapDelete() {
    $(this).parent().remove();
};


function deleteTask() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            var checkBox = document.getElementsByClassName("form-check-input flex-shrink-0")
            $("body").on("click", "label", bootstrapDelete);

        } else {
            // No user is signed in.
        }
    });
};
deleteTask();