const state = {
    currentUser: null,
    users: [
        { id: 1, username: "admin", password: "admin", role: "Super Admin" },
        { id: 2, username: "kasir", password: "kasir", role: "Kasir" },
    ],
    customers: [],
    suppliers: [],
    categories: [],
    items: [],
    products: [],
    transactions: [],
};

const views = {
    login: `
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2 class="text-center">Login</h2>
                <form id="login-form">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username</label>
                        <input type="text" class="form-control" id="username" required>
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" class="form-control" id="password" required>
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                </form>
            </div>
        </div>
    `,
    dashboard: `
        <h2>Dashboard</h2>
        <p>Selamat datang, <span id="user-role"></span>!</p>
    `,
    managementTable: (type) => `
        <div class="d-flex justify-content-between align-items-center mb-3">
            <h2>Manajemen ${type}</h2>
            <button class="btn btn-primary" id="add-btn">Tambah ${type}</button>
        </div>
        <table class="table table-bordered">
            <thead>
                <tr id="table-headers"></tr>
            </thead>
            <tbody id="table-body">
                <!-- Data akan dimuat oleh JavaScript -->
            </tbody>
        </table>
    `,
};

const render = (view) => {
    document.getElementById("main-content").innerHTML = view;
};

const setNavLinks = () => {
    const navLinks = document.getElementById("nav-links");
    navLinks.innerHTML = "";
    if (state.currentUser) {
        const role = state.currentUser.role;
        const links = [
            { name: "Dashboard", id: "dashboard-link" },
            { name: "Users", id: "users-link", roles: ["Super Admin"] },
            { name: "Pelanggan", id: "customers-link", roles: ["Super Admin"] },
            { name: "Supplier", id: "suppliers-link", roles: ["Super Admin"] },
            { name: "Kategori", id: "categories-link", roles: ["Super Admin"] },
            { name: "Item", id: "items-link", roles: ["Super Admin"] },
            { name: "Produk", id: "products-link", roles: ["Super Admin"] },
            { name: "Transaksi", id: "transactions-link", roles: ["Super Admin", "Kasir"] },
            { name: "Laporan", id: "reports-link", roles: ["Super Admin", "Kasir"] },
            { name: "Logout", id: "logout-link" },
        ];
        links.forEach((link) => {
            if (!link.roles || link.roles.includes(role)) {
                const li = document.createElement("li");
                li.className = "nav-item";
                li.innerHTML = `<a class="nav-link" href="#" id="${link.id}">${link.name}</a>`;
                navLinks.appendChild(li);
            }
        });
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const handleLogin = () => {
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const user = state.users.find((u) => u.username === username && u.password === password);
        if (user) {
            state.currentUser = user;
            render(views.dashboard);
            setNavLinks();
            document.getElementById("user-role").textContent = user.role;
        } else {
            alert("Username atau password salah!");
        }
    };

    render(views.login);
    setNavLinks();

    document.getElementById("main-content").addEventListener("submit", (e) => {
        e.preventDefault();
        if (e.target.id === "login-form") handleLogin();
    });
});
