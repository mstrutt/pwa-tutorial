self.addEventListener('message', (event) => {
  console.log('[SW] message received', event.data.name);

  const replyPort = event.ports[0];
  if (event.data.name === 'do-something') {
    doSomething(event.data)
      .then((response) => replyPort.postMessage(response))
      .catch((error) => replyPort.postMessage({ error }));
  }
});

function doSomething() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('success');
    }, 1000);
  })
}