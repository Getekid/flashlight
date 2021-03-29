$(document).ready(function () {
    let batteries = new Batteries();
    const tryBatteriesButton = $('#try-batteries');
    const tryBatteriesDefaultText = tryBatteriesButton.text().trim();
    const submitBatteriesButton = $('#submit-batteries');
    const submitBatteriesDefaultText = submitBatteriesButton.text().trim();

    function updateBatteryButtons(disabled, tryText, submitText) {
        tryBatteriesButton.prop('disabled', disabled);
        tryBatteriesButton.children('p').text(tryText);
        submitBatteriesButton.prop('disabled', disabled);
        submitBatteriesButton.children('p').text(submitText);
    }

    // When selecting a battery then toggle selection
    // and update the "try" button accordingly.
    $('.battery').on('click touch', function(event) {
        let battery = this.id.split('-')[1];
        battery = parseInt(battery);
        batteries.toggleSelection(battery);
        switch (batteries.getSelected().length) {
            case 0:
                updateBatteryButtons(true, tryBatteriesDefaultText, submitBatteriesDefaultText);
                break;
            case 1:
                updateBatteryButtons(true, tryBatteriesDefaultText, submitBatteriesDefaultText + ' ' + batteries.getSelected()[0]);
                break;
            case 2:
                updateBatteryButtons(false, 'Try batteries ' + batteries.getSelected().join(','), submitBatteriesDefaultText + ' ' + batteries.getSelected().join(','));
                break;
        }
    });

    tryBatteriesButton.on('click touch', function(event) {
        if (batteries.checkOneSelectedIsCharged()) {
            alert('Flashlight is ON');
        } else {
            alert('Flashlight is OFF');
        }
    });

    submitBatteriesButton.on('click touch', function(event) {
        if (batteries.checkSelectedAreCharged()) {
            alert('You found them :) !');
        } else {
            alert('You did not find them');
        }
    });

    $('#remove-batteries').on('click touch', function(event) {
        if (batteries.hasSelected()) {
            batteries.removeSelected();
        }
        updateBatteryButtons(true, tryBatteriesDefaultText, submitBatteriesDefaultText);
    });
});
