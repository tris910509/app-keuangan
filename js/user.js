// Inisialisasi Data User
let users = JSON.parse(localStorage.getItem('users')) || [];
let editIndex = null;

// Menangani perubahan dropdown peran
function handleRoleChange() {
    const role = document.getElementById('userRole').value;
    const customRoleField = document.getElementById('customRoleField');
    if (role === 'Other') {
        customRoleField.style.display = 'block';
    } else {
        customRoleField.style.display = 'none';
    }
}

// Menampilkan daftar user
function displayUsers() {
    const userTable = document.getElementById('userTable');
    userTable.innerHTML = '';

    users.forEach((user, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.role}</td>
            <td>${user.phone}</td>
            <td>${user.email}</td>
            <td>${user.address}</td>
            <td>${user.status ? 'Aktif' : 'Non-Aktif'}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editUser(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${index})">Hapus</button>
            </td>
        `;

        userTable.appendChild(row);
    });
}

// Menangani submit formulir
document.getElementById('userForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const id = editIndex !== null ? users[editIndex].id : new Date().getTime();
    const name = document.getElementById('userName').value;
    const role = document.getElementById('userRole').value === 'Other' 
        ? document.getElementById('customRole').value 
        : document.getElementById('userRole').value;
    const phone = document.getElementById('userPhone').value;
    const email = document.getElementById('userEmail').value;
    const address = document.getElementById('userAddress').value;
    const status = document.getElementById('userStatus').checked;

    const userData = { id, name, role, phone, email, address, status };

    if (editIndex !== null) {
        users[editIndex] = userData;
        editIndex = null;
    } else {
        users.push(userData);
    }

    localStorage.setItem('users', JSON.stringify(users));
    this.reset();
    document.getElementById('customRoleField').style.display = 'none';
    displayUsers();
});

// Mengedit user
function editUser(index) {
    editIndex = index;
    const user = users[index];

    document.getElementById('userName').value = user.name;
    document.getElementById('userRole').value = user.role === 'Admin' || user.role === 'Kasir' ? user.role : 'Other';
    document.getElementById('customRole').value = user.role === 'Admin' || user.role === 'Kasir' ? '' : user.role;
    document.getElementById('userPhone').value = user.phone;
    document.getElementById('userEmail').value = user.email;
    document.getElementById('userAddress').value = user.address;
    document.getElementById('userStatus').checked = user.status;

    handleRoleChange();
}

// Menghapus user
function deleteUser(index) {
    if (confirm('Apakah Anda yakin ingin menghapus user ini?')) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users));
        displayUsers();
    }
}

// Menampilkan data user saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayUsers);
