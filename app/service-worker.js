import { MESSAGES, SYNCS } from "./config";
import { updateData } from './utils/api-handlers';

self.addEventListener('message', (event) => {
  console.log('[SW] message received', event.data.name);

  const replyPort = event.ports[0];
  if (event.data.name === MESSAGES.DO_SOMETHING) {
    doSomething(event.data)
      .then((response) => replyPort.postMessage(response))
      .catch((error) => replyPort.postMessage({ error }));
  }
});

self.addEventListener('sync', (event) => {
  if (event.tag === SYNCS.UPDATE) {
    messageAllCleints({ name: MESSAGES.SYNC_STARTED });
    event.waitUntil(
      updateData()
        .then(response => messageAllCleints({
          name: MESSAGES.SYNC_SUCCESS,
          data: response,
        }))
        .catch(error => {
          messageAllCleints({
            name: MESSAGES.SYNC_ERROR,
            data: error,
          });
          return Promise.reject(error);
        })
    );
  }
});

self.skipWaiting();

function messageAllCleints(message) {
  return clients.matchAll({ type: 'window' })
    .then((clientList) => {
      clientList.forEach((client) => {
        client.postMessage(message);
      });
    });
}

// Testing functions
function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, 1000);
  })
}
