
import {Deck} from '@deck.gl/core';
import {GeoJsonLayer, ArcLayer} from '@deck.gl/layers';
import maplibregl from 'maplibre-gl';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
const AIR_PORTS =
'https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_10m_airports.geojson';

const INITIAL_VIEW_STATE = {
	latitude: 8.484,
	longitude: -13.2344,
	zoom: 7,
	bearing: 0,
	pitch: 30
};

const TILE_POSTFIX = '_10N_020W';

let map = undefined;
let last_year = 2010;

function update_year(new_year) {
	document.getElementById('current_year').textContent = new_year;

	const layer = map.getLayer(String(new_year) + TILE_POSTFIX);
	if (layer === undefined) {
		map.addLayer({
			'id': String(new_year) + TILE_POSTFIX,
			'type': 'raster',
			'source': String(new_year) + TILE_POSTFIX,
			'minzoom': 4,
			'maxzoom': 12
		}, 'landcover');
	} else {
		map.setLayoutProperty(String(new_year) + TILE_POSTFIX, 'visibility', 'visible');
	}

	if (last_year != new_year) {
		const old_layer = String(last_year) + TILE_POSTFIX;
		setTimeout(() => {
			map.setLayoutProperty(old_layer, 'visibility', 'none');
		}, 250);
		last_year = new_year;
	}
}

document.addEventListener("DOMContentLoaded", () => {

	const USING_DECK_GL = document.getElementById('deck-canvas') != undefined;
	console.log("Using deck.gl: " + USING_DECK_GL);

	let sources = {
		'carto': {
			'type': 'vector',
			'url': 'https://tiles.basemaps.cartocdn.com/vector/carto.streets/v1/tiles.json'
		},
	};

	for (let i = 2001; i <= 2020; i++ ) {
		sources[String(i) + TILE_POSTFIX] = {
			type: 'raster',
			url: 'http://' + MAPTILE_SERVER_HOST_AND_PORT + '/services/' + i + TILE_POSTFIX + '/',
			tileSize: 256,
			attribution: '4C Kartor Fabrik'
		}
	};

	map = new maplibregl.Map({
		container: 'map',
		style: './style.json',
		interactive: !USING_DECK_GL,
		center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
		zoom: INITIAL_VIEW_STATE.zoom,
		bearing: INITIAL_VIEW_STATE.bearing,
		pitch: INITIAL_VIEW_STATE.pitch
	});

	map.on('load', () => {
		for (let i = 2001; i <= 2020; i++ ) {
			map.addSource(String(i) + TILE_POSTFIX, {
				type: 'raster',
				url: 'http://' + MAPTILE_SERVER_HOST_AND_PORT + '/services/' + i + TILE_POSTFIX + '/',
				tileSize: 256,
				attribution: '4C Kartor Fabrik'
			});
		}
		update_year(2010);
	});

	if (USING_DECK_GL) {
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
	}

	document.getElementById('year').addEventListener('change', (event) => {
		const new_year = event.target.value;
		update_year(new_year);
	});
});