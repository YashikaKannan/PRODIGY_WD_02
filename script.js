let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 1;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const laps = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(getShowTime, 1);
        running = true;
        startStopButton.innerHTML = 'Stop';
    } else {
        clearInterval(tInterval);
        running = false;
        startStopButton.innerHTML = 'Start';
    }
}

function reset() {
    clearInterval(tInterval);
    running = false;
    display.innerHTML = '00:00:00';
    startStopButton.innerHTML = 'Start';
    difference = 0;
    laps.innerHTML = '';
    lapCounter = 1;
}

function lap() {
    if(running) {
        const lapTime = display.innerHTML;
        const li = document.createElement('li');
        li.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        laps.appendChild(li);
        lapCounter++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = (hours < 10 ? '0' : '') + hours + ':' + 
                        (minutes < 10 ? '0' : '') + minutes + ':' + 
                        (seconds < 10 ? '0' : '') + seconds + ':' + 
                        (milliseconds < 10 ? '0' : '') + milliseconds;
}
startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
