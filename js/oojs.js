class Animal {
    constructor(name, type) {
        this.name = name;
        this.type = type;
    }

    speak() {
        return `${this.name} hangot ad ki.`;
    }

    render() {
        const div = document.createElement("div");
        div.textContent = `${this.type} – ${this.name}: ${this.speak()}`;
        document.getElementById("zoo").appendChild(div);
    }
}

class Bird extends Animal {
    constructor(name) {
        super(name, "Madár");
    }

    speak() {
        return "Csirip-csirip!";
    }
}

class Mammal extends Animal {
    constructor(name) {
        super(name, "Emlős");
    }

    speak() {
        return "Morgás vagy ugatás!";
    }
}

function createZoo() {
    document.getElementById("zoo").innerHTML = ""; 

    const a1 = new Bird("Veréb");
    const a2 = new Mammal("Medve");
    const a3 = new Bird("Papagáj");
    const a4 = new Mammal("Kutya");

    [a1, a2, a3, a4].forEach(a => a.render());
}