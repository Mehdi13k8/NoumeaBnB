// src/app/page.tsx
import Head from 'next/head';
import Link from 'next/link';
import '../../public/styles/global.css';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>NouméaBnB Home</title>
        <meta name="description" content="Welcome to NouméaBnB" />
      </Head>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-4xl font-bold">
          Welcome to <span className="text-blue-600">NouméaBnB</span>
        </h1>
        <p className="mt-3 text-2xl">
          Discover and book amazing rooms in Nouméa.
        </p>
        <div className="mt-6">
          {/* <Link href="/browse-rooms">
            <a className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out">
              Browse Rooms
            </a>
          </Link> */}
          <Link href="/browse-rooms" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300 ease-in-out">
            Browse Rooms
          </Link>
        </div>
      </div>
    </>
  );
};

export default HomePage;
