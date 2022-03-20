function resetTimer() {
    chrome.runtime.sendMessage({resetTimer : true});
}

function openSettings() {
    chrome.tabs.create({url:'../src/settings/settings.html'}, () => {})
}

window.onload=function(){
    document.getElementById("reset-timer-button").addEventListener("click", resetTimer);
    document.getElementById("settings").addEventListener("click", openSettings);
}

chrome.runtime.onMessage.addListener(function (req, sender, res){
    document.getElementById('timer').innerHTML = timerToString(req.actualTimer);
});

function timerToString(timer) {
    let hours = Math.floor(timer / 3600);
    let minutes = (Math.floor(timer / 60) % 60);
    let seconds = (timer % 60);
    return `${prepending(hours)}:${prepending(minutes)}:${prepending(seconds)}`;
}

function prepending(number) {
    let formattedNumber = ("0" + number).slice(-2);
    return formattedNumber;
}
