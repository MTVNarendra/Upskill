document.addEventListener("DOMContentLoaded", () => {
    // Populate users dropdown
    fetch('api/users')
        .then(response => response.json())
        .then(users => {
            const userSelect = document.getElementById("userid");
            users.forEach(user => {
                const option = document.createElement("option");
option.value = user.id;
option.textContent = user.name;
                userSelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading users:", error);
        });
 
    // Populate categories dropdown
    fetch('api/categories')
        .then(response => response.json())
        .then(categories => {
            const categorySelect = document.getElementById("category");
            categories.forEach(category => {
                const option = document.createElement("option");
option.value = category.id;
option.textContent = category.name;
                categorySelect.appendChild(option);
            });
        })
        .catch(error => {
            console.error("Error loading categories:", error);
        });
});