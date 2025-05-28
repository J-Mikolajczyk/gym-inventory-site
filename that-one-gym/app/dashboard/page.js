'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()

  const handleClick = (link) => {
    router.push(link);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <nav className="flex flex-row justify-between w-full p-4 bg-gray-100">
        <button 
            onClick={() => handleClick('/')}
            className="font-inter font-extrabold text-blue-600 cursor-pointer"
        >THAT ONE GYM</button>
        <h1 className="font-inter font-extrabold text-blue-600">Admin</h1>
      </nav>
      <main className="flex flex-row items-center justify-center w-full h-full p-4 bg-white">
        <div className="flex flex-col w-1/4 h-full">
          <button className="font-inter text-left cursor-pointer h-12" >Dashboard</button>
          <button className="font-inter text-left cursor-pointer h-12">Gyms</button>
          <button className="font-inter text-left cursor-pointer h-12">Equipment</button>        
        </div>
        <div className="flex flex-col items-center justify-center w-3/4 h-full">
        
        </div>
      </main>
    </div>
  );
}
