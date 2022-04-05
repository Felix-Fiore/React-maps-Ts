import { MapView } from '../components/MapView';
import { BtnMyLocation } from '../components/BtnMyLocation';
import { SearchBar } from '../components/SearchBar';

export const HomeScreen = () => {
    return (
        <div>
            <MapView />
            <BtnMyLocation />
            <SearchBar />
        </div>
    );
};
