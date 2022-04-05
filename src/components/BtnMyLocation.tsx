import { useContext } from 'react';
import { MapContext } from '../context/maps/MapContext';
import { PlacesContext } from '../context/places/PlacesContext';

export const BtnMyLocation = () => {
    const { map, isMapReady } = useContext(MapContext);
    const { userLocation } = useContext(PlacesContext);

    const onClick = () => {
        if (map) {
            map.flyTo({
                center: userLocation,
                zoom: 15,
                speed: 0.8,
                curve: 1,
            });
        }
    };

    return (
        <button
            className="btn btn-primary"
            onClick={onClick}
            style={{
                position: 'fixed',
                top: '20px',
                right: '20px',
                zIndex: 999,
            }}
        >
            My location
        </button>
    );
};
