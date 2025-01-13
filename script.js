document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    // Helper Functions
    const generateId = () => Date.now().toString();
    const saveData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

    // Redirect if not logged in
    if (!currentUser && !["index.html", "register.html"].includes(location.pathname.split("/").pop())) {
        alert("Silakan login terlebih dahulu!");
        window.location.href = "index.html";
    }

    // Render Current User Info
    if (currentUser) {
        const userNameElem = document.getElementById("userName");
        const userRoleElem = document.getElementById("userRole");
        if (userNameElem && userRoleElem) {
            userNameElem.textContent = currentUser.name;
            userRoleElem.textContent = currentUser.role;
        }
    }

    // Logout Functionality
    const logoutBtn = document.getElementById("logout");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("currentUser");
            window.location.href = "index.html";
        });
    }

    // Login Functionality
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            const user = users.find(
                (u) => u.email === email && u.password === CryptoJS.MD5(password).toString()
            );

            if (user) {
                localStorage.setItem("currentUser", JSON.stringify(user));
                redirectToDashboard(user.role);
            } else {
                alert("Email atau password salah.");
            }
        });
    }

    // Registration Functionality
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const password = CryptoJS.MD5(document.getElementById("password").value).toString();
            const role = document.getElementById("role").value;

            if (users.some((u) => u.email === email)) {
                alert("Email sudah terdaftar!");
            } else {
                const newUser = {
                    id: generateId(),
                    name,
                    email,
                    password,
                    role,
                };
                users.push(newUser);
                saveData("users", users);
                alert("Registrasi berhasil!");
                window.location.href = "index.html";
            }
        });
    }

    // Redirect Based on Role
    function redirectToDashboard(role) {
        if (role === "SupAdm") {
            window.location.href = "dashboardSupAdm.html";
        } else if (role === "Kasir") {
            window.location.href = "dashboardKasir.html";
        } else if (role === "Other") {
            window.location.href = "dashboardOther.html";
        }
    }

    // CRUD for Users (Super Admin Only)
    const userTable = document.getElementById("userTable");
    if (userTable && currentUser.role === "SupAdm") {
        renderUsers();

        document.getElementById("addUserForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("addUserName").value;
            const email = document.getElementById("addUserEmail").value;
            const password = CryptoJS.MD5(document.getElementById("addUserPassword").value).toString();
            const role = document.getElementById("addUserRole").value;

            const newUser = {
                id: generateId(),
                name,
                email,
                password,
                role,
            };

            users.push(newUser);
            saveData("users", users);
            renderUsers();
            alert("User berhasil ditambahkan!");
            e.target.reset();
        });
    }

    function renderUsers() {
        userTable.innerHTML = "";
        users.forEach((user) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.role}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editUser('${user.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.id}')">Hapus</button>
                </td>
            `;
            userTable.appendChild(row);
        });
    }

    window.editUser = (id) => {
        const user = users.find((u) => u.id === id);
        if (user) {
            const newName = prompt("Nama Baru:", user.name);
            const newEmail = prompt("Email Baru:", user.email);
            const newRole = prompt("Peran Baru (SupAdm/Kasir/Other):", user.role);

            if (newName && newEmail && newRole) {
                user.name = newName;
                user.email = newEmail;
                user.role = newRole;
                saveData("users", users);
                renderUsers();
                alert("User berhasil diubah!");
            }
        }
    };

    window.deleteUser = (id) => {
        if (confirm("Yakin ingin menghapus user ini?")) {
            const index = users.findIndex((u) => u.id === id);
            if (index > -1) {
                users.splice(index, 1);
                saveData("users", users);
                renderUsers();
                alert("User berhasil dihapus!");
            }
        }
    };

    // Repeat similar CRUD functionality for Customers, Suppliers, Transactions, etc.

    // Example: CRUD for Customers
    const customerTable = document.getElementById("customerTable");
    if (customerTable && currentUser.role === "SupAdm") {
        renderCustomers();

        document.getElementById("addCustomerForm").addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("addCustomerName").value;
            const email = document.getElementById("addCustomerEmail").value;
            const phone = document.getElementById("addCustomerPhone").value;

            const newCustomer = {
                id: generateId(),
                name,
                email,
                phone,
            };

            customers.push(newCustomer);
            saveData("customers", customers);
            renderCustomers();
            alert("Pelanggan berhasil ditambahkan!");
            e.target.reset();
        });
    }

    function renderCustomers() {
        customerTable.innerHTML = "";
        customers.forEach((customer) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${customer.id}</td>
                <td>${customer.name}</td>
                <td>${customer.email}</td>
                <td>${customer.phone}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editCustomer('${customer.id}')">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteCustomer('${customer.id}')">Hapus</button>
                </td>
            `;
            customerTable.appendChild(row);
        });
    }

    window.editCustomer = (id) => {
        const customer = customers.find((c) => c.id === id);
        if (customer) {
            const newName = prompt("Nama Baru:", customer.name);
            const newEmail = prompt("Email Baru:", customer.email);
            const newPhone = prompt("No. Telepon Baru:", customer.phone);

            if (newName && newEmail && newPhone) {
                customer.name = newName;
                customer.email = newEmail;
                customer.phone = newPhone;
                saveData("customers", customers);
                renderCustomers();
                alert("Pelanggan berhasil diubah!");
            }
        }
    };

    window.deleteCustomer = (id) => {
        if (confirm("Yakin ingin menghapus pelanggan ini?")) {
            const index = customers.findIndex((c) => c.id === id);
            if (index > -1) {
                customers.splice(index, 1);
                saveData("customers", customers);
                renderCustomers();
                alert("Pelanggan berhasil dihapus!");
            }
        }
    };
});

document.addEventListener("DOMContentLoaded", () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    const products = JSON.parse(localStorage.getItem("products")) || [];
    const transactions = JSON.parse(localStorage.getItem("transactions")) || [];

    // Navigasi antar fitur
    window.navigateTo = (feature) => {
        alert(`Navigasi ke fitur ${feature}!`); // Ganti dengan navigasi ke halaman terkait.
    };

    // Render Chart
    const ctx = document.getElementById("dashboardChart").getContext("2d");
    const chartData = {
        labels: ["User", "Pelanggan", "Supplier", "Kategori", "Produk", "Transaksi"],
        datasets: [
            {
                label: "Jumlah Data",
                data: [
                    users.length,
                    customers.length,
                    suppliers.length,
                    categories.length,
                    products.length,
                    transactions.length,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.7)",
                    "rgba(75, 192, 192, 0.7)",
                    "rgba(255, 206, 86, 0.7)",
                    "rgba(153, 102, 255, 0.7)",
                    "rgba(255, 159, 64, 0.7)",
                    "rgba(255, 99, 132, 0.7)",
                ],
                borderColor: [
                    "rgba(54, 162, 235, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                    "rgba(255, 99, 132, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top",
                },
            },
        },
    });
});



