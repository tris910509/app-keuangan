// Inisialisasi Data Pelanggan
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let editCustomerIndex = null;

// Menampilkan daftar pelanggan
function displayCustomers() {
    const customerTable = document.getElementById('customerTable');
    customerTable.innerHTML = '';

    customers.forEach((customer, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email}</td>
            <td>${customer.address}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCustomer(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${index})">Hapus</button>
            </td>
        `;

        customerTable.appendChild(row);
    });
}

// Menangani submit formulir
document.getElementById('customerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const id = editCustomerIndex !== null ? customers[editCustomerIndex].id : new Date().getTime();
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const email = document.getElementById('customerEmail').value;
    const address = document.getElementById('customerAddress').value;

    const customerData = { id, name, phone, email, address };

    if (editCustomerIndex !== null) {
        customers[editCustomerIndex] = customerData;
        editCustomerIndex = null;
    } else {
        customers.push(customerData);
    }

    localStorage.setItem('customers', JSON.stringify(customers));
    this.reset();
    displayCustomers();
});

// Mengedit pelanggan
function editCustomer(index) {
    editCustomerIndex = index;
    const customer = customers[index];

    document.getElementById('customerName').value = customer.name;
    document.getElementById('customerPhone').value = customer.phone;
    document.getElementById('customerEmail').value = customer.email;
    document.getElementById('customerAddress').value = customer.address;
}

// Menghapus pelanggan
function deleteCustomer(index) {
    if (confirm('Apakah Anda yakin ingin menghapus pelanggan ini?')) {
        customers.splice(index, 1);
        localStorage.setItem('customers', JSON.stringify(customers));
        displayCustomers();
    }
}

// Menampilkan data pelanggan saat halaman dimuat
document.addEventListener('DOMContentLoaded', displayCustomers);
