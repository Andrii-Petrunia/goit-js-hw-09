// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.getElementById('datetime-picker');
const startButton = document.querySelector('[data-start]');

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    if (selectedDate <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownIntervalId;

startButton.addEventListener('click', startTimer);

function startTimer() {
  const selectedDate = flatpickr.parseDate(datetimePicker.value, 'Y-m-d H:i');
  if (selectedDate <= new Date()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }

  clearInterval(countdownIntervalId);

  function updateTimer() {
    const now = new Date();
    const timeDifference = selectedDate - now;

    if (timeDifference <= 0) {
      clearInterval(countdownIntervalId);
      updateTimeElements(0);
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    updateTimeElements(days, hours, minutes, seconds);
  }

  updateTimer();
  countdownIntervalId = setInterval(updateTimer, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor((ms % hour) / minute);
  const seconds = Math.floor((ms % minute) / second);

  return { days, hours, minutes, seconds };
}

function updateTimeElements(days, hours, minutes, seconds) {
  daysElement.textContent = days ? days.toString().padStart(2, '0') : '00';
  hoursElement.textContent = hours ? hours.toString().padStart(2, '0') : '00';
  minutesElement.textContent = minutes
    ? minutes.toString().padStart(2, '0')
    : '00';
  secondsElement.textContent = seconds
    ? seconds.toString().padStart(2, '0')
    : '00';
}
