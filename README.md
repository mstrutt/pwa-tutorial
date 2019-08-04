# Building a data-rich Progressive Web App

This repo is designed to be a companion to my tutorial in the August 2019 issue of NET mag.

## Setup

I've tried this on node versions 9 and 12 without any issues (Linux and Mac respectively). Getting up and running should be as simple as:

```
npm install
npm start
```

`parcel` handles all of the bundling as well as the local dev server with livereload. `json-server` provides us with a simple REST API for our contacts which we can edit in `db.json`. Both of these tasks are started when you run `npm start`.

## Following the tutorial

If you'd like to code along with the magazine tutorial, I suggest checkout out the `starting-point` branch. If you'd like to see the finishing state along with some extra comments explaining things, take a look at `master`.

As offline caching of a page has been covered in previous articles, for this project I've used [SW Workbox](https://developers.google.com/web/tools/workbox/) along with [parcel-plugin-sw-cache](https://github.com/mischnic/parcel-plugin-sw-cache) to have a simple cache of the project files that's updated when they change.

For following along the tutorial I recommend having "Update on reaload" and "Bypass for network" ticked in Chrome DevTools Application tab.

## External links

- https://github.com/typicode/json-server a simple REST API to work with in development
- https://dexie.org/ nicest way to use IndexedDB that I’ve found so far
- https://github.com/parcel-bundler/parcel letting me jump in and start coding without spending ages setting a build process up
- https://developers.google.com/web/tools/workbox/ taking the headache out of caching logic and integrating easily into your workflow
- https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/ for a deeper dive into how the different Service Worker technologies work
- https://developers.google.com/web/fundamentals/codelabs/debugging-service-workers/ a deeper dive into debugging Service Workers
- https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers a great tutorial with links out to the relevant parts of the spec throughout

All the data included for testing purposes was generated using [https://www.generatedata.com](https://www.generatedata.com).

## Photo credits

- [Muriwai mailboxes](https://unsplash.com/photos/fb7yNPbT0l8) by [Mathyas Kurmann](https://unsplash.com/@mathyaskurmann)
- [Copenhagen Station](https://unsplash.com/photos/Oi7-A4U6Pk0) by [Linus Rogge](https://unsplash.com/@linuscodes)