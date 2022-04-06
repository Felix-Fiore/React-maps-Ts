import { createContext } from 'react';
import { Feature } from '../../interfaces/places';

export interface PlacesContextProps {
    isLoading: boolean;
    userLocation?: [number, number];
    isLoadingPlaces: boolean;
    places: Feature[];
    distance: number;
    time: number;

    searchPlacesByQuery: (query: string) => Promise<Feature[]>;
}

export const PlacesContext = createContext<PlacesContextProps>(
    {} as PlacesContextProps
);
