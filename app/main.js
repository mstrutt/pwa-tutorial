import { MESSAGES, SYNCS } from './config';
import { SyncBar } from './utils/sync-bar';
import swMessage from './utils/message-promise';

const syncBar = new SyncBar(document.querySelector('.sync-bar'));

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
          console.debug('[main.js] reply received', reply);
        });
    })
    .catch(() => {
      console.log('[main.js] Failed to register service worker');
    });

  navigator.serviceWorker.addEventListener('message', (event) => {
    console.debug('[main.js] message received', event.data);
    // check the value of event.data to decide what to do
    if (!event.data || !event.data.name) {
      return;
    }

    const syncAction = ({
      [MESSAGES.SYNC_STARTED]: () => syncBar.syncing(),
      [MESSAGES.SYNC_SUCCESS]: () => syncBar.success(),
      [MESSAGES.SYNC_ERROR]: () => syncBar.error(),
    })[event.data.name];

    if (syncAction) {
      syncAction();
    }
  });

  document.getElementById('sync-button').addEventListener('click', () => {
    navigator.serviceWorker.ready.then((registration) => {
      return registration.sync.register(SYNCS.UPDATE);
    });
  });
}