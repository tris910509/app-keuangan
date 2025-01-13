let customers = JSON.parse(localStorage.getItem("customers")) || [];

// Menampilkan data pelanggan
function displayCustomers() {
    const table = document.getElementById("customerTable");
    table.innerHTML = customers
        .map(
            (customer, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCustomer(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteCustomer(${index})">Hapus</button>
            </td>
        </tr>`
        )
        .join("");
}

// Menyimpan data pelanggan
document.getElementById("customerForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("customerName").value;
    const phone = document.getElementById("customerPhone").value;

    customers.push({ name, phone });
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
    e.target.reset();
});

// Menghapus pelanggan
function deleteCustomer(index) {
    customers.splice(index, 1);
    localStorage.setItem("customers", JSON.stringify(customers));
    displayCustomers();
}

// Saat modul dimuat
document.addEventListener("DOMContentLoaded", displayCustomers);
