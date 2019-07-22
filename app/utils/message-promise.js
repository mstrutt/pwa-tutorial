export default function swMessage(message) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();

    channel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data);
        return;
      }
      resolve(event.data);
    };

    navigator.serviceWorker.controller.postMessage(message, [channel.port2]);
  });
}
