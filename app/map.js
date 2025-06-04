import React, { useEffect, useState, useRef, use } from "react";
import mapboxgl from "mapbox-gl";
import { useMap } from "./context/MapContext";

mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

export default function Map() {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const {location, zoom} = useMap();

    useEffect(() => {
        if (mapRef.current) return; 
        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [location.longitude, location.latitude],
            zoom: zoom,
        });
    }, [[location.latitude, location.longitude, zoom]]);

    useEffect(() => {
        if (mapRef.current) {
            mapRef.current.setCenter([location.longitude, location.latitude]);
            mapRef.current.setZoom(zoom);
        }
    }, [location, zoom]);

    return (
        <div ref={mapContainerRef} className="h-full w-full active:cursor-move"/>
    )
};


