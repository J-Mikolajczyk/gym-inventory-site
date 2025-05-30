import React, { useEffect, useState, useRef, use } from "react";
import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
const foursquareApiKey = process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY;

export default function Map() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [gyms, setGyms] = useState([]);
    const[location, setLocation] = useState({ latitude: 38, longitude: -95 });
    const [zoom, setZoom] = useState(2.8);

    const fetchGyms = async () => {
        try {
            const response = await fetch(`https://api.foursquare.com/v3/places/search?ll=${location.latitude},${location.longitude}&radius=1000&query=gym`, {
                headers: {
                    'Accept': 'application/json',
                    'Authorization': foursquareApiKey,
                },
            });
            const data = await response.json();
            setGyms(data.results);
        } catch (error) {
            console.error("Error fetching gyms:", error);
        }
    };

    useEffect(() => {
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [location.longitude, location.latitude],
            zoom: zoom,
        });

        fetchGyms();

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        }
        
    }, [location, zoom]);

    useEffect(() => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                setLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                ;
            });
        }
        setZoom(12)
    }, []);

    return (
        <div ref={mapContainerRef} className="h-full w-full active:cursor-move"/>
    )
};


