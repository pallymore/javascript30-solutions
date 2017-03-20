const timerButtons = document.querySelectorAll('button.timer__button');
const customTimer = document.querySelector('#custom');
const customTimeInput = customTimer.querySelector('input');
const timeLeftDisplay = document.querySelector('.display__time-left');
const endTimeDisplay = document.querySelector('.display__end-time');
let prevTimer;

timerButtons.forEach((tb) => tb.addEventListener('click', () => timer(tb.dataset.time)));
customTimer.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!isNaN(customTimeInput.value)) {
    timer(customTimeInput.value * 60);
  }
});

function timer (secs) {
  clearInterval(prevTimer);
  const endTime = new Date(Date.now() + secs * 1000);
  updateEndTimeDisplay(endTime);
  updateTimeLeftDisplay(endTime);
  prevTimer = setInterval(() => updateTimeLeftDisplay(endTime), 200);
}

function updateEndTimeDisplay (endTime) {
  endTimeDisplay.textContent = `Be back at ${endTime.getHours()}: ${padTwo(endTime.getMinutes())}`;
}

function updateTimeLeftDisplay(endTime) {
  const mmLeft = endTime - Date.now();
  if (mmLeft > 0) {
    const secsLeft = Math.round(mmLeft / 1000);
    const mins = Math.floor(secsLeft / 60);
    const secs = secsLeft % 60;
    timeLeftDisplay.textContent = `${mins}:${padTwo(secs)}`;
    document.title = timeLeftDisplay.textContent;
  } else {
    clearInterval(prevTimer);
    document.title = "TIMER ENDED";
  }
}

function padTwo(num) {
  return num >= 10 ? num : `0${num}`;
}
