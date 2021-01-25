class Batteries {
    constructor() {
        this.charged = [];
        this.selected = [];

        // Initiate the charged batteries.
        this.charged[0] = this.charged[1] = getRandomNumber();
        while (this.charged[0] === this.charged[1]) {
            this.charged[1] = getRandomNumber();
        }
    }

    getCharged() {
        return this.charged;
    }

    isCharged(battery) {
        return this.charged.includes(battery);
    }

    setSelected(battery) {
        if (this.selected.length === 2) {
            return;
        }
        this.selected.push(battery);
    }

    setUnselected(battery) {
        const index = this.selected.indexOf(battery);
        if (index > -1) {
            this.selected.splice(index, 1);
        }
    }

    isSelected(battery) {
        return this.selected.includes(battery);
    }
}


// Helper function to get a random number between 1 and 10.
function getRandomNumber() {
    do {
        n = Math.round((Math.random() * 10));
    } while (n === 0);
    return n;
}
