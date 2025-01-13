// Data users disimpan di LocalStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// Fungsi untuk menampilkan daftar user di tabel
function renderUserTable() {
    const userTable = document.getElementById("userTable");
    userTable.innerHTML = users
        .map(
            (user, index) => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address}</td>
            <td>${user.status ? "Aktif" : "Tidak Aktif"}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${index})">
                    <i class="fa fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">
                    <i class="fa fa-trash"></i> Hapus
                </button>
            </td>
        </tr>`
        )
        .join("");
}

// Tambah atau Edit User
document.getElementById("userForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const userId = document.getElementById("userId").value;
    const userName = document.getElementById("userName").value;
    const userRole = document.getElementById("userRole").value;
    const userPhone = document.getElementById("userPhone").value;
    const userEmail = document.getElementById("userEmail").value;
    const userAddress = document.getElementById("userAddress").value;
    const userStatus = document.getElementById("userStatus").checked;
    const manualRole = document.getElementById("manualRole").value;

    const user = {
        id: userId || `USER-${Date.now()}`,
        name: userName,
        role: userRole === "Other" ? manualRole : userRole,
        phone: userPhone,
        email: userEmail,
        address: userAddress,
        status: userStatus,
    };

    if (userId) {
        // Update user
        const index = users.findIndex((u) => u.id === userId);
        users[index] = user;
    } else {
        // Tambah user baru
        users.push(user);
    }

    // Simpan ke LocalStorage
    localStorage.setItem("users", JSON.stringify(users));

    // Reset form dan refresh tabel
    document.getElementById("userForm").reset();
    document.getElementById("manualRole").style.display = "none";
    renderUserTable();
});

// Edit User
function editUser(index) {
    const user = users[index];
    document.getElementById("userId").value = user.id;
    document.getElementById("userName").value = user.name;
    document.getElementById("userRole").value = user.role === "Admin" || user.role === "Kasir" ? user.role : "Other";
    document.getElementById("userPhone").value = user.phone;
    document.getElementById("userEmail").value = user.email;
    document.getElementById("userAddress").value = user.address;
    document.getElementById("userStatus").checked = user.status;

    if (user.role !== "Admin" && user.role !== "Kasir") {
        document.getElementById("manualRole").style.display = "block";
        document.getElementById("manualRole").value = user.role;
    } else {
        document.getElementById("manualRole").style.display = "none";
    }
}

// Hapus User
function deleteUser(index) {
    if (confirm("Apakah Anda yakin ingin menghapus user ini?")) {
        users.splice(index, 1);
        localStorage.setItem("users", JSON.stringify(users));
        renderUserTable();
    }
}

// Tampilkan input manual untuk peran Other
document.getElementById("userRole").addEventListener("change", (e) => {
    const manualRoleInput = document.getElementById("manualRole");
    manualRoleInput.style.display = e.target.value === "Other" ? "block" : "none";
});

// Inisialisasi
document.addEventListener("DOMContentLoaded", renderUserTable);
