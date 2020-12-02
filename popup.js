function resetTimer() {
    chrome.runtime.sendMessage({resetTimer : true});
}

window.onload=function(){
    document.getElementById("reset-timer-button").addEventListener("click", resetTimer);
}

chrome.runtime.onMessage.addListener(function (req, sender, res){
    document.getElementById('timer').innerHTML = timerToString(req.actualTimer);
});

function timerToString(timer) {
    var hours = Math.floor(timer / 3600);
    var minutes = (Math.floor(timer / 60) % 60);
    var seconds = (timer % 60);
    return `${prepending(hours)}:${prepending(minutes)}:${prepending(seconds)}`;
}

function prepending(number) {
    var formattedNumber = ("0" + number).slice(-2);
    return formattedNumber;
}