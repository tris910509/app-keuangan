let customers = JSON.parse(localStorage.getItem("customers")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let cart = [];

// Dropdown dinamis untuk pelanggan
function updateCustomerDropdown() {
    const customerSelect = document.getElementById("customerSelect");
    customerSelect.innerHTML =
        '<option value="" disabled selected>Pilih pelanggan</option>' +
        customers
            .map((customer) => `<option value="${customer.id}">${customer.name}</option>`)
            .join("");
}

// Dropdown produk
function updateProductDropdown() {
    const productSelect = document.getElementById("productSelect");
    productSelect.innerHTML =
        '<option value="" disabled selected>Pilih produk</option>' +
        products
            .map(
                (product) =>
                    `<option value="${product.id}" ${
                        product.stock <= 0 ? "disabled" : ""
                    }>${product.name} (Stok: ${product.stock}, Harga: ${product.price})</option>`
            )
            .join("");
}

// Tampilkan form input manual jika pelanggan umum
document.getElementById("customerRole").addEventListener("change", (e) => {
    const role = e.target.value;
    const manualInput = document.getElementById("manualCustomerInput");
    const existingSelect = document.getElementById("existingCustomerSelect");

    if (role === "Umum") {
        manualInput.style.display = "block";
        existingSelect.style.display = "none";
    } else {
        manualInput.style.display = "none";
        existingSelect.style.display = "block";
        updateCustomerDropdown();
    }
});

// Menambahkan item ke keranjang
document.getElementById("transactionForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const productId = document.getElementById("productSelect").value;
    const quantity = parseInt(document.getElementById("quantity").value);
    const product = products.find((p) => p.id === productId);

    if (product && product.stock >= quantity) {
        const existingItem = cart.find((item) => item.id === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
            existingItem.total = existingItem.quantity * existingItem.price;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                quantity: quantity,
                total: product.price * quantity,
            });
        }
        displayCart();
    } else {
        alert("Stok tidak mencukupi.");
    }
});

// Menampilkan keranjang
function displayCart() {
    const cartTable = document.getElementById("cartTable");
    cartTable.innerHTML = cart
        .map(
            (item, index) => `
        <tr>
            <td>${item.name}</td>
            <td>${item.price}</td>
            <td>${item.quantity}</td>
            <td>${item.total}</td>
            <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Hapus</button></td>
        </tr>`
        )
        .join("");
}

// Menghapus item dari keranjang
function removeFromCart(index) {
    cart.splice(index, 1);
    displayCart();
}

// Proses transaksi
document.getElementById("processTransaction").addEventListener("click", () => {
    const role = document.getElementById("customerRole").value;
    const paymentStatus = document.getElementById("paymentStatus").value;
    let customerId;

    if (role === "Umum") {
        const customerName = document.getElementById("customerName").value;
        if (!customerName) {
            alert("Nama pelanggan tidak boleh kosong.");
            return;
        }
        customerId = `CUST-${Date.now()}`;
        customers.push({ id: customerId, name: customerName, role: role });
        localStorage.setItem("customers", JSON.stringify(customers));
    } else {
        customerId = document.getElementById("customerSelect").value;
        if (!customerId) {
            alert("Pilih pelanggan.");
            return;
        }
    }

    // Kurangi stok produk
    cart.forEach((item) => {
        const product = products.find((p) => p.id === item.id);
        if (product) {
            product.stock -= item.quantity;
        }
    });

    // Simpan transaksi
    transactions.push({
        id: `TRANS-${Date.now()}`,
        date: new Date().toLocaleString(),
        customerId,
        items: cart,
        total: cart.reduce((sum, item) => sum + item.total, 0),
        statusLunas: paymentStatus,
    });

    // Simpan ke LocalStorage
    localStorage.setItem("products", JSON.stringify(products));
    localStorage.setItem("transactions", JSON.stringify(transactions));

    cart = [];
    displayCart();
    updateProductDropdown();
    alert(paymentStatus === "Lunas" ? "Transaksi berhasil." : "Konfirmasi pembayaran diperlukan.");
});

// Inisialisasi
document.addEventListener("DOMContentLoaded", () => {
    updateProductDropdown();
});
