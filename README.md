# Events browser

This is a [Events browser](https://events-browser.vercel.app/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Description

The application is a simple event browser that allows users to search through the events based on their location. Moreover, it allows narrowing the search to particular and chosen categories. The application contains the "My favorites" tab, where it's possible to add or remove the event positions. They are saved in the browser under the address /favorites, and available even after the user finished the search. The pagination has been implemented as well.

## Architecture

Next.js was used to build this app.

There are two views in the application Home (for searching event) and Favourites (saved my favourites events)

Application has been implemented as SPA cause content of the service depends the most on location and private preferences of the user, so responses from the server would vary and it would be difficult to cache server site renders in efficient way.

Data are taken from external api [Ticketmaster](https://developer.ticketmaster.com/products-and-docs/apis/getting-started/). Free API limits requests to 5000 per day. 

## Google lighthouse results

## Getting Started And Develop

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deploy 

Application was deployed to Vercel
