This directory contains a simple React based country search UI based on https://restcountries.eu. Additionally it will query http://www.weatherstack.com for current weather data if you configure you API access key in src/App.js.

## Available Scripts

All the standard create-react-app stuff apply here. In addition you can run the following.

### `npm run server`

Runs a json-server in port 3001 that will serve db.json from the project root. If you are offline or want to provide you customized country list for the app during testing you can use this feature to achieve that. This has to be enabled in src/App.js as well, since it will be default call the REST Countries ALL endpoint.
