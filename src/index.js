
import {Deck} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import maplibregl from 'maplibre-gl';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
  'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
  latitude: 1,
  longitude: -78,
  zoom: 7,
  bearing: 0,
  pitch: 30
};

document.addEventListener("DOMContentLoaded", () => {

  let sources = {
    'carto': {
      'type': 'vector',
      'url': 'https://tiles.basemaps.cartocdn.com/vector/carto.streets/v1/tiles.json'
    },
  };

  for (let i = 2001; i <= 2020; i++ ) {
    sources[String(i)] = {
        type: 'raster',
        url: 'http://' + MAPTILE_SERVER_HOST_AND_PORT + '/services/' + i + '_10N_080W/',
        tileSize: 256,
        attribution: '4C Kartor Fabrik'
    }
  };

  const map = new maplibregl.Map({
    container: 'map',
    style: {
              'version': 8,
              'sources': sources,
              'layers': [
                {
                  'id': 'background',
                  'type': 'background',
                  'layout': {
                    'visibility': 'visible',
                  },
                  'paint': {
                    'background-color': '#fafaf8',
                    'background-opacity': 1
                  }
                },
                {
                  "id": "landcover",
                  "type": "fill",
                  "source": "carto",
                  "source-layer": "landcover",
                  "filter": [
                    "any",
                    [
                      "==",
                      "class",
                      "wood"
                    ],
                    [
                      "==",
                      "class",
                      "grass"
                    ],
                    [
                      "==",
                      "subclass",
                      "recreation_ground"
                    ]
                  ],
                  "paint": {
                    "fill-color": {
                      "stops": [
                        [
                          8,
                          "rgba(234, 241, 233, 0.5)"
                        ],
                        [
                          9,
                          "rgba(234, 241, 233, 0.5)"
                        ],
                        [
                          11,
                          "rgba(234, 241, 233, 0.5)"
                        ],
                        [
                          13,
                          "rgba(234, 241, 233, 0.5)"
                        ],
                        [
                          15,
                          "rgba(234, 241, 233, 0.5)"
                        ]
                      ]
                    },
                    "fill-opacity": 1
                  }
                },
                {
                  "id": "boundary_county",
                  "type": "line",
                  "source": "carto",
                  "source-layer": "boundary",
                  "minzoom": 9,
                  "maxzoom": 24,
                  "filter": [
                    "all",
                    [
                      "==",
                      "admin_level",
                      6
                    ],
                    [
                      "==",
                      "maritime",
                      0
                    ]
                  ],
                  "paint": {
                    "line-color": {
                      "stops": [
                        [
                          4,
                          "#ead5d7"
                        ],
                        [
                          5,
                          "#ead5d7"
                        ],
                        [
                          6,
                          "#e1c5c7"
                        ]
                      ]
                    },
                    "line-width": {
                      "stops": [
                        [
                          4,
                          0.5
                        ],
                        [
                          7,
                          1
                        ]
                      ]
                    },
                    "line-dasharray": {
                      "stops": [
                        [
                          6,
                          [
                            1
                          ]
                        ],
                        [
                          7,
                          [
                            2,
                            2
                          ]
                        ]
                      ]
                    }
                  }
                },
                {
                  "id": "boundary_state",
                  "type": "line",
                  "source": "carto",
                  "source-layer": "boundary",
                  "minzoom": 4,
                  "filter": [
                    "all",
                    [
                      "==",
                      "admin_level",
                      4
                    ],
                    [
                      "==",
                      "maritime",
                      0
                    ]
                  ],
                  "paint": {
                    "line-color": {
                      "stops": [
                        [
                          4,
                          "#ead5d7"
                        ],
                        [
                          5,
                          "#ead5d7"
                        ],
                        [
                          6,
                          "#e1c5c7"
                        ]
                      ]
                    },
                    "line-width": {
                      "stops": [
                        [
                          4,
                          0.5
                        ],
                        [
                          7,
                          1
                        ],
                        [
                          8,
                          1
                        ],
                        [
                          9,
                          1.2
                        ]
                      ]
                    },
                    "line-dasharray": {
                      "stops": [
                        [
                          6,
                          [
                            1
                          ]
                        ],
                        [
                          7,
                          [
                            2,
                            2
                          ]
                        ]
                      ]
                    }
                  }
                },
                {
                  "id": "water",
                  "type": "fill",
                  "source": "carto",
                  "source-layer": "water",
                  "minzoom": 0,
                  "maxzoom": 24,
                  "filter": [
                    "all",
                    [
                      "==",
                      "$type",
                      "Polygon"
                    ]
                  ],
                  "layout": {
                    "visibility": "visible"
                  },
                  "paint": {
                    "fill-color": "#d4dadc",
                    "fill-antialias": true,
                    "fill-translate-anchor": "map",
                    "fill-opacity": 1
                  }
                },
                {
                  "id": "water_shadow",
                  "type": "fill",
                  "source": "carto",
                  "source-layer": "water",
                  "minzoom": 0,
                  "filter": [
                    "all",
                    [
                      "==",
                      "$type",
                      "Polygon"
                    ]
                  ],
                  "layout": {
                    "visibility": "visible"
                  },
                  "paint": {
                    "fill-color": "transparent",
                    "fill-antialias": true,
                    "fill-translate-anchor": "map",
                    "fill-opacity": 1,
                    "fill-translate": {
                      "stops": [
                        [
                          0,
                          [
                            0,
                            2
                          ]
                        ],
                        [
                          6,
                          [
                            0,
                            1
                          ]
                        ],
                        [
                          14,
                          [
                            0,
                            1
                          ]
                        ],
                        [
                          17,
                          [
                            0,
                            2
                          ]
                        ]
                      ]
                    }
                  }
                },
                  {
                      'id': '2001',
                      'type': 'raster',
                      'source': '2001',
                      'minzoom': 4,
                      'maxzoom': 12
                  }
              ]
          },
    interactive: false,
    center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
    zoom: INITIAL_VIEW_STATE.zoom,
    bearing: INITIAL_VIEW_STATE.bearing,
    pitch: INITIAL_VIEW_STATE.pitch
  });

   const deck = new Deck({
    canvas: 'deck-canvas',
    width: '1000px',
    height: '800px',
    initialViewState: INITIAL_VIEW_STATE,
    controller: true,
    onViewStateChange: ({viewState}) => {
      map.jumpTo({
        center: [viewState.longitude, viewState.latitude],
        zoom: viewState.zoom,
        bearing: viewState.bearing,
        pitch: viewState.pitch
      });
    },
    layers: [
      new GeoJsonLayer({
        id: 'airports',
        data: AIR_PORTS,
        // Styles
        filled: true,
        pointRadiusMinPixels: 2,
        pointRadiusScale: 2000,
        getPointRadius: f => 11 - f.properties.scalerank,
        getFillColor: [200, 0, 80, 180],
        // Interactive props
        pickable: true,
        autoHighlight: true,
        onClick: info =>
          // eslint-disable-next-line
          info.object && alert(`${info.object.properties.name} (${info.object.properties.abbrev})`)
      }),
      new ArcLayer({
        id: 'arcs',
        data: AIR_PORTS,
        dataTransform: d => d.features.filter(f => f.properties.scalerank < 4),
        // Styles
        getSourcePosition: f => [-78, 1],
        getTargetPosition: f => f.geometry.coordinates,
        getSourceColor: [0, 128, 200],
        getTargetColor: [200, 0, 80],
        getWidth: 1
      })
    ]
  });
  let last_year = 2001;
  document.getElementById('year').addEventListener('change', (event) => {
      const new_year = event.target.value;
      document.getElementById('current_year').textContent = event.target.value;

      // const current_layer = map.getLayer(String(last_year));
      map.setLayoutProperty(String(last_year), 'visibility', 'none');

      const layer = map.getLayer(String(new_year));
      if (layer === undefined) {
          map.addLayer({
              'id': String(new_year),
              'type': 'raster',
              'source': String(new_year),
              'minzoom': 4,
              'maxzoom': 12
          });
      } else {
          map.setLayoutProperty(String(new_year), 'visibility', 'visible')
      }

      last_year = new_year;
  });
});