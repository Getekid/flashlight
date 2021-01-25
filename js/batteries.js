class Batteries {
    constructor() {
        this.charged = [];
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
}


// Helper function to get a random number between 1 and 10.
function getRandomNumber() {
    let n = 0;
    while (n === 0) {
        n = Math.round((Math.random() * 10));
    }
    return n;
}
