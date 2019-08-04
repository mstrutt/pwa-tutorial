import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute.mjs';
import { MESSAGES, SYNCS } from "./js/config";
import { updateContacts, postUnsyncedContacts } from './js/api-handlers';

// Using SW Workbox to save all our files for offline access
importScripts('./sw-workbox.js');
if (precacheFiles) {
  precacheAndRoute(precacheFiles);
} else {
  console.warn('Failed to precache files, offline functionality will be unavailable');
}

// Listening for the sync event
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

// Sequentially pushing up any unsynced changes, then pulling down latest data
function syncContacts() {
  return postUnsyncedContacts()
    .then(() => updateContacts());
}

// Helper function we created to communicate with all connected browser windows
function messageAllClients(message) {
  return clients.matchAll({ type: 'window' })
    .then((clientList) => {
      console.debug(clientList);
      clientList.forEach((client) => {
        client.postMessage(message);
      });
    });
}
