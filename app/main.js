import { MESSAGES } from './config';
import swMessage from './utils/message-promise';

window.addEventListener('message', (event) => {
  console.log(event.data);
});

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => {
      console.log('[main.js] SW Registered');
      swMessage({
        name: MESSAGES.DO_SOMETHING,
        data: {
          test: true
        }
      })
        .then((reply) => {
          console.log('[main.js] reply received', reply);
        });
    })
    .catch(() => {
      console.log('[main.js] Nope');
    });

  navigator.serviceWorker.addEventListener('message', (event) => {
    // check the value of event.data to decide what to do
  });
}