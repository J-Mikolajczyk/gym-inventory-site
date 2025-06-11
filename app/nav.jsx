import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Nav() {

    const router = useRouter();

    return (
        <nav className="flex flex-row items-center justify-between w-full p-4 bg-gray-100 h-14">
            <button 
                onClick={() => router.push('/')}
                className="font-inter font-extrabold text-blue-600 cursor-pointer"
            >THAT ONE GYM</button>
            <button 
                className="font-inter text-black text-left cursor-pointer"
                onClick ={() => router.push('/dashboard')}
            >Owner Login</button>
        </nav>
    );
}