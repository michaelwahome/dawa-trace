"use client"

import { useState } from 'react';
import Link from 'next/link';

const CollapsibleNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-green-800 md:hidden text-white p-4">
      <div className="flex justify-between items-center">
        <div>
          <Link className={"text-white font-bold text-lg"} href="/">
            PharmaTrace
          </Link>
        </div>
        <div className="">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <div className={`fixed top-0 right-0 bg-green-600 h-full w-64 transform ${
        isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 ease-in-out`} >
          <button onClick={toggleMenu} className="block px-4 py-2 hover:text-gray-300 text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
          <Link className="block px-4 py-2 hover:text-gray-300" href="/">
            Home
          </Link>
          <Link className="block px-4 py-2 hover:text-gray-300" href="/about">
            About Us
          </Link>
          <Link className="block px-4 py-2 hover:text-gray-300" href="/contact">
            Contact Us
          </Link>
          <Link className="block px-4 py-2 hover:text-gray-300" href="/signin">
            Sign In
          </Link>
          <Link className="block px-4 py-2 hover:text-gray-300" href="/signup">
            Sign Up
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default CollapsibleNavbar;
