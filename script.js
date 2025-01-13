// Halaman login
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') {
        localStorage.setItem('loggedIn', true);
        showPage('dashboardPage');
    } else {
        alert('Login gagal! Coba lagi.');
    }
});

// Fungsi untuk logout
function logout() {
    localStorage.removeItem('loggedIn');
    showPage('loginPage');
}

// Fungsi untuk menampilkan halaman
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.style.display = 'none';
    });
    document.getElementById(pageId).style.display = 'block';
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
