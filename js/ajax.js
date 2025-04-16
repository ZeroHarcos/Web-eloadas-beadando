const baseUrl = "http://gamf.nhely.hu/ajax2/";
const code = "XYZ123abc999";

function showMessage(msg, error = false) {
    const m = document.getElementById("message");
    m.style.color = error ? "red" : "green";
    m.textContent = msg;
    setTimeout(() => m.textContent = "", 4000);
}

function readData() {
    fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `op=read&code=${code}`
    })
    .then(res => res.json())
    .then(data => {
        const output = document.getElementById("output");
        output.innerHTML = "";

        let sum = 0, count = 0, max = 0;

        data.list.forEach(record => {
            const div = document.createElement("div");
            div.textContent = `ID: ${record.id}, Név: ${record.name}, Magasság: ${record.height}, Súly: ${record.weight}`;
            output.appendChild(div);

            const h = parseInt(record.height);
            if (!isNaN(h)) {
                sum += h;
                count++;
                if (h > max) max = h;
            }
        });

        document.getElementById("summary").textContent =
            `Magasság - Összeg: ${sum}, Átlag: ${count ? (sum / count).toFixed(2) : 0}, Legnagyobb: ${max}`;
    });
}

function createRecord() {
    const name = document.getElementById("name").value.trim();
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();

    if (!name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
        showMessage("Hibás vagy hiányos adatok!", true);
        return;
    }

    const params = `op=create&name=${name}&height=${height}&weight=${weight}&code=${code}`;

    fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    })
    .then(res => res.text())
    .then(result => {
        showMessage("Rekord létrehozva!");
        readData();
    });
}

function updateRecord() {
    const id = document.getElementById("idInput").value.trim();
    const name = document.getElementById("name").value.trim();
    const height = document.getElementById("height").value.trim();
    const weight = document.getElementById("weight").value.trim();

    if (!id || !name || !height || !weight || name.length > 30 || height.length > 30 || weight.length > 30) {
        showMessage("Hiányos vagy hibás adatok az Update művelethez!", true);
        return;
    }

    const params = `op=update&id=${id}&name=${name}&height=${height}&weight=${weight}&code=${code}`;

    fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    })
    .then(res => res.text())
    .then(result => {
        showMessage("Rekord frissítve!");
        readData();
    });
}

function deleteRecord() {
    const id = document.getElementById("deleteId").value.trim();

    if (!id) {
        showMessage("Törléshez meg kell adni egy ID-t!", true);
        return;
    }

    const params = `op=delete&id=${id}&code=${code}`;

    fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    })
    .then(res => res.text())
    .then(result => {
        showMessage("Rekord törölve.");
        readData();
    });
}

function getDataForId() {
    const id = document.getElementById("idInput").value.trim();
    if (!id) {
        showMessage("Kérlek adj meg egy ID-t!", true);
        return;
    }

    fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `op=read&code=${code}`
    })
    .then(res => res.json())
    .then(data => {
        const record = data.list.find(r => r.id === id);
        if (record) {
            document.getElementById("name").value = record.name;
            document.getElementById("height").value = record.height;
            document.getElementById("weight").value = record.weight;
        } else {
            showMessage("Nincs ilyen ID!", true);
        }
    });
}