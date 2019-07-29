import { API_ROUTES } from '../config';
import db from './dexie-setup';

export function updateContacts() {
  const updateContactsRequest = getContactsFromAPI()
    .then(contacts => {
      return db.contacts.bulkPut(contacts)
        .then(() => contacts);
    });

  return Promise.all([
    updateContactsRequest,
    new Promise(resolve => setTimeout(() => { resolve() }, 1500)),
  ]).then(([contacts]) => contacts);
}

export function createNewContact(contact) {
  return postContactToApi(contact)
    .then((serverContact) => {
      return db.contacts.put(serverContact)
        .then(() => serverContact);
    })
    .catch(() => {
      return db.updated_contacts.put(contact)
        .then(() => {
          // We'll handle this later
        });
    });
}

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
