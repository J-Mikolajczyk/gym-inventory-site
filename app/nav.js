import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMap } from './context/MapContext';
import dynamic from 'next/dynamic';

const AddressAutofill = dynamic(
  () => import('@mapbox/search-js-react').then(mod => mod.AddressAutofill),
  { ssr: false }
);

export default function Nav() {
    const [value, setValue] = useState('');
    const map = useMap();

    const handleChange = (e) => {
        setValue(e.target.value);
    };

    const handleRetrieve = async (res) => {
        const feature = res.features?.[0];
        if (feature && feature.geometry?.coordinates) {
            const [lng, lat] = feature.geometry.coordinates;
            console.log('Coordinates:', { lat, lng });
            map.setLocation({ latitude: lat, longitude: lng });
            map.setZoom(17);
        } else {
            console.warn('No coordinates found, fallback to geocoding...');
            const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=YOUR_ACCESS_TOKEN` );
            const data = await response.json();
            const coords = data?.features?.[0]?.center;
            if (coords) {
                console.log('Fallback coordinates:', { lat: coords[1], lng: coords[0] });
            }
        }
    }

    const router = useRouter();

    return (
        <nav className="flex flex-row items-center justify-between w-full p-4 bg-gray-100 h-14">
            <button 
                onClick={() => router.push('/')}
                className="font-inter font-extrabold text-blue-600 cursor-pointer"
            >THAT ONE GYM</button>
            <form className="w-1/2">
                <AddressAutofill 
                    accessToken='pk.eyJ1IjoianBtaWtvbGEiLCJhIjoiY21iYjZzc2d3MWJrNzJtcHR4bm5jdXJsaSJ9.EzaOhKFpK6xpRD24SxmE4Q'
                    onRetrieve={handleRetrieve}>
                    <input
                        autoComplete="shipping address-line1"
                        value={value}
                        onChange={handleChange}
                        placeholder="Enter an address"
                        className="border border-gray-400 p-2 rounded w-full"
                    />
                </AddressAutofill>
            </form>
            <button 
                className="font-inter text-black text-left cursor-pointer"
                onClick ={() => router.push('/dashboard')}
            >Owner Login</button>
        </nav>
    );
}