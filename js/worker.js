let i = 0;

function count() {
    i++;
    postMessage("Számlálás: " + i);
    setTimeout(count, 1000);
}

count();