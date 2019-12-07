# Travel Planning Web App

## About

This is a travel planning web app which makes use of multiple third-party APIs to display information about your destination.

An express server acts as the backend, serving static html, css and client js. The server also serves JSON objects via API endpoints. The client-side js uses this API data to build and display new elements in the browser.

## Instructions

### Build & Run

1. Clone this repo
1. Run `npm install` to install dependencies
1. Remove _TEMPLATE suffix from file `./.env`
1. In `.env`, enter your respective API credentials in the appropriate positions
1. Run `npm run prod` to build the dist directory
1. Run `npm start` to start the express server
1. Navigate to http://localhost:3000 in your favourite web browser
1. Enter a city, country and departure date in the form and click the Add button

### Testing

1. Run `npm test` to execute all the jest tests present

## Dependencies

### Jest

* jest
* jest-cli
* babel-jest
* supertest

### Babel

* @babel/core
* @babel/preset-env

### Webpack

* webpack
* webpack-cli
* webpack-dev-server
* style-loader
* css-loader
* node-sass
* sass-loader
* html-webpack-plugin
* mini-css-extract-plugin
* serviceworker-webpack-plugin

### Express

* express
* body-parser
* cors
* node-fetch
* dotenv
