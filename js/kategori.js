let categories = JSON.parse(localStorage.getItem("categories")) || [];

// Menampilkan daftar kategori
function displayCategories() {
    const table = document.getElementById("categoryTable");
    table.innerHTML = categories
        .map(
            (category, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${category.name}</td>
            <td>
                <button class="btn btn-warning btn-sm" onclick="editCategory(${index})">
                    <i class="fa fa-edit"></i> Edit
                </button>
                <button class="btn btn-danger btn-sm" onclick="deleteCategory(${index})">
                    <i class="fa fa-trash"></i> Hapus
                </button>
            </td>
        </tr>`
        )
        .join("");
}

// Menyimpan kategori baru
document.getElementById("categoryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("categoryName").value;

    categories.push({ name });
    localStorage.setItem("categories", JSON.stringify(categories));
    displayCategories();
    e.target.reset();
});

// Mengedit kategori
function editCategory(index) {
    const newName = prompt("Masukkan nama kategori baru:", categories[index].name);
    if (newName) {
        categories[index].name = newName;
        localStorage.setItem("categories", JSON.stringify(categories));
        displayCategories();
    }
}

// Menghapus kategori
function deleteCategory(index) {
    if (confirm("Apakah Anda yakin ingin menghapus kategori ini?")) {
        categories.splice(index, 1);
        localStorage.setItem("categories", JSON.stringify(categories));
        displayCategories();
    }
}

// Saat modul dimuat
document.addEventListener("DOMContentLoaded", displayCategories);
