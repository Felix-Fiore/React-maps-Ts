import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

mapboxgl.accessToken =
    'pk.eyJ1Ijoia2luZ2Zpb3JlIiwiYSI6ImNsMWw1dHFyNzAxMGUzbHRjajV3ajRtanMifQ.XQFoPFz49yO0Ie4jn4q2Aw';

if (!navigator.geolocation) {
    alert('Geolocation is not supported by your browser');
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
    <React.StrictMode>
        <MapsApp />
    </React.StrictMode>
);
