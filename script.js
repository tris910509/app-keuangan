document.addEventListener("DOMContentLoaded", function () {
    const app = document.getElementById("app");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));

    function renderNavbar() {
        let navbarHTML = `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Manajemen User</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
        `;

        // Navbar menu berdasarkan peran
        if (currentUser && currentUser.role === 'SupAdm') {
            navbarHTML += `
                <li class="nav-item"><a class="nav-link" href="#">Dashboard</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Manajemen User</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Laporan</a></li>
            `;
        } else if (currentUser && currentUser.role === 'Kasir') {
            navbarHTML += `
                <li class="nav-item"><a class="nav-link" href="#">Transaksi</a></li>
                <li class="nav-item"><a class="nav-link" href="#">Laporan</a></li>
            `;
        } else if (currentUser && currentUser.role === 'Other') {
            navbarHTML += `
                <li class="nav-item"><a class="nav-link" href="#">Dashboard</a></li>
            `;
        }

        navbarHTML += `
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="#">${currentUser ? `Hello, ${currentUser.name}` : 'Login'}</a></li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" id="logoutBtn">Logout</a>
                    </li>
                </ul>
            </div>
        </nav>
        `;

        document.body.insertAdjacentHTML('afterbegin', navbarHTML);

        // Logout button
        if (currentUser) {
            document.getElementById('logoutBtn').addEventListener('click', function () {
                localStorage.removeItem('currentUser');
                window.location.reload();
            });
        }
    }

    function renderUserPage() {
        app.innerHTML = `
            <div class="container mt-4">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h3>Manajemen User</h3>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addUserModal">+ Tambah User</button>
                </div>
                <table class="table table-hover table-striped">
                    <thead class="table-dark">
                        <tr>
                            <th>ID</th>
                            <th>Nama</th>
                            <th>Peran</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Aksi</th>
                        </tr>
                    </thead>
                    <tbody id="userTable">
                        ${users
                            .map(
                                (user) => `
                                <tr>
                                    <td>${user.id}</td>
                                    <td>${user.name}</td>
                                    <td>${user.role}</td>
                                    <td>${user.email}</td>
                                    <td>
                                        <div class="form-check form-switch">
                                            <input 
                                                class="form-check-input toggle-status" 
                                                type="checkbox" 
                                                data-id="${user.id}" 
                                                ${user.active ? "checked" : ""}
                                            >
                                            <label class="form-check-label">
                                                ${user.active ? "Aktif" : "Nonaktif"}
                                            </label>
                                        </div>
                                    </td>
                                    <td>
                                        <button class="btn btn-warning btn-sm edit-user" data-id="${user.id}">Edit</button>
                                        <button class="btn btn-danger btn-sm delete-user" data-id="${user.id}">Hapus</button>
                                    </td>
                                </tr>
                            `
                            )
                            .join("")}
                    </tbody>
                </table>
            </div>
        `;

        const toggleStatus = document.querySelectorAll(".toggle-status");
        toggleStatus.forEach((toggle) =>
            toggle.addEventListener("change", (e) => {
                const id = e.target.dataset.id;
                const user = users.find((u) => u.id === id);
                user.active = e.target.checked;
                saveUsers();
                renderUserPage();
            })
        );

        document.querySelectorAll(".edit-user").forEach((btn) =>
            btn.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                const user = users.find((u) => u.id === id);
                document.getElementById("userId").value = user.id;
                document.getElementById("userName").value = user.name;
                document.getElementById("userRole").value = user.role;
                document.getElementById("userEmail").value = user.email;
                document.getElementById("userPassword").value = "";
                document.getElementById("otherData").value = user.otherData || "";
                document.getElementById("manualData").style.display = user.role === "Other" ? "block" : "none";
                const modal = new bootstrap.Modal(document.getElementById("addUserModal"));
                modal.show();
            })
        );

        document.querySelectorAll(".delete-user").forEach((btn) =>
            btn.addEventListener("click", (e) => {
                const id = e.target.dataset.id;
                const index = users.findIndex((u) => u.id === id);
                if (index !== -1) {
                    users.splice(index, 1);
                    saveUsers();
                    renderUserPage();
                }
            })
        );

        document.getElementById("userRole").addEventListener("change", (e) => {
            document.getElementById("manualData").style.display = e.target.value === "Other" ? "block" : "none";
        });

        document.getElementById("userForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const id = document.getElementById("userId").value || Date.now().toString();
            const name = document.getElementById("userName").value;
            const role = document.getElementById("userRole").value;
            const email = document.getElementById("userEmail").value;
            const password = CryptoJS.MD5(document.getElementById("userPassword").value).toString();
            const otherData = document.getElementById("otherData").value;
            const active = true;

            const userIndex = users.findIndex((u) => u.id === id);

            if (userIndex !== -1) {
                users[userIndex] = { id, name, role, email, password, otherData, active };
            } else {
                users.push({ id, name, role, email, password, otherData, active });
            }

            saveUsers();
            const modal = bootstrap.Modal.getInstance(document.getElementById("addUserModal"));
            modal.hide();
            renderUserPage();
        });
    }

    function saveUsers() {
        localStorage.setItem("users", JSON.stringify(users));
    }

    // Render navbar and user page
    renderNavbar();
    renderUserPage();
});
