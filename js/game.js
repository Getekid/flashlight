$(document).ready(function () {
    let batteries = new Batteries();
    const tryInputBatteries = $('.battery-input-try');
    const submitInputBatteries = $('.battery-input-submit');
    const emptyNumber = '#';

    // When selecting a battery then toggle selection
    // and populate/remove the input elements accordingly.
    $('.battery').on('click touch', function(event) {
        let battery = this.id.split('-')[1];
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
});
