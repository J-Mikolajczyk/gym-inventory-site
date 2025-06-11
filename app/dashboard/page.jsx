'use client';

import { useState } from 'react';
import Nav from '../nav';

export default function Home() {

  const [section, setSection] = useState('dashboard');

  const handleSectionChange = (newSection) => {
    setSection(newSection);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Nav/>
      <main className="flex flex-row items-center justify-center w-full h-full p-4 bg-white">
        <div className="flex flex-col w-1/8 min-w-30 h-full">
          <button className={`border-r-1 font-inter text-black text-left cursor-pointer h-12 + ${section === 'dashboard' ? 'border-r-8 border-r-blue-600'  : 'border-r-0'}`} onClick={() => handleSectionChange('dashboard')}>Dashboard</button>
          <button className={`border-r-1 font-inter text-black text-left cursor-pointer h-12 + ${section === 'gyms' ? 'border-r-8 border-r-blue-600'  : 'border-r-0'}`} onClick={() => handleSectionChange('gyms')}>Gyms</button>
          <button className={`border-r-1 font-inter text-black text-left cursor-pointer h-12 + ${section === 'equipment' ? 'border-r-8 border-r-blue-600'  : 'border-r-0'}`} onClick={() => handleSectionChange('equipment')}>Equipment</button>        
        </div>
        <div className="flex flex-col items-center justify-center w-7/8 h-full border-black">
          {section === 'dashboard' && (
            <div className="w-full h-full flex justify-center">
              <h1 className="text-2xl font-bold text-black">Dashboard Section</h1>
            </div>
          )}
          {section === 'gyms' && (
            <div className="w-full h-full flex justify-center">
              <h1 className="text-2xl font-bold text-black">Gyms Section</h1>
            </div>
          )}
          {section === 'equipment' && (
            <div className="w-full h-full flex justify-center">
              <h1 className="text-2xl font-bold text-black">Equipment Section</h1>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
