import axios from 'axios';

const searchApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        limit: 5,
        language: 'es',
        access_token:
            'pk.eyJ1Ijoia2luZ2Zpb3JlIiwiYSI6ImNsMWw1dHFyNzAxMGUzbHRjajV3ajRtanMifQ.XQFoPFz49yO0Ie4jn4q2Aw',
    },
});

export default searchApi;
