$(document).ready(function () {
    let batteries = new Batteries();
    const tryInputBatteries = $('.battery-input-try');
    const submitInputBatteries = $('.battery-input-submit');
    const emptyNumber = '#';

    // When selecting a battery then toggle selection
    // and populate/remove the input elements accordingly.
    $('.battery').on('click touch', function(event) {
        let battery = this.id.split('-')[1];
        battery = parseInt(battery);
        batteries.toggleSelection(battery);
        if (batteries.isSelected(battery)) {
            tryInputBatteries.filter(function() {
                return $(this).text() === emptyNumber;
            }).first().text(battery);
            submitInputBatteries.filter(function() {
                return $(this).text() === emptyNumber;
            }).first().text(battery);
        } else {
            tryInputBatteries.filter(function() {
                return $(this).text() == battery;
            }).text(emptyNumber);
            submitInputBatteries.filter(function() {
                return $(this).text() == battery;
            }).text(emptyNumber);
        }
    });

    $('#try-batteries').on('click touch', function(event) {
        if (batteries.checkOneSelectedIsCharged()) {
            alert('Flashlight is ON');
        } else {
            alert('Flashlight is OFF');
        }
    });

    $('#submit-batteries').on('click touch', function(event) {
        if (batteries.checkSelectedAreCharged()) {
            alert('You found them :) !');
        } else {
            alert('You did not find them');
        }
    })
});
