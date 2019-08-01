import { MESSAGES, SYNCS } from './config';
import { updateContacts } from './utils/api-handlers';
import { FabForm } from './utils/fab-form';
import { ListHandler } from './utils/list-handler';
import { SyncBar } from './utils/sync-bar';

const listHandler = new ListHandler(document.querySelector('.contact-list'));
const syncBar = new SyncBar(document.querySelector('.sync-bar'));
const fabForm = new FabForm(document.querySelector('.fab-form'), listHandler.onSubmit);

updateContacts()
  .then(() => {
    listHandler.updateData();
  });

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => {
      console.log('[main.js] SW Registered');
    })
    .catch(() => {
      console.warn('[main.js] Failed to register service worker');
    });

  navigator.serviceWorker.addEventListener('message', (event) => {
    console.debug('[main.js] message received', event.data);
    // check the value of event.data to decide what to do
    if (!event.data || !event.data.name) {
      return;
    }

    const syncAction = ({
      [MESSAGES.SYNC_STARTED]: () => syncBar.syncing(),
      [MESSAGES.SYNC_SUCCESS]: () => {
        syncBar.success();
        listHandler.updateData();
      },
      [MESSAGES.SYNC_ERROR]: () => syncBar.error(),
    })[event.data.name];

    if (syncAction) {
      syncAction();
    }
  });
}
