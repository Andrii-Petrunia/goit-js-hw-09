import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const initialDelay = Number(form.elements.delay.value);
  const step = Number(form.elements.step.value);
  const amount = Number(form.elements.amount.value);

  if (isNaN(initialDelay) || isNaN(step) || isNaN(amount)) {
    Notiflix.Notify.failure('Please enter valid numeric values');
    return;
  }

  let delay = initialDelay;

  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });

    delay += step;
  }
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
