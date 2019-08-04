import { MESSAGES, SYNCS } from './js/config';
import { updateContacts } from './js/api-handlers';
import { FabForm } from './js/fab-form';
import { ListHandler } from './js/list-handler';
import { SyncBar } from './js/sync-bar';

// Setting up the UI components that are used in this app.
const listHandler = new ListHandler(document.querySelector('.contact-list'));
const syncBar = new SyncBar(document.querySelector('.sync-bar'));
const fabForm = new FabForm(document.querySelector('.fab-form'), listHandler.onSubmit);

// Triggering an update of the contacts data on page load
updateContacts()
  .then(() => {
    listHandler.updateData();
  });

if ('serviceWorker' in navigator) {
  // Registering our Service Worker
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => {
      console.debug('[main.js] SW Registered');
    })
    .catch(() => {
      console.warn('[main.js] Failed to register service worker');
    });

  // Listening for messages from the Service Worker (like when messageAllClients is called)
  navigator.serviceWorker.addEventListener('message', (event) => {
    console.debug('[main.js] message received', event.data);
    // check the value of event.data to decide what to do
    if (!event.data || !event.data.name) {
      return;
    }

    // Mapping the event.data.name of the message we're sending from the
    // Service Worker to the correct status that we want to show.
    const syncAction = ({
      [MESSAGES.SYNC_STARTED]: () => syncBar.syncing(),
      [MESSAGES.SYNC_SUCCESS]: () => {
        // Updating the sync bar as well as rendering the freshly synced data
        syncBar.success();
        listHandler.updateData();
      },
      [MESSAGES.SYNC_ERROR]: () => syncBar.error(),
    })[event.data.name];

    // Only responding if this was one of the message we were looking for
    if (syncAction) {
      syncAction();
    }
  });
}
