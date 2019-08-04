// This file is shared between Service Worker and the main thread

import Dexie from 'dexie';

const db = new Dexie('pwa-tutorial');

// Add new version and stores BELOW here

// Add new versions and stores ABOVE here

export default db;