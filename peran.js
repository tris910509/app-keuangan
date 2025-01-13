document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
        document.getElementById("userName").textContent = currentUser.name;
        document.getElementById("userRole").textContent = currentUser.role;
    } else {
        window.location.href = "index.html"; // Jika tidak login, redirect ke halaman login
    }
});
