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
