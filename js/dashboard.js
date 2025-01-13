// Data Peran dan Menu
const roles = {
    Admin: ["User", "Pelanggan", "Supplier", "Kategori", "Item", "Produk", "Transaksi", "Laporan"],
    Kasir: ["Transaksi", "Laporan"],
    Other: [] // Diatur oleh admin melalui modul User
};

// Daftar menu dengan ikon Font Awesome
const roles = {
    Admin: [
        { name: "Pelanggan", icon: "fa-users" },
        { name: "Supplier", icon: "fa-truck" },
        { name: "Kategori", icon: "fa-list" },
        { name: "Item", icon: "fa-box" },
        { name: "Produk", icon: "fa-tags" },
        { name: "Transaksi", icon: "fa-money-bill-wave" },
        { name: "Laporan", icon: "fa-chart-line" }
    ],
    Kasir: [
        { name: "Transaksi", icon: "fa-money-bill-wave" },
        { name: "Laporan", icon: "fa-chart-line" }
    ],
    Other: [] // Diatur oleh Admin
};

// Fungsi untuk membuat menu dengan ikon
function createMenu(role) {
    const menuItems = roles[role];
    const menuList = document.getElementById("menuItems");
    menuList.innerHTML = "";

    menuItems.forEach((menu) => {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");

        listItem.innerHTML = `
            <a class="nav-link d-flex align-items-center" href="#" onclick="loadContent('${menu.name}')">
                <i class="fa ${menu.icon} me-2"></i> <span>${menu.name}</span>
            </a>
        `;

        menuList.appendChild(listItem);
    });
}


// Simulasi Role User Aktif
const currentUserRole = localStorage.getItem("userRole") || "Admin"; // Ganti sesuai login
localStorage.setItem("userRole", currentUserRole); // Simpan peran aktif

// Fungsi untuk membuat menu sidebar
function createMenu(role) {
    const menuItems = roles[role];
    const menuList = document.getElementById("menuItems");
    menuList.innerHTML = "";

    menuItems.forEach((menu) => {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");

        listItem.innerHTML = `
            <a class="nav-link" href="#" onclick="loadContent('${menu}')">
                ${menu}
            </a>
        `;

        menuList.appendChild(listItem);
    });
}

// Fungsi untuk memuat konten dinamis
function loadContent(menu) {
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = `<h2 class="text-center mt-5">${menu}</h2><p class="text-center">Konten untuk ${menu} akan ditampilkan di sini.</p>`;

    // Tambahkan logika tambahan untuk memuat file modul spesifik jika diperlukan
    // Misalnya, untuk Pelanggan, kita bisa memuat pelanggan.html
}

// Saat halaman dimuat
document.addEventListener("DOMContentLoaded", () => {
    createMenu(currentUserRole);
    loadContent("Dashboard"); // Default konten awal
});
