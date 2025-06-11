'use client';

import { React, useState, useEffect, use } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Nav from './nav';
import Map from './map';
import GymFilterMenu from './gymfiltermenu';
import dynamic from 'next/dynamic';
import { useMap } from './context/MapContext';

const ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_GEOCODING_API_KEY;

const AddressAutofill = dynamic(
  () => import('@mapbox/search-js-react').then(mod => mod.AddressAutofill),
  { ssr: false }
);

export default function Home() {

  const [value, setValue] = useState('');
  const map = useMap();

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const onFilterChange = async (filter) => {
    const zipcode = filter?.zipCode;
    try {
      const response = await fetch(
        `https://api.mapbox.com/search/geocode/v6/forward?postcode={${zipcode}}&access_token=${ACCESS_TOKEN}`
      );

      if (response.ok) {
        const data = await response.json();
        
        if (!data.features || data.features.length === 0) {
          console.error('No features found in the response.');
        } else {
          handleRetrieve(data);
          map.setZoom(12);
        }
        
      } else {
        console.error('Error fetching data:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
      const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(value)}.json?access_token=${ACCESS_TOKEN}` );
      const data = await response.json();
      const coords = data?.features?.[0]?.center;
      if (coords) {
        console.log('Fallback coordinates:', { lat: coords[1], lng: coords[0] });
      }
    }
  }

  const addGym = async (gymData) => {
    try {
      const response = await fetch('/api/add-gym', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gymData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Gym added successfully:', data);
    } catch (error) {
      console.error('Error adding gym:', error);
    }
  }

  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <Nav/>
      <div className="flex flex-col h-full gap-2 w-7/8 mt-2">
        <div className='font-inter flex flex-row w-full justify-between items-center gap-2'>
          <p className='text-base'>Search for a Gym:</p>
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
          <GymFilterMenu onFilterChange={onFilterChange}/>
        </div>
        <div className='w-full h-1/2 mb-15 font-inter'>
          <Map/>
        </div>
        <button onClick={() => addGym({
          name: 'New Gym',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          phone: '555-555-5555'
        })} className="w-1/4 mr-auto font-inter cursor-pointer bg-gray-200 border-1 rounded p-1 max-w-44 min-w-36">Can&apos;t find a gym? Add it here.</button>
      </div>
    </div>
  );
}
