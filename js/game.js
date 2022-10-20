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
                updateBatteryButtons(true, tryBatteriesDefaultText.replace('_', batteries.getSelected()[0]), submitBatteriesDefaultText + ': ' + batteries.getSelected()[0]);
                turnFlashlightOff();
                break;
            case 2:
                let tryBatteriesText = tryBatteriesDefaultText.replace('_', batteries.getSelected()[0]).replace('_', batteries.getSelected()[1]);
                updateBatteryButtons(false, tryBatteriesText, submitBatteriesDefaultText + ': ' + batteries.getSelected().join(' , '));
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
        // Disable all buttons except the ones to reset the game.
        $('button:not(".reset-game")').attr('disabled', true);

        // Show the correct/wrong element and scroll into view.
        if (batteries.checkSelectedAreCharged()) {
            $('.result-correct').fadeIn(100);
        } else {
            $('.result-wrong').fadeIn(100);
            $('.result-wrong span').text(batteries.getCharged().sort().join(' , '))
        }
        $('html, body').animate({
            scrollTop: $('.result').offset().top
        }, 1000);
    });

    $('#remove-batteries').on('click touch', function(event) {
        if (batteries.hasSelected()) {
            batteries.removeSelected();
        }
        flashlightStatus.fadeOut(100, () => turnFlashlightOff());
        flashlightStatus.fadeIn(100);
        updateBatteryButtons(true, tryBatteriesDefaultText, submitBatteriesDefaultText);
    });

    $('.reset-game').on('click touch', function(event) {
        location.reload(true);
    });
});
