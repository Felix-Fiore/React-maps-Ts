import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducers } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
};

interface props {
    children: JSX.Element | JSX.Element[];
}

export const PlacesProviders = ({ children }: props) => {
    const [state, dispatch] = useReducer(placesReducers, INITIAL_STATE);

    useEffect(() => {
        getUserLocation().then((lngLat) =>
            dispatch({ type: 'setUserLocation', payload: lngLat })
        );
    }, []);

    return (
        <PlacesContext.Provider
            value={{
                ...state,
                //dispatch,
            }}
        >
            {children}
        </PlacesContext.Provider>
    );
};
