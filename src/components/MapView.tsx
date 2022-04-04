import { useContext, useLayoutEffect, useRef } from 'react';
import { Map } from 'mapbox-gl';
import { PlacesContext } from '../context/places/PlacesContext';
import { Loading } from './Loading';

export const MapView = () => {
    const { isLoading, userLocation } = useContext(PlacesContext);

    const mapDiv = useRef(null);

    useLayoutEffect(() => {
        if (!isLoading) {
            const map = new Map({
                container: mapDiv.current!, // container ID
                style: 'mapbox://styles/mapbox/streets-v11', // style URL
                center: userLocation, // starting position [lng, lat]
                zoom: 14, // starting zoom
            });
        }
    }, [isLoading]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <div
            ref={mapDiv}
            style={{
                backgroundColor: 'red',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
            }}
        >
            {userLocation?.join(',')}
        </div>
    );
};
