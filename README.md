This is a quick demo of displaying some custom map tiles, which we are serving using [mbtileserver](https://github.com/consbio/mbtileserver), using either [deck.gl](https://deck.gl/) or just [maplibre-gl](https://maplibre.org/). This repository is just the test frontend code for now.

To use this do:

* Set the environment variable TILE_SERVER_HOST_AND_PORT with the host and port of your mbtileserver instance
* npm install
* npx webpack --config webpack.config.js
* npm run lite (to fire up a local http server, should auto open in your browser)

The style JSON we use is a copy of [positrol-gl-style](https://github.com/openmaptiles/positron-gl-style) (BSD3, CC-BY 4.0) with some local changes to match our tile style.
