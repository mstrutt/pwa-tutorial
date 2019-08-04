// This file is for constants that we want to share between
// the main thread and the Service Worker. Using these for this
// guarantees that there are no typos while selecting the name
// of a message or a sync. It also means that if we ever want
// to change one of these. We need only do it in one place.

export const MESSAGES = {
  DO_SOMETHING: 'do-something',
  // ADD MORE MESSAGES HERE

};

export const SYNCS = {
  UPDATE: 'update',
};

// All other routes will be built from this so it's easy to change later
const API_BASE = 'http://localhost:3000';

export const API_ROUTES = {
  BASE: API_BASE,
  CONTACTS: `${API_BASE}/contacts`,
};
