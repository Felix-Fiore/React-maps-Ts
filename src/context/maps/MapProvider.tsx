import { Map, Marker, Popup } from 'mapbox-gl';
import { MapContext } from './MapContext';
import { useReducer } from 'react';
import { mapReducer } from './mapReducer';

export interface MapState {
    isMapReady: boolean;
    map?: Map;
}

const INITIAL_STATE: MapState = {
    isMapReady: false,
    map: undefined,
};

interface Props {
    children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({ children }: Props) => {
    const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

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
