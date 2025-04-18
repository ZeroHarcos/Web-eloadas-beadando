const rows = document.querySelectorAll("#number-table tbody tr");
const ctx = document.getElementById("chart").getContext("2d");

let chart = new Chart(ctx, {
    type: "line",
    data: {
        labels: ["A", "B", "C", "D", "E"],
        datasets: [{
            label: "Kiválasztott sor",
            data: [],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

rows.forEach(row => {
    row.addEventListener("click", () => {
        const values = Array.from(row.children)
            .slice(1) 
            .map(td => parseFloat(td.textContent));

        chart.data.datasets[0].data = values;
        chart.update();
    });
});