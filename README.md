# Building a data-rich Progressive Web App

This repo is designed to be a companion to my tutorial in the August 2019 issue of NET mag.

## Setup

I've tried this on node versions 9 and 12 without any issues. Getting up and running should be as simple as:

```
npm install
npm start
```

`parcel` handles all of the bundling as well as the local dev server with livereload. `json-server` provides us with a simple REST API for our contacts which we can edit in `db.json`. Both of these tasks are started when you run `npm start`.

## External links

- [https://github.com/typicode/json-server](https://github.com/typicode/json-server) a simple REST API to work with in development
- [https://dexie.org/](https://dexie.org/) nicest way to use IndexedDB that I’ve found so far
- [https://github.com/parcel-bundler/parcel](https://github.com/parcel-bundler/parcel) letting me jump in and start coding without spending ages setting a build process up
- [https://developers.google.com/web/tools/workbox/](https://developers.google.com/web/tools/workbox/) taking the headache out of caching logic and integrating easily into your workflow
- [https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/](https://developers.google.com/web/fundamentals/instant-and-offline/offline-cookbook/) for a deeper dive into how the different service worker technologies work
- [https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers) a great tutorial with links out to the relevant parts of the spec throughout

All the data included for testing purposes was generated using [https://www.generatedata.com](https://www.generatedata.com).