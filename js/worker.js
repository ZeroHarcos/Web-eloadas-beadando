let i = 0;
setInterval(() => {
    postMessage("Szám: " + i++);
}, 1000);