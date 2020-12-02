var startingTimer = 25*60;
var actualTimer = startingTimer;
var timerOn = false;

chrome.alarms.create ('chrono', {
    delayInMinutes : 0.0,
    periodInMinutes : 1 / 60
});

chrome.alarms.onAlarm.addListener (function() {
    if (timerOn) {
        if (actualTimer == 0) {
            chrome.notifications.create({
                type: "basic",
                iconUrl: 'productivity.png',
                title: 'End of pomodoro session',
                message: 'Take some rest !'
            });
            timerOn= false;
        }
        chrome.runtime.sendMessage({actualTimer : actualTimer});
        actualTimer -= 1;
        chrome.storage.local.set({actualTimer: actualTimer}, function() {});
    }
    
});

chrome.runtime.onMessage.addListener(function (req, sender, res){
    if (req.resetTimer) {
        actualTimer = startingTimer;
        timerOn = true;
    }
});