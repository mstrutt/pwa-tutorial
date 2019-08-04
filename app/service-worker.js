import { MESSAGES, SYNCS } from "./js/config";
import { updateContacts, postUnsyncedContacts } from './js/api-handlers';

self.addEventListener('sync', (event) => {
  console.debug('[SW] Sync triggered', event.tag);
  if (event.tag === SYNCS.UPDATE) {
    messageAllClients({ name: MESSAGES.SYNC_STARTED });
    event.waitUntil(
      syncContacts()
        .then(response => messageAllClients({
          name: MESSAGES.SYNC_SUCCESS,
          data: response,
        }))
        .catch(error => {
          messageAllClients({
            name: MESSAGES.SYNC_ERROR,
            data: error.message,
          });
          return Promise.reject(error);
        })
    );
  }
});

self.skipWaiting();

function syncContacts() {
  return postUnsyncedContacts()
    .then(() => updateContacts());
}

function messageAllClients(message) {
  return clients.matchAll({ type: 'window' })
    .then((clientList) => {
      console.debug(clientList);
      clientList.forEach((client) => {
        client.postMessage(message);
      });
    });
}
