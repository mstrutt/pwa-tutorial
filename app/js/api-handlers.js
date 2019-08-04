import { API_ROUTES, SYNCS } from './config';
import db from './dexie-setup';

// Function to pull down the latest contacts data from the API
export function updateContacts() {
  const updateContactsRequest = getContactsFromAPI()
    .then(contacts => {
      return db.contacts.bulkPut(contacts)
        .then(() => contacts);
    });

  // Making this function take at least 1.5 seconds by depending on a timeout
  // This is purely for the sake of visually testing the syncs
  return Promise.all([
    updateContactsRequest,
    new Promise(resolve => setTimeout(() => { resolve() }, 1500)),
  ]).then(([contacts]) => contacts);
}

// Sending our newly created contact to the server, using offline
// functionality as a backup if this failes
export function createNewContact(contact) {
  return postContactToApi(contact)
    .then((serverContact) => {
      return db.contacts.put(serverContact)
        .then(() => serverContact);
    })
    .catch(() => {
      // Add the contact to those waiting to be synced
      return db.updated_contacts.put(contact)
        .then(() => {
          // Get the registration for the service worker.
          // Then trigger a sync
          return navigator.serviceWorker.ready.then((registration) => {
            return registration.sync.register(SYNCS.UPDATE);
          });
        });
    });
}

// Sync task to pull any contacts that haven't been synced
// from IndexedDB and post them to the server
export function postUnsyncedContacts() {
  return db.updated_contacts.toArray()
    .then((contacts) => {
      if (!contacts.length) {
        return Promise.resolve();
      }
      return Promise.all(
        contacts.map((contact) => {
          return postContactToApi(contact)
            .then(() => {
              // Remove the individual contact from the updated
              // contacts table now it has been synced
              return db.updated_contacts
                .where({id: contact.id})
                .delete();
            });
        })
      );
    });
}

// Network request for getting contacts from the API.
// Used in both the sync and in direct calls in the main thread.
export function getContactsFromAPI() {
  return fetch(API_ROUTES.CONTACTS)
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    });
}

// Network request for posting a new contact to the API.
// Used by the sync and by the initial request.
export function postContactToApi(contact) {
  return fetch(API_ROUTES.CONTACTS, {
    method: 'POST',
    body: JSON.stringify(contact),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    });
}
