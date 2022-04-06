import { useContext } from 'react';
import { MapContext } from '../context/maps/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';
import { Feature } from '../interfaces/places';
import { LoadingPlaces } from './LoadingPlaces';

export const SearchResults = () => {
    const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);

    const { map, getRoutBetweenTwoPoints } = useContext(MapContext);

    const onPlaceClicked = (place: Feature) => {
        const [lat, lng] = place.center;

        map?.flyTo({
            zoom: 15,
            center: [lat, lng],
        });
    };

    const getRout = (place: Feature) => {
        if (!userLocation) {
            return;
        }

        const [lat, lng] = place.center;

        getRoutBetweenTwoPoints(userLocation!, [lat, lng]);
    };

    if (isLoadingPlaces) {
        return <LoadingPlaces />;
    }

    if (places.length === 0) {
        return <></>;
    }

    return (
        <ul className="list-group mt-3">
            {places.map((place) => (
                <li
                    key={place.id}
                    className="list-group-item list-group-item-action pointer hover"
                    onClick={() => onPlaceClicked(place)}
                >
                    <h6>{place.text_es}</h6>
                    <p className="text-muted" style={{ fontSize: '12px' }}>
                        {place.place_name}
                    </p>
                    <button
                        className="btn btn-outline-primary btn-sm"
                        onClick={() => getRout(place)}
                    >
                        Directions
                    </button>
                </li>
            ))}
        </ul>
    );
};
