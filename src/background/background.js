let startingTimer = 25*60;
let actualTimer = startingTimer;
let timerOn = false;

chrome.alarms.create ('chrono', {
    delayInMinutes : 0.0,
    periodInMinutes : 1 / 60
});

chrome.alarms.onAlarm.addListener (() => {
    if (timerOn) {
        if (actualTimer == 0) {
            sendPomodoroEndNotification();
            timerOn= false;
        }
        chrome.runtime.sendMessage({actualTimer : actualTimer});
        actualTimer -= 1;
        chrome.storage.local.set({actualTimer: actualTimer}, () => {});
    }
    
});

chrome.runtime.onMessage.addListener((req, sender, res) => {
    if (req.resetTimer) {
        actualTimer = startingTimer;
        timerOn = true;
    }
});


function sendPomodoroEndNotification() {
    chrome.notifications.create({
        type: "basic",
        iconUrl: '../../assets/images/productivity.png',
        title: 'End of pomodoro session',
        message: 'Take some rest !'
    });
}
