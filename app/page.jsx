'use client';

import { React, useState, useEffect, use } from 'react';
import Home from './home';
import { MapProvider } from './context/MapContext';

export default function Page() {

  return (
    <MapProvider>
        <Home/>
    </MapProvider>
  );
}
