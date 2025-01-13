let items = JSON.parse(localStorage.getItem("items")) || [];

// Menampilkan daftar item
function displayItems() {
    const table = document.getElementById("itemTable");
    table.innerHTML = items
        .map(
            (item, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.description}</td>
            <td>${item.price}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editItem(${index})">
                    <i class="fa fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteItem(${index})">
                    <i class="fa fa-trash"></i> Hapus
                </button>
            </td>
        </tr>`
        )
        .join("");
}

// Menyimpan item baru
document.getElementById("itemForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("itemName").value;
    const description = document.getElementById("itemDescription").value;
    const price = document.getElementById("itemPrice").value;

    items.push({ name, description, price });
    localStorage.setItem("items", JSON.stringify(items));
    displayItems();
    e.target.reset();
});

// Mengedit item
function editItem(index) {
    const item = items[index];
    const newName = prompt("Masukkan nama item baru:", item.name);
    const newDescription = prompt("Masukkan deskripsi baru:", item.description);
    const newPrice = prompt("Masukkan harga baru:", item.price);

    if (newName && newDescription && newPrice) {
        items[index] = { name: newName, description: newDescription, price: newPrice };
        localStorage.setItem("items", JSON.stringify(items));
        displayItems();
    }
}

// Menghapus item
function deleteItem(index) {
    if (confirm("Apakah Anda yakin ingin menghapus item ini?")) {
        items.splice(index, 1);
        localStorage.setItem("items", JSON.stringify(items));
        displayItems();
    }
}

// Saat modul dimuat
document.addEventListener("DOMContentLoaded", displayItems);
