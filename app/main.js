import swMessage from './utils/message-promise';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => {
      console.log('[main.js] SW Registered');
      swMessage({
        name: 'do-something',
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
    })
}