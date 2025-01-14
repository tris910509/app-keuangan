// Simulasi login
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || {
    role: "Admin",
};

const allowedModules = {
    Admin: [
        "user",
        "pelanggan",
        "supplier",
        "kategori",
        "item",
        "produk",
        "transaksi",
        "laporan",
    ],
    Kasir: ["transaksi", "laporan"],
    Other: [],
};

// Mengatur menu berdasarkan peran
function updateMenu() {
    document.querySelectorAll(".menu-item").forEach((menu) => {
        const module = menu.id.replace("menu-", "");
        if (allowedModules[currentUser.role].includes(module)) {
            menu.style.display = "block";
        } else {
            menu.style.display = "none";
        }
    });
}

// Muat konten modul
function loadModule(moduleName) {
    fetch(`modules/${moduleName}.html`)
        .then((response) => response.text())
        .then((html) => {
            document.getElementById("main-content").innerHTML = html;
            const script = document.createElement("script");
            script.src = `js/${moduleName}.js`;
            document.body.appendChild(script);
        })
        .catch((error) => console.error("Error loading module:", error));
}

// Logout
document.getElementById("logout").addEventListener("click", () => {
    alert("Logout berhasil.");
    localStorage.removeItem("currentUser");
    window.location.reload();
});

// Event listener untuk menu
document.querySelectorAll(".menu-item").forEach((menu) => {
    menu.addEventListener("click", (e) => {
        e.preventDefault();
        const module = menu.id.replace("menu-", "");
        loadModule(module);
    });
});

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    updateMenu();
    loadModule("user"); // Default load
});

// Simulasi data (sesuai LocalStorage)
const user = {
    id: "USER-12345",
    name: "John Doe",
    phone: "081234567890",
    email: "johndoe@example.com",
    address: "Jl. Contoh Alamat No.123",
};

const customers = [
    { id: "CUST-1", name: "Alice" },
    { id: "CUST-2", name: "Bob" },
];

const transactions = [
    { id: "TRANS-1", total: 100000 },
    { id: "TRANS-2", total: 200000 },
];

const reports = [
    { id: "REPORT-1", detail: "Laporan Harian" },
    { id: "REPORT-2", detail: "Laporan Mingguan" },
];

// Fungsi menampilkan data profil user
function displayProfile() {
    document.getElementById("profileName").innerText = user.name;
    document.getElementById("profilePhone").innerText = user.phone;
    document.getElementById("profileEmail").innerText = user.email;
    document.getElementById("profileAddress").innerText = user.address;
}

// Fungsi menampilkan ringkasan data
function displaySummary() {
    document.getElementById("totalCustomers").innerText = customers.length;
    document.getElementById("totalTransactions").innerText = transactions.length;
    document.getElementById("totalReports").innerText = reports.length;
}

// Fungsi menampilkan chart
function displayChart() {
    const ctx = document.getElementById("dataChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Pelanggan", "Transaksi", "Laporan"],
            datasets: [
                {
                    label: "Jumlah Data",
                    data: [customers.length, transactions.length, reports.length],
                    backgroundColor: ["#007bff", "#28a745", "#ffc107"],
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
            },
        },
    });
}

// Inisialisasi data dashboard
document.addEventListener("DOMContentLoaded", () => {
    displayProfile();
    displaySummary();
    displayChart();
});


