import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { useReducer, useContext, useEffect } from 'react';
import { mapReducer } from './mapReducer';
import { PlacesContext } from '../places/PlacesContext';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
    markers: Marker[];
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
    markers: [],
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
    const { places } = useContext(PlacesContext);

    useEffect(() => {
        state.markers.forEach((marker) => marker.remove());
        const newMarkers: Marker[] = [];

        for (const place of places) {
            const [lat, lng] = place.center;
            const popup = new Popup().setHTML(`
                <h6>${place.text_es}</h6>
                <p>${place.place_name_es}</p>
            `);

            const newMarker = new Marker()
                .setPopup(popup)
                .setLngLat([lat, lng])
                .addTo(state.map!);

            newMarkers.push(newMarker);
        }

        dispatch({ type: 'setMarkers', payload: newMarkers });
    }, [places]);

    const myLocationPopUp = new Popup({}).setHTML(
        `<h4>This is your location</h4>`
    );

    const setMap = (map: Map) => {
        new Marker({ color: '#61dafb' })
            .setLngLat(map.getCenter())
            .setPopup(myLocationPopUp)
            .addTo(map);

        dispatch({ type: 'setMap', payload: map });
    };
    return (
        <MapContext.Provider
            value={{
                ...state,
                setMap,
            }}
        >
            {children}
        </MapContext.Provider>
    );
};
