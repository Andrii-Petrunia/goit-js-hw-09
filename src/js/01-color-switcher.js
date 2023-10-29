const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

let intervalId = null;

startButton.addEventListener('click', () => {
  if (intervalId) return; // Забороняємо запускати багато інтервалів

  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', () => {
  if (!intervalId) return; // Зупиняємо інтервал тільки, якщо він запущений

  clearInterval(intervalId);
  intervalId = null;

  startButton.disabled = false;
  stopButton.disabledtr = true;
});
