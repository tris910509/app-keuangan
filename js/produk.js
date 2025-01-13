let products = JSON.parse(localStorage.getItem("products")) || [];
let categories = JSON.parse(localStorage.getItem("categories")) || [];
let items = JSON.parse(localStorage.getItem("items")) || [];
let suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

// Mengisi dropdown kategori, item, dan supplier
function populateDropdowns() {
    const categoryDropdown = document.getElementById("productCategory");
    const itemDropdown = document.getElementById("productItem");
    const supplierDropdown = document.getElementById("productSupplier");

    // Isi dropdown kategori
    categoryDropdown.innerHTML =
        '<option value="" disabled selected>Pilih kategori</option>' +
        categories.map((category) => `<option value="${category.id}">${category.name}</option>`).join("");

    // Isi dropdown item
    itemDropdown.innerHTML =
        '<option value="" disabled selected>Pilih item</option>' +
        items.map((item) => `<option value="${item.id}">${item.name}</option>`).join("");

    // Isi dropdown supplier
    supplierDropdown.innerHTML =
        '<option value="" disabled selected>Pilih supplier</option>' +
        suppliers.map((supplier) => `<option value="${supplier.id}">${supplier.name}</option>`).join("");
}

// Menampilkan daftar produk
function displayProducts() {
    const table = document.getElementById("productTable");
    table.innerHTML = products
        .map(
            (product, index) => `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${categories.find((cat) => cat.id === product.category)?.name || "N/A"}</td>
            <td>${items.find((item) => item.id === product.item)?.name || "N/A"}</td>
            <td>${suppliers.find((sup) => sup.id === product.supplier)?.name || "N/A"}</td>
            <td>${product.price}</td>
            <td>${product.stock}</td>
            <td>${product.status ? "Publik" : "Tidak Publik"}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editProduct(${index})">
                    <i class="fa fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${index})">
                    <i class="fa fa-trash"></i> Hapus
                </button>
            </td>
        </tr>`
        )
        .join("");
}

// Menyimpan produk baru
document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const id = `PROD-${Date.now()}`;
    const name = document.getElementById("productName").value;
    const category = document.getElementById("productCategory").value;
    const item = document.getElementById("productItem").value;
    const supplier = document.getElementById("productSupplier").value;
    const price = document.getElementById("productPrice").value;
    const stock = document.getElementById("productStock").value;
    const status = document.getElementById("productStatus").checked;

    products.push({ id, name, category, item, supplier, price, stock, status });
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
    e.target.reset();
});

// Mengedit produk
function editProduct(index) {
    const product = products[index];
    const newName = prompt("Masukkan nama produk baru:", product.name);
    const newCategory = prompt("Masukkan ID kategori baru:", product.category);
    const newItem = prompt("Masukkan ID item baru:", product.item);
    const newSupplier = prompt("Masukkan ID supplier baru:", product.supplier);
    const newPrice = prompt("Masukkan harga baru:", product.price);
    const newStock = prompt("Masukkan stok baru:", product.stock);
    const newStatus = confirm("Apakah produk dipublikasikan?");

    if (newName && newCategory && newItem && newSupplier && newPrice && newStock) {
        products[index] = {
            id: product.id,
            name: newName,
            category: newCategory,
            item: newItem,
            supplier: newSupplier,
            price: newPrice,
            stock: newStock,
            status: newStatus,
        };
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    }
}

// Menghapus produk
function deleteProduct(index) {
    if (confirm("Apakah Anda yakin ingin menghapus produk ini?")) {
        products.splice(index, 1);
        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
    }
}

// Saat modul dimuat
document.addEventListener("DOMContentLoaded", () => {
    populateDropdowns();
    displayProducts();
});
