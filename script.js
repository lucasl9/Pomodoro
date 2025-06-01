let initialTime = 25*60;
let remainigTime = initialTime;
let timerInterval = null;
let isRunning = false;

const minutesDisplay = document.getElementById ('minutes');
const secondDisplay = document.getElementById ('seconds');
const startButton = document.getElementById ('start');
const pauseButton = document.getElementById ('pause');
const resetbutton = document.getElementById ('reset');

function updateDisplay() {
   const minutes = Math.floor(remainigTime / 60);
   const seconds = remainigTime % 60;

   minutesDisplay.textContent = String(minutes).padStart(2,'0');
   secondDisplay.textContent = String(seconds).padStart(2,'0');
}
function playBeep(){
   const context = new(window.AudioContext || window.webkitAudioContext)();
   const oscillator = context.createOscillator();
   oscillator.type = 'sawtooth';
   oscillator.frequency.setValueAtTime(600, context.currentTime);
   oscillator.connect(context.destination);
   oscillator.start();
   oscillator.stop(context.currentTime + 0.450);
}
let beepLoopInterval = null

function startBeepLoop(){
   if (beepLoopInterval) return;
   beepLoopInterval = setInterval(playBeep, 900);
}

function stopBeepLoop() {
   clearInterval(beepLoopInterval);
   beepLoopInterval = null;
}

function startTimer(){
   if (isRunning) return;
   isRunning = true;

   timerInterval = setInterval(() =>{
      if (remainigTime > 0) {
         remainigTime--;
         updateDisplay();
      } else {
         clearInterval(timerInterval);
         isRunning = false;
         startBeepLoop();
      }
   },1000);
}

function pauseTimer() {
   clearInterval(timerInterval);
   isRunning = false;
}

function resetTimer() {
   clearInterval(timerInterval);
   remainigTime = initialTime;
   updateDisplay();
   isRunning = false;
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetbutton.addEventListener('click', () => {
   stopBeepLoop();
   resetTimer();
});

updateDisplay();