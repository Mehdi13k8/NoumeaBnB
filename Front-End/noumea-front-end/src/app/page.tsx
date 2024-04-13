// src/app/page.tsx

"use client"; // This is a client component

import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from './contexts/AuthContext';
import AuthForm from './auth/AuthForm';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import './globals.css';

const HomePage = () => {
  const { user } = useAuth();
  const router = useRouter();


  useEffect(() => {
    console.log('User:', user);
  }, [user]);
  useEffect(() => {
    // Logic that depends on `router` should go here to ensure it only runs client-side
    console.log(router.query);
  }, [router]);


  if (!user) {
    return (
      <>
        <Head>
          <title>Welcome to NouméaBnB</title>
          <meta name="description" content="Log in or register to discover amazing places in Nouméa." />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-purple-800">
          <div className="bg-gray-50">
            <AuthForm />
          </div>
        </div >
      </>
    );
  }

  return (
    <>
      <Head>
        <title>NouméaBnB Home</title>
        <meta name="description" content="Welcome to NouméaBnB, discover amazing places." />
      </Head>
      <div className="bg-gray-50">
        <nav className="bg-white shadow py-4">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
            <div className="text-2xl text-blue-600 font-bold">NouméaBnB</div>
            <div>
              <Link href="/about" legacyBehavior>
                <a className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded">About</a>
              </Link>
              <Link href="/contact" legacyBehavior>
                <a className="text-gray-600 hover:text-gray-800 px-3 py-2 rounded">Contact</a>
              </Link>
            </div>
          </div>
        </nav>
        <div className="relative h-[500px] overflow-hidden">
          <img src="https://picsum.photos/350/250" alt="Hero Background" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1 className="text-5xl font-bold mb-3">Explore Nouméa</h1>
            <p className="mb-5">Unforgettable trips start with NouméaBnB</p>
            <Link href="/search" legacyBehavior>
              <a className="bg-white text-blue-600 px-6 py-3 rounded text-lg font-semibold hover:bg-gray-100">Start your search</a>
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Discover Experiences</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <img src="https://picsum.photos/350/250" alt="Explore" width={350} height={250} className="rounded-lg" />
              <h3 className="mt-2 font-semibold">Adventures</h3>
              <p>Unique activities with local experts—in person or online.</p>
            </div>
            <div className="col-span-1">
              <img src="https://picsum.photos/350/250" alt="Explore" width={350} height={250} className="rounded-lg" />
              <h3 className="mt-2 font-semibold">Stays</h3>
              <p>Homes, boutique hotels, and more for the perfect retreat.</p>
            </div>
            <div className="col-span-1">
              <img src="https://picsum.photos/350/250" alt="Explore" width={350} height={250} className="rounded-lg" />
              <h3 className="mt-2 font-semibold">Restaurants</h3>
              <p>Delicious eats to complement your stay.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
