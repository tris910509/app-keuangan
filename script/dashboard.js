document.addEventListener("DOMContentLoaded", () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "index.html";
        return;
    }

    document.querySelector(".navbar-brand").textContent = `${currentUser.role} Dashboard`;

    // Navigasi antar fitur
    window.navigateTo = (feature) => {
        alert(`Navigasi ke fitur ${feature}!`); // Tambahkan implementasi navigasi.
    };
});
