import { API_ROUTES } from '../config';
import db from './dexie-setup';

export function updateData() {
  const updateContacts = fetch(API_ROUTES.CONTACTS)
    .then(data => data.json())
    .then(contacts => {
      return db.contacts.bulkPut(contacts)
        .then(() => contacts);
    });

  return Promise.all([
    updateContacts,
    new Promise(resolve => setTimeout(() => { resolve() }, 1500)),
  ]).then(([contacts]) => contacts);
}

export function createNewContact(contact) {
  return fetch(API_ROUTES.CONTACTS, {
    method: 'POST',
    body: JSON.stringify(contact),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Something went wrong on api server!');
      }
    })
    .then((serverContact) => {
      // Handle successful creation here
    })
    .catch(() => {
      // Handle network errors here
    });
}
