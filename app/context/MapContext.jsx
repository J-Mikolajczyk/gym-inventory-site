import { createContext, useContext, useState, useEffect } from "react";

const MapContext = createContext();

export function MapProvider({ children }) {
    const [location, setLocation] = useState({ latitude: 38, longitude: -95 });
    const [zoom, setZoom] = useState(2.8);

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setZoom(12)
            });
        }

    }, []);

    return (
        <MapContext.Provider value={{ location, setLocation, zoom, setZoom }}>
            {children}
        </MapContext.Provider>
    );
}

export function useMap() {
    return useContext(MapContext);
}