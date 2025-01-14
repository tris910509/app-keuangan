// Data Dummy untuk Profil
const profileData = {
    name: "Admin",
    email: "admin@example.com",
    phone: "+62 812 3456 7890",
    address: "Jalan Raya No. 123, Jakarta",
    totalPelanggan: 150,
    totalTransaksi: 75,
    totalLaporan: 25,
};

// Fungsi Menyesuaikan Menu Sidebar Berdasarkan Peran
function loadMenu(role) {
    const menuContainer = document.getElementById("menuContainer");
    let menuHTML = "";

    if (role === "Admin") {
        menuHTML = `
            <a href="#" class="active"><i class="fa fa-users"></i> User</a>
            <a href="#"><i class="fa fa-user"></i> Pelanggan</a>
            <a href="#"><i class="fa fa-truck"></i> Supplier</a>
            <a href="#"><i class="fa fa-list"></i> Kategori</a>
            <a href="#"><i class="fa fa-box"></i> Item</a>
            <a href="#"><i class="fa fa-cube"></i> Produk</a>
            <a href="#"><i class="fa fa-shopping-cart"></i> Transaksi</a>
            <a href="#"><i class="fa fa-file"></i> Laporan</a>
            <a href="#"><i class="fa fa-cogs"></i> Setting</a>
        `;
    } else if (role === "Kasir") {
        menuHTML = `
            <a href="#" class="active"><i class="fa fa-shopping-cart"></i> Transaksi</a>
            <a href="#"><i class="fa fa-file"></i> Laporan</a>
        `;
    } else if (role === "Other") {
        menuHTML = `
            <a href="#" class="active"><i class="fa fa-user"></i> Pelanggan</a>
            <a href="#"><i class="fa fa-cube"></i> Produk</a>
        `;
    }

    menuContainer.innerHTML = menuHTML;
}

// Fungsi Inisialisasi Profil
function loadProfile() {
    document.getElementById("profileName").innerText = profileData.name;
    document.getElementById("profileEmail").innerText = profileData.email;
    document.getElementById("profilePhone").innerText = profileData.phone;
    document.getElementById("profileAddress").innerText = profileData.address;
    document.getElementById("totalPelanggan").innerText = profileData.totalPelanggan;
    document.getElementById("totalTransaksi").innerText = profileData.totalTransaksi;
    document.getElementById("totalLaporan").innerText = profileData.totalLaporan;
}

// Fungsi Inisialisasi Chart
function loadChart() {
    const ctx = document.getElementById("dashboardChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Pelanggan", "Transaksi", "Laporan"],
            datasets: [
                {
                    label: "Statistik",
                    data: [
                        profileData.totalPelanggan,
                        profileData.totalTransaksi,
                        profileData.totalLaporan,
                    ],
                    backgroundColor: ["#007bff", "#28a745", "#ffc107"],
                },
            ],
        },
    });
}

// Fungsi Inisialisasi Dashboard
function initializeDashboard() {
    const role = localStorage.getItem("userRole") || "Admin"; // Default Admin jika tidak ada role tersimpan
    loadMenu(role);
    loadProfile();
    loadChart();
}

// Inisialisasi saat halaman dimuat
document.addEventListener("DOMContentLoaded", initializeDashboard);
