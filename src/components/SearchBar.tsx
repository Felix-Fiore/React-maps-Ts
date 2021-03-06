import { ChangeEvent, useRef, useContext } from 'react';
import { PlacesContext } from '../context/places/PlacesContext';
import { SearchResults } from './SearchResults';

export const SearchBar = () => {
    const { searchPlacesByQuery } = useContext(PlacesContext);

    const debounceRef = useRef<NodeJS.Timeout>();

    const onQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            searchPlacesByQuery(query);
        }, 350);
    };

    return (
        <div className="search-container">
            <input
                type="text"
                className="form-control"
                placeholder="Search for a place"
                onChange={onQueryChange}
            />
            <SearchResults />
        </div>
    );
};
