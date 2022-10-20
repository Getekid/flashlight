/**
 * Class Batteries to store and manage the logic around the charged and non-charged batteries of the game.
 */
class Batteries {

    /**
     * Initiate the class by selecting two random batteries and marking them as charged.
     */
    constructor() {
        this.charged = [];
        this.selected = [];

        // Initiate the charged batteries.
        this.charged[0] = this.charged[1] = getRandomNumber();
        while (this.charged[0] === this.charged[1]) {
            this.charged[1] = getRandomNumber();
        }
    }

    /**
     * Get the charged batteries.
     * @returns {Array} A list of the charged batteries.
     */
    getCharged() {
        return this.charged;
    }

    /**
     * Get whether a given battery is charged or not.
     * @param {int} battery
     * @returns {boolean} True if the battery is charged, false otherwise.
     */
    isCharged(battery) {
        return this.charged.includes(battery);
    }

    /**
     * Mark a battery as selected.
     * @param {int} battery
     */
    setSelected(battery) {
        if (this.selected.includes(battery)) {
            return;
        }
        if (this.selected.length === 2) {
            this.selected = [];
        }
        this.selected.push(battery);
    }

    /**
     * Unmark a battery as selected.
     * @param {int} battery
     */
    setUnselected(battery) {
        const index = this.selected.indexOf(battery);
        if (index > -1) {
            this.selected.splice(index, 1);
        }
    }

    /**
     * Get the selected batteries.
     * @returns {Array} A list of the selected batteries.
     */
    getSelected() {
        return this.selected;
    }

    /**
     * Get whether a given battery is selected or not.
     * @param {*} battery 
     * @returns 
     */
    isSelected(battery) {
        return this.selected.includes(battery);
    }

    /**
     * Toggle whether a battery is selected or not.
     * @param {int} battery
     */
    toggleSelection(battery) {
        if (this.isSelected(battery)) {
            this.setUnselected(battery);
        } else {
            this.setSelected(battery);
        }
    }

    /**
     * Get whether any battery has been selected or not.
     * @returns {boolean} True if there exist selected batteries, false otherwise.
     */
    hasSelected() {
        return this.selected.length !== 0;
    }

    /**
     * Get whether no battery is selected selected or not.
     * @returns {boolean} True if no battery is selected, false otherwise.
     */
    hasNoSelected() {
        return this.selected.length === 0;
    }

    /**
     * Reset the selected batteries to none.
     */
    removeSelected() {
        this.selected = [];
    }

    /**
     * Get whether any of the selected batteries is charged or not.
     * @returns {boolean} True if any of the selected batteries is charged, false otherwise.
     */
    checkOneSelectedIsCharged() {
        return this.selected.includes(this.charged[0])
            || this.selected.includes(this.charged[1]);
    }

    /**
     * Get whether both selected batteries are charged or not.
     * @returns {boolean} True if both selected batteries are charged, false otherwise.
     */
    checkSelectedAreCharged() {
        return this.selected.includes(this.charged[0])
            && this.selected.includes(this.charged[1]);
    }
}


// Helper function to get a random number between 1 and 10.
function getRandomNumber() {
    do {
        n = Math.round((Math.random() * 10));
    } while (n === 0);
    return n;
}
