window.onload=function() {
    let defaultTimer = localStorage.getItem('defaultTimer');
    if (defaultTimer) {
        document.getElementById('session-timer').value = defaultTimer;
    }
    document.getElementById("submit-btn").addEventListener("click", submit);
}

function submit() {
    localStorage.setItem('defaultTimer', document.getElementById('session-timer').value);
}
