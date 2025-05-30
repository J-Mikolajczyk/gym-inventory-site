'use client';

import { useRouter } from 'next/navigation';
import Nav from './nav';

export default function Home() {
  const router = useRouter()

  const handleClick = (link) => {
    router.push(link);
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <Nav/>
      <main className="flex flex-row items-center justify-center w-full h-full p-4 bg-white">
        <button 
            className="font-inter text-black text-left cursor-pointer"
            onClick ={() => handleClick('/dashboard')}
          >Admin Dashboard</button>
      </main> 
    </div>
  );
}
