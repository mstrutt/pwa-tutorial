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

  // LISTENT FOR MESSAGES FROM THE SERVICE WORKER HERE
  
}
