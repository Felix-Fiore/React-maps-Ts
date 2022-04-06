import axios from 'axios';

const directionsApi = axios.create({
    baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
    params: {
        alternatives: true,
        geometries: 'geojson',
        language: 'es',
        overview: 'simplified',
        steps: true,
        access_token:
            'pk.eyJ1Ijoia2luZ2Zpb3JlIiwiYSI6ImNsMWw1dHFyNzAxMGUzbHRjajV3ajRtanMifQ.XQFoPFz49yO0Ie4jn4q2Aw',
    },
});

export default directionsApi;
