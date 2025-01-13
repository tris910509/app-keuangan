document.addEventListener("DOMContentLoaded", function () {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Login
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const user = users.find(u => u.email === email && u.password === CryptoJS.MD5(password).toString());

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                redirectToDashboard(user.role);
            } else {
                alert("Email atau password salah.");
            }
        });
    }

    // Registrasi
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = CryptoJS.MD5(document.getElementById("password").value).toString();
            const role = document.getElementById("role").value;

            if (users.some(u => u.email === email)) {
                alert("Email sudah terdaftar!");
            } else {
                const newUser = { id: Date.now(), name, email, password, role };
                users.push(newUser);
                localStorage.setItem("users", JSON.stringify(users));
                alert("Registrasi berhasil!");
                window.location.href = "index.html";
            }
        });
    }

    // Redirect berdasarkan role
    function redirectToDashboard(role) {
        if (role === "SupAdm") {
            window.location.href = "dashboardSupAdm.html";
        } else if (role === "Kasir") {
            window.location.href = "dashboardKasir.html";
        } else if (role === "Other") {
            window.location.href = "dashboardOther.html";
        }
    }

    // Logout
    const logoutButton = document.getElementById("logout");
    if (logoutButton) {
        logoutButton.addEventListener("click", function () {
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });
    }
});


