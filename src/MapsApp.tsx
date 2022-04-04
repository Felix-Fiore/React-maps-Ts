import { PlacesProviders } from './context/places/PlacesProviders';
import { HomeScreen } from './screens/HomeScreen';
import './globalStyles.css';
import { MapProvider } from './context/maps/MapProvider';

export const MapsApp = () => {
    return (
        <PlacesProviders>
            <MapProvider>
                <HomeScreen />
            </MapProvider>
        </PlacesProviders>
    );
};
