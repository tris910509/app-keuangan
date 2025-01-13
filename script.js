document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const toRegisterLink = document.getElementById("toRegister");
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Form login submit
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Mencari pengguna berdasarkan email
        const user = users.find(u => u.email === email);

        if (user && user.password === CryptoJS.MD5(password).toString()) {
            // Jika email dan password cocok, simpan data pengguna yang login ke localStorage
            localStorage.setItem("currentUser", JSON.stringify(user));

            // Redirect ke halaman utama sesuai peran
            if (user.role === 'SupAdm') {
                window.location.href = 'dashboardSupAdm.html';
            } else if (user.role === 'Kasir') {
                window.location.href = 'dashboardKasir.html';
            } else if (user.role === 'Other') {
                window.location.href = 'dashboardOther.html';
            }
        } else {
            alert("Email atau password salah.");
        }
    });

    // Link ke halaman pendaftaran
    toRegisterLink.addEventListener("click", function (e) {
        e.preventDefault();
        window.location.href = 'register.html'; // Arahkan ke halaman registrasi
    });
});
