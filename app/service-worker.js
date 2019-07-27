import { MESSAGES, SYNCS } from "./config";

self.addEventListener('message', (event) => {
  console.log('[SW] message received', event.data.name);

  const replyPort = event.ports[0];
  if (event.data.name === MESSAGES.DO_SOMETHING) {
    doSomething(event.data)
      .then((response) => replyPort.postMessage(response))
      .catch((error) => replyPort.postMessage({ error }));
  }
});

function messageAllCleints(message) {
  return clients.matchAll({ type: 'window' })
    .then((clientList) => {
      clientList.forEach((client) => {
        client.postMessage(message);
      });
    });
}

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

setTimeout(() => {
  messageAllCleints('test');
}, 5000);

// Testing functions
function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, 1000);
  })
}

function updateData() {
  console.debug('[SW] Beginning update sync');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      console.debug('[SW] Finished update sync');
    }, 1000);
  });
}
