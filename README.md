To use this do:

* Set the env var TILE_SERVER_HOST_AND_PORT with the host and port of your tile server
* npm install
* npx webpack --config webpack.config.js
* npm run lite (to fire up a local http server, should auto open in your browser)

The style JSON we use is a copy of https://github.com/openmaptiles/positron-gl-style (BSD3, CC-BY 4.0) with some local changes to match our tile style.
