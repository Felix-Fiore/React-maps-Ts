import { useEffect, useReducer } from 'react';
import { PlacesContext } from './PlacesContext';
import { placesReducers } from './placesReducer';
import { getUserLocation } from '../../helpers/getUserLocation';
import searchApi from '../../apis/searchApi';
import { Feature, PlacesResponce } from '../../interfaces/places';

export interface PlacesState {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
}

const INITIAL_STATE: PlacesState = {
    isLoading: true,
    userLocation: undefined,
    isLoadingPlaces: false,
    places: [],
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

    const searchPlacesByQuery = async (query: string): Promise<Feature[]> => {
        if (query.length === 0) return [];
        if (!state.userLocation)
            throw new Error('User location is not defined');

        dispatch({ type: 'setLoadingPlaces' });

        const resp = await searchApi.get<PlacesResponce>(`/${query}.json`, {
            params: {
                proximity: state.userLocation.join(','),
            },
        });

        dispatch({ type: 'setPlaces', payload: resp.data.features });

        return resp.data.features;
    };

    return (
        <PlacesContext.Provider
            value={{
                ...state,
                //dispatch,
                searchPlacesByQuery,
            }}
        >
            {children}
        </PlacesContext.Provider>
    );
};
