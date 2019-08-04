// This file is shared between Service Worker and the main thread

import Dexie from 'dexie';

const db = new Dexie('pwa-tutorial');

// Add new version and stores BELOW here

db.version(1).stores({
  contacts: 'id, name, email, phone'
});

db.version(2).stores({
  updated_contacts: 'id, name, email, phone'
});

// Add new versions and stores ABOVE here

export default db;