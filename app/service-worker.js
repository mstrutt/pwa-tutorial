import { MESSAGES } from "./config";

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
  // Handle the sync event here
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