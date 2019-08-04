import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute.mjs';
import { MESSAGES, SYNCS } from "./js/config";
import { syncContacts } from './js/api-handlers';

// Using SW Workbox to save all our files for offline access
importScripts('./sw-workbox.js');
if (precacheFiles) {
  precacheAndRoute(precacheFiles);
} else {
  console.warn('Failed to precache files, offline functionality will be unavailable');
}

self.skipWaiting();

// ADD THE SYNC EVENT LISTENER HERE



// ADD THE messageAllClients HELPER HERE
