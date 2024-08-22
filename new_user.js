document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registerForm");
    const messageElement = document.getElementById("message");
 
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
 
        if (password !== confirmPassword) {
            messageElement.textContent = "Passwords do not match.";
            return;
        }
 
        try {
            const usernameCheckResponse = await fetch(`api/username_available/${username}`);
            const usernameAvailable = await usernameCheckResponse.text();
 
            if (usernameAvailable === "NO") {
                messageElement.textContent = "Username is already taken.";
                return;
            }
 
            const response = await fetch("api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, username, password }),
            });
 
            if (response.status === 403) {
                messageElement.textContent = "Username already in use.";
            } else if (response.ok) {
                messageElement.textContent = "User registered successfully. Redirecting to the ToDo List...";
                setTimeout(() => {
                    window.location.href = "user-todos.html"; // Redirect to user-todos.html after 2 seconds
                }, 2000);
            } else {
                messageElement.textContent = "An error occurred. Please try again.";
            }
        } catch (error) {
            messageElement.textContent = "An error occurred. Please try again.";
        }
    });
});
 