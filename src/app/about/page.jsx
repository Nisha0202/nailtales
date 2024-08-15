"use client";

import React, { useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'; // Import icons or any other icons you prefer
import Link from 'next/link'

const AboutSection = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className=" px-4 mx-auto max-w-screen-xl lg:pt-20 lg:pb-12 py-10 flex flex-col items-center justify-center">
        <div>
          <h1 className='text-4xl font-extrabold text-gray-900 dark:text-white my-2 text-center'>
            About Everyday Echoes
          </h1>
          <p className='py-4 text-center font-light- max-w-xl text-gray-500 dark:text-gray-400'>
            Welcome to Everyday Echoes: Link glimpse into the daily life of Link female student.
          </p>
          <p className='max-w-xl text-sm/relaxed text-center text-gray-500 dark:text-gray-400'>
            At Everyday Echoes, I share the highs, lows, and everything in between of my everyday experiences. From my journey as Link computer science student to the simple joys of life in Dhaka, my blog is Link space to reflect and connect over the ordinary moments that make life extraordinary.
          </p>
        </div>

        <div className={`mt-8 ${isExpanded ? 'block' : 'hidden'}`}>
          <h1 className='text-gray-900 dark:text-white text-xl font-extrabold mb-2 text-center'>
            My Journey
          </h1>
          <p className='max-w-xl text-sm/relaxed  text-center text-gray-500 dark:text-gray-400'>
            My story began as Link student diving into the complexities of computer science while balancing life in Dhaka. From late-night study sessions to exploring the vibrant culture of the city, Everyday Echoes chronicles my path through education, personal growth, and everyday adventures.
          </p>
        </div>

        <button
          onClick={toggleExpand}
          className="mt-6 px-4 py-2 text-sm font-medium text-white   
          rounded-md bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 hover:dark:bg-blue-600 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900">
        
          {isExpanded ? 'See Less' : 'See More'}
        </button>
      </div>
      <div className="flex flex-col font-light items-center bg-white dark:bg-gray-900 p-6">
      {/* Social Media Links */}
      <div className="flex space-x-4 text-sm">
        <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
          <FaFacebookF className="mr-2 text-base" />
          Facebook
        </Link>
        <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-800 dark:text-white hover:text-blue-400 dark:hover:text-blue-300">
          <FaTwitter className="mr-2 text-base" />
          Twitter
        </Link>
        <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex items-center text-gray-800 dark:text-white hover:text-pink-600 dark:hover:text-pink-400">
          <FaInstagram className="mr-2 text-base" />
          Instagram
        </Link>
      </div>
    </div>
    </section>
  );
};

export default AboutSection;


