'use client';

import { React, useState, useEffect, use } from 'react';
import Nav from './nav';
import Map from './map';

export default function Home() {

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
    <div className="flex flex-col items-center h-screen bg-white gap-2">
      <Nav/>
      <div className="flex justify-center w-full h-1/2">
        <div className="w-7/8 h-full">
          <Map/>
        </div>
      </div>
      <br></br>
      <br></br>
      <div className="flex flex-col w-7/8 gap-2">
        <button onClick={() => addGym({
          name: 'New Gym',
          address: '123 Main St',
          city: 'Anytown',
          state: 'CA',
          zip: '12345',
          phone: '555-555-5555'
        })} className="w-1/4 font-inter cursor-pointer bg-gray-200 border-1 rounded p-1">Can&apos;t find gym? Add it here.</button>
      </div>
    </div>
  );
}
