import Dexie from 'dexie';

const db = new Dexie('pwa-tutorial');

db.version(1).stores({
  contacts: 'id, name, email, phone'
});

export default db;