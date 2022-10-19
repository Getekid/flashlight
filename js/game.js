$(document).ready(function () {
    let batteries = new Batteries();
    const batteryButtons = $('.battery');
    const tryBatteriesButton = $('#try-batteries');
    const tryBatteriesDefaultText = tryBatteriesButton.text().trim();
    const submitBatteriesButton = $('#submit-batteries');
    const submitBatteriesDefaultText = submitBatteriesButton.text().trim();

    const flashlightStatus = $('.flashlight-status');

    function updateBatteryButtons(disabled, tryText, submitText) {
        batteryButtons.removeClass('selected');
        batteries.getSelected().forEach(battery => batteryButtons.filter('#battery-' + battery).addClass('selected'));
        // Also update the "Try" and "Submit buttons".
        tryBatteriesButton.prop('disabled', disabled);
        tryBatteriesButton.children('p').text(tryText);
        submitBatteriesButton.prop('disabled', disabled);
        submitBatteriesButton.children('p').text(submitText);
    }

    function turnFlashlightOn() {
        flashlightStatus.addClass('on');
        flashlightStatus.attr('aria-label', 'Flashlight is on');
    }

    function turnFlashlightOff() {
        flashlightStatus.removeClass('on');
        flashlightStatus.attr('aria-label', 'Flashlight is off');
    }

    // When selecting a battery then toggle selection
    // and update the "try" button accordingly.
    batteryButtons.on('click touch', function(event) {
        let battery = this.id.split('-')[1];
        battery = parseInt(battery);
        batteries.toggleSelection(battery);
        switch (batteries.getSelected().length) {
            case 0:
                updateBatteryButtons(true, tryBatteriesDefaultText, submitBatteriesDefaultText);
                break;
            case 1:
                updateBatteryButtons(true, 'Try ' + batteries.getSelected()[0] + ', _', submitBatteriesDefaultText + ': ' + batteries.getSelected()[0]);
                turnFlashlightOff();
                break;
            case 2:
                updateBatteryButtons(false, 'Try ' + batteries.getSelected().join(', '), submitBatteriesDefaultText + ': ' + batteries.getSelected().join(', '));
                break;
        }
    });

    tryBatteriesButton.on('click touch', function(event) {
        flashlightStatus.fadeOut(100, () => {
            if (batteries.checkOneSelectedIsCharged()) {
                turnFlashlightOn();
            } else {
                turnFlashlightOff();
            }
        });
        flashlightStatus.fadeIn(100);
    });

    submitBatteriesButton.on('click touch', function(event) {
        let correctAnswerText = 'Correct answer: ' + batteries.getCharged().join(', ');
        if (batteries.checkSelectedAreCharged()) {
            alert('CONGRATULATIONS! You found them! ' + correctAnswerText);
        } else {
            alert('GAME OVER! Try again. ' + correctAnswerText);
        }
        location.reload(true);
    });

    $('#remove-batteries').on('click touch', function(event) {
        if (batteries.hasSelected()) {
            batteries.removeSelected();
        }
        flashlightStatus.fadeOut(100, () => turnFlashlightOff());
        flashlightStatus.fadeIn(100);
        updateBatteryButtons(true, tryBatteriesDefaultText, submitBatteriesDefaultText);
    });
});
