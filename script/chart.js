document.addEventListener("DOMContentLoaded", () => {
    const ctx = document.getElementById("dashboardChart").getContext("2d");
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const customers = JSON.parse(localStorage.getItem("customers")) || [];
    const suppliers = JSON.parse(localStorage.getItem("suppliers")) || [];

    const chartData = {
        labels: ["Users", "Pelanggan", "Supplier"],
        datasets: [
            {
                label: "Jumlah Data",
                data: [users.length, customers.length, suppliers.length],
                backgroundColor: ["rgba(54, 162, 235, 0.7)", "rgba(75, 192, 192, 0.7)", "rgba(255, 206, 86, 0.7)"],
            },
        ],
    };

    new Chart(ctx, {
        type: "bar",
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: { position: "top" },
            },
        },
    });
});
