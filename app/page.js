'use client';

import { React, useState, useEffect, use } from 'react';
import Nav from './nav';
import Map from './map';

export default function Home() {

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Nav/>
      <main className="flex flex-row justify-center w-full h-full p-4 bg-white">
        <div className="w-7/8 h-1/2">
          <Map/>
        </div>
      </main> 
    </div>
  );
}
