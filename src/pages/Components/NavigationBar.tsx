import React from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();

  return (
    <>
      <div className="font-burh text-2xl mt-16 flex justify-between">
        <h1 className="text-4xl ms-64 font-semibold">
          <div className="backdrop-blur-md bg-white px-2 bg-opacity-30 rounded-full">
            <Link href="/">
              GreenBot.
            </Link>
          </div>
        </h1>
        <ul>
          <div className="flex px-4 font-medium me-64 space-x-10 backdrop-blur-md rounded-full bg-white bg-opacity-30">
            <li className={router.pathname === '/' ? 'font-bold text-green-600' : ''}>
              <Link href="/">
                Home
              </Link>
            </li>
            <li className={router.pathname === '/Components/IOT' ? 'font-bold text-green-600' : ''}>
              <Link href="/Components/IOT">
                Sensor Feed
              </Link>
            </li>
            <li className={router.pathname === '/Components/About' ? 'font-bold text-green-600' : ''}>
              <Link href="/Components/About">
                About
              </Link>
            </li>
          </div>
        </ul>
      </div>
    </>
  );
}
