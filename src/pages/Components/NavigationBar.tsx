import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from 'next/router';

export default function NavBar() {
  const router = useRouter();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prevState => !prevState); // Toggle the mobile menu
  };

  return (
    <div className="font-burh mx-4 md:mx-16 text-2xl py-12 px-4 md:px-16 lg:px-32 flex justify-between items-center relative">
      {/* Brand / Logo */}
      <h1 className="text-3xl md:text-4xl font-semibold">
        <div className="text-green-600 px-3 py-1">
          <Link href="/">GreenBot.</Link>
        </div>
      </h1>

      {/* Navigation Links for Desktop */}
      <ul className="hidden md:flex px-4 font-medium space-x-8 lg:space-x-12 py-2">
        {['/', '/Components/IOT', '/Components/About'].map((path) => (
          <li key={path} className="relative group">
            <Link href={path} className={`transition-colors duration-300 
              ${router.pathname === path ? 'font-bold text-green-600' : 'text-gray-700'} 
              after:content-[''] after:block after:w-0 after:h-[2px] after:bg-green-600 after:transition-all after:duration-300 
              after:ease-in-out group-hover:after:w-full`}>
              {path === '/' ? 'Home' : path === '/Components/IOT' ? 'Sensor Feed' : 'About'}
            </Link>
          </li>
        ))}
      </ul>

      {/* Responsive Menu for Mobile */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="text-3xl focus:outline-none">
          &#9776; {/* Hamburger icon */}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <ul className="absolute top-full left-0 w-full bg-white shadow-md mt-2 md:hidden flex flex-col items-center py-4">
          {['/', '/Components/IOT', '/Components/About'].map((path) => (
            <li key={path} className="py-2">
              <Link href={path} className={`block transition-colors duration-300 
                ${router.pathname === path ? 'font-bold text-green-600' : 'text-gray-700'} 
                `}>
                {path === '/' ? 'Home' : path === '/Components/IOT' ? 'Sensor Feed' : 'About'}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
