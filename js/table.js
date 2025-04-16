let data = [];

const form = document.getElementById("data-form");
const tableBody = document.querySelector("#data-table tbody");
const searchInput = document.getElementById("search");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const city = document.getElementById("city").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!name || !age || !city || !email) {
        alert("Minden mező kitöltése kötelező.");
        return;
    }

    if (name.length > 30 || city.length > 30 || email.length > 30) {
        alert("Maximális mezőhossz: 30 karakter.");
        return;
    }

    const newRow = { name, age, city, email };
    data.push(newRow);
    form.reset();
    renderTable();
});

function renderTable(filter = "") {
    tableBody.innerHTML = "";
    data
        .filter(row => Object.values(row).some(val => val.toLowerCase().includes(filter.toLowerCase())))
        .forEach((row, index) => {
            const tr = document.createElement("tr");

            for (let key in row) {
                const td = document.createElement("td");
                td.textContent = row[key];
                tr.appendChild(td);
            }

            const actionsTd = document.createElement("td");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Szerkesztés";
            editBtn.onclick = () => editRow(index);

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Törlés";
            deleteBtn.onclick = () => {
                if (confirm("Biztos törlöd?")) {
                    data.splice(index, 1);
                    renderTable(searchInput.value);
                }
            };

            actionsTd.appendChild(editBtn);
            actionsTd.appendChild(deleteBtn);
            tr.appendChild(actionsTd);

            tableBody.appendChild(tr);
        });
}

function editRow(index) {
    const row = data[index];
    document.getElementById("name").value = row.name;
    document.getElementById("age").value = row.age;
    document.getElementById("city").value = row.city;
    document.getElementById("email").value = row.email;

    data.splice(index, 1); 
    renderTable(searchInput.value);
}

searchInput.addEventListener("input", () => {
    renderTable(searchInput.value);
});

// Rendezes:
document.querySelectorAll("th[data-column]").forEach(th => {
    th.addEventListener("click", () => {
        const col = th.dataset.column;
        data.sort((a, b) => a[col].localeCompare(b[col]));
        renderTable(searchInput.value);
    });
});
function makeTableSortable(tableId) { const table = document.getElementById(tableId); const headers = table.querySelectorAll("th"); const tbody = table.querySelector("tbody"); const directions = Array.from(headers).map(() => true); // true: ascending

    headers.forEach((th, index) => { th.style.cursor = "pointer"; th.addEventListener("click", () => { const rows = Array.from(tbody.querySelectorAll("tr"));
    
    javascript
    Másolás
    Szerkesztés
      const sortedRows = rows.sort((a, b) => {
        const aText = a.children[index].textContent.trim();
        const bText = b.children[index].textContent.trim();
    
        const aVal = isNaN(aText) ? aText.toLowerCase() : parseFloat(aText);
        const bVal = isNaN(bText) ? bText.toLowerCase() : parseFloat(bText);
    
        if (aVal < bVal) return directions[index] ? -1 : 1;
        if (aVal > bVal) return directions[index] ? 1 : -1;
        return 0;
      });
    
      // fordítsuk meg az irányt
      directions[index] = !directions[index];
    
      // töröljük a régi sorokat és berakjuk az újakat
      tbody.innerHTML = "";
      sortedRows.forEach(row => tbody.appendChild(row));
    });
    }); }