const Timer = (() => {
    let totalSeconds = 0;
    let intervalId = null;
    let isRunning = false;
    
    const display = document.getElementById('timerDisplay');
    const minInput = document.getElementById('timerMinutes');
    const secInput = document.getElementById('timerSeconds');
    const startStopBtn = document.getElementById('timerStartStopBtn');

    function updateDisplay(seconds) {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        display.textContent = `${m}:${s}`;
    }

    function finish() {
        clearInterval(intervalId);
        isRunning = false;
        startStopBtn.textContent = '시작';
        display.textContent = "Time's Up!";
        // 알림음 재생 로직 등을 추가할 수 있음
        display.style.color = '#ff0000';
        setTimeout(() => display.style.color = '', 2000);
    }

    function toggle() {
        if (isRunning) {
            // 정지
            clearInterval(intervalId);
            isRunning = false;
            startStopBtn.textContent = '시작';
        } else {
            // 시작
            if (totalSeconds <= 0) {
                const m = parseInt(minInput.value) || 0;
                const s = parseInt(secInput.value) || 0;
                totalSeconds = m * 60 + s;
            }

            if (totalSeconds <= 0) return alert("시간을 설정해주세요.");

            updateDisplay(totalSeconds);
            isRunning = true;
            startStopBtn.textContent = '일시정지';

            intervalId = setInterval(() => {
                totalSeconds--;
                updateDisplay(totalSeconds);
                if (totalSeconds <= 0) finish();
            }, 1000);
        }
    }

    function reset() {
        clearInterval(intervalId);
        isRunning = false;
        startStopBtn.textContent = '시작';
        
        const m = parseInt(minInput.value) || 0;
        const s = parseInt(secInput.value) || 0;
        totalSeconds = m * 60 + s;
        
        updateDisplay(totalSeconds);
    }

    return { toggle, reset };
})();
