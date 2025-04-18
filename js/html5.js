
function saveToStorage() {
    const value = document.getElementById("storageInput").value;
    localStorage.setItem("myData", value);
    alert("Elmentve!");
}

function loadFromStorage() {
    const output = localStorage.getItem("myData") || "Nincs adat.";
    document.getElementById("storageOutput").textContent = output;
}


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lon = pos.coords.longitude;
            document.getElementById("locationOutput").textContent = `Szélesség: ${lat}, Hosszúság: ${lon}`;
        }, () => {
            document.getElementById("locationOutput").textContent = "Hozzáférés megtagadva.";
        });
    } else {
        document.getElementById("locationOutput").textContent = "A böngésző nem támogatja a Geolocation API-t.";
    }
}


const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 50);
document.addEventListener("DOMContentLoaded", () => {
  
    const canvas = document.getElementById("myCanvas");
    if (canvas && canvas.getContext) {
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "red";
        ctx.fillRect(20, 20, 100, 50);
    } else {
        console.error("Canvas nem található vagy nem támogatott.");
    }
});
document.addEventListener("DOMContentLoaded", () => {
    const svg = document.getElementById("interactiveSVG");
    const output = document.getElementById("svgOutput");

    svg.addEventListener("click", (e) => {
        if (e.target.tagName === "circle") {
            const currentColor = e.target.getAttribute("fill");
            const newColor = getRandomColor();
            e.target.setAttribute("fill", newColor);
            output.textContent = `Kör színe változott: ${currentColor} ➡️ ${newColor}`;
        }
    });

    function getRandomColor() {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
});


const draggable = document.getElementById("draggable");
const dropzone = document.getElementById("dropzone");

draggable.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text", "Ez egy elem");
});

dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
});

dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.textContent = "Sikeresen dobtad!";
});

// Web Worker
let worker;

function startWorker() {
    if (typeof Worker !== "undefined") {
        if (!worker) {
            worker = new Worker("worker.js");
            worker.onmessage = function (e) {
                document.getElementById("workerOutput").textContent = e.data;
            };
        }
    } else {
        document.getElementById("workerOutput").textContent = "A böngésző nem támogatja a Web Worker-t.";
    }
}