"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import AuthForm from './auth/AuthForm';
import { useRouter } from 'next/navigation';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const router = useRouter();
  console.log("Loading ==>", process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, user not logged in.');
      setUser(null); // Ensure user is set to null if no token is found
    } else {
      const fetchUserData = async () => {
        try {
          const config = {
            headers: { Authorization: `Bearer ${token}` }
          };
          const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/users/getLoggedUser`, config);
          setUser(response.data);
        } catch (err) {
          console.error('Failed to fetch user data', err);
          setError('Failed to fetch user data');
          setUser(null);
        }
      };

      fetchUserData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setError('');
    console.log('User logged out.');
  };

  if (!user) {
    return (
      <>
        <Head>
          <title>Welcome to NouméaBnB</title>
          <meta name="description" content="Log in or register to discover amazing places in Nouméa." />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-600 to-purple-800">
          <AuthForm />
        </div>
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
            <button onClick={handleLogout} className="text-red-600 hover:text-red-800 px-3 py-2 rounded">Logout</button>
          </div>
        </nav>
        <div className="relative h-[500px] overflow-hidden">
          <Image src="https://picsum.photos/350/250" alt="Hero Background" width={1920} height={1080} layout="responsive" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-white">
            <h1 className="text-5xl font-bold mb-3">Explore Nouméa</h1>
            <p className="mb-5">Unforgettable trips start with NouméaBnB</p>
            <Link href="/browse-rooms" legacyBehavior>
              <a className="bg-white text-blue-600 px-6 py-3 rounded text-lg font-semibold hover:bg-gray-100">Start your search</a>
            </Link>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold mb-6">Discover Experiences</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-1">
              <Image src="https://picsum.photos/350/250" alt="Explore" width={350} height={250} className="rounded-lg" />
              <h3 className="mt-2 font-semibold">Adventures</h3>
              <p>Unique activities with local experts—in person or online.</p>
            </div>
            <div className="col-span-1">
              <Image src="https://picsum.photos/360/250" alt="Explore" width={350} height={250} className="rounded-lg" />
              <h3 className="mt-2 font-semibold">Stays</h3>
              <p>Homes, boutique hotels, and more for the perfect retreat.</p>
            </div>
            <div className="col-span-1">
              <Image src="https://picsum.photos/340/250" alt="Explore" width={350} height={250} className="rounded-lg" />
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
