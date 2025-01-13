// Halaman login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    // Login validasi
    if (username === 'admin' && password === 'admin' && role === 'Admin') {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('role', 'Admin');
        showPage('dashboardPage');
    } else if (username === 'kasir' && password === 'kasir' && role === 'Kasir') {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('role', 'Kasir');
        showPage('dashboardPage');
    } else if (username === 'other' && password === 'other' && role === 'Other') {
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('role', 'Other');
        showPage('dashboardPage');
    } else {
        alert('Login gagal! Coba lagi.');
    }
});

// Fungsi untuk logout
function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('role');
    showPage('loginPage');
}

// Fungsi untuk menampilkan halaman
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';

    // Menampilkan tombol sesuai peran
    const role = localStorage.getItem('role');

    if (role === 'Admin') {
        document.getElementById('btnUser').style.display = 'inline-block';
        document.getElementById('btnPelanggan').style.display = 'inline-block';
        document.getElementById('btnSupplier').style.display = 'inline-block';
        document.getElementById('btnKategori').style.display = 'inline-block';
        document.getElementById('btnItem').style.display = 'inline-block';
        document.getElementById('btnProduk').style.display = 'inline-block';
        document.getElementById('btnTransaksi').style.display = 'inline-block';
        document.getElementById('btnLaporan').style.display = 'inline-block';
    } else if (role === 'Kasir') {
        document.getElementById('btnTransaksi').style.display = 'inline-block';
        document.getElementById('btnLaporan').style.display = 'inline-block';
    } else if (role === 'Other') {
        alert('Peran Other disesuaikan oleh Admin.');
    }
}

// Memeriksa status login
document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('loggedIn')) {
        showPage('dashboardPage');
    } else {
        showPage('loginPage');
    }
});

// Fungsi untuk menambah data
function addData(page) {
    const data = prompt(`Masukkan data untuk ${page}:`);
    if (data) {
        const id = new Date().getTime();  // ID unik menggunakan waktu
        let storedData = JSON.parse(localStorage.getItem(page)) || [];
        storedData.push({ id, data });
        localStorage.setItem(page, JSON.stringify(storedData));
        loadData(page);
    }
}

// Fungsi untuk memuat data
function loadData(page) {
    const table = document.getElementById(`${page}Table`);
    let storedData = JSON.parse(localStorage.getItem(page)) || [];
    
    let tableHTML = `
        <thead>
            <tr>
                <th>ID</th>
                <th>Data</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
    `;
    
    storedData.forEach(item => {
        tableHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.data}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editData('${page}', ${item.id})">Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteData('${page}', ${item.id})">Hapus</button>
                </td>
            </tr>
        `;
    });

    tableHTML += `</tbody>`;
    table.innerHTML = tableHTML;
}

// Fungsi untuk mengedit data
function editData(page, id) {
    const storedData = JSON.parse(localStorage.getItem(page)) || [];
    const item = storedData.find(data => data.id === id);
    const newData = prompt(`Edit data:`, item.data);

    if (newData) {
        item.data = newData;
        localStorage.setItem(page, JSON.stringify(storedData));
        loadData(page);
    }
}

// Fungsi untuk menghapus data
function deleteData(page, id) {
    const storedData = JSON.parse(localStorage.getItem(page)) || [];
    const filteredData = storedData.filter(data => data.id !== id);
    localStorage.setItem(page, JSON.stringify(filteredData));
    loadData(page);
}

// Fungsi untuk menghasilkan laporan (dummy)
function generateReport() {
    alert('Laporan berhasil dibuat!');
    const table = document.getElementById('laporanTable');
    table.innerHTML = `<tr><td>Laporan 1</td><td>Detail</td></tr>`;
}

// Memuat data awal ketika halaman dashboard dimuat
document.addEventListener('DOMContentLoaded', function() {
    ['user', 'pelanggan', 'supplier', 'kategori', 'item', 'produk', 'transaksi'].forEach(page => {
        loadData(page);
    });
});
