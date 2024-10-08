"use client"
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { FaArrowRightLong } from "react-icons/fa6";
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
export default function Hero() {
  const {authToken} = useAuth();


  function truncateWords(str, numWords) {
    if (!str) return '';
    const words = str.split(' '); // array of words
    if (words.length <= numWords) return str;
    return words.slice(0, numWords).join(' ') + '...';
  }

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('https://everydayechoes.vercel.app/api/blog?page=${page}&limit=3');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();


        // Set the first 2 blogs for display
        setBlogs(data.blogs.slice(0, 2));

      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);


  if (error) {
    return <div className='w-full flex items-center justify-center text-red-500 h-full'>Error: {error}</div>;
  }

  return (
    <section className="bg-white dark:bg-gray-900">

      <div className="py-4 px-4 mx-auto max-w-screen-xl lg:py-8 mb-8">
        <div className="bg-gray-100 flex flex-col-reverse lg:flex-row lg:gap-12 gap-6 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:px-12 md:py-0 mb-8">
          <div className="my-auto lg:w-1/2">
            <h1 className="text-gray-900 max-w-xl lg:pt-1 pt-0 dark:text-white text-3xl md:text-5xl font-extrabold mb-2">
              Where Ordinary Meets Extraordinary
            </h1>
            <p className="lg:text-base text-sm/relaxed lg:pt-1 pt-0 font-normal max-w-xl text-gray-500 dark:text-gray-400 mb-6">
              From small victories to deep reflections, each post captures a snapshot of my everyday life, offering a window into the joys, challenges, and lessons learned along the way.
            </p>

            <div className='flex items-center gap-4 mb-2 lg:mb-1 text-sm'>

              <Link href={'/blog'} className="inline-flex justify-center items-center py-2 px-4 text-sm font-semibold text-center  rounded-md bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-700 dark:bg-gray-600">
                Read Blogs

              </Link>

              {!authToken && <Link href={'/subscribe'} className="inline-flex justify-center items-center py-2 px-4 text-sm font-medium text-center text-white rounded-md bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 hover:dark:bg-blue-600 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-900">
                Subscribe

              </Link>
              }

            </div>

          </div>

          <div className="lg:w-1/2 w-full rounded flex justify-end">
            <div className="relative group flex">
              <Image
                src="/img/blog.png"
                alt="Picture of a study session"
                width={500}
                height={500}
                sizes="100vw"
                className="lg:py-8 py-3"
                priority
              />
            </div>
          </div>
        </div>

        {/* blogs */}
        {loading &&
    <div className='w-full flex items-center justify-center h-full '>Loading...</div>
        }
        {!loading && 
           <div className="grid md:grid-cols-2 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-gray-100  dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                {blog.date ? format(new Date(blog.date), 'dd MMMM yyyy') : 'Date not available'}
              </p>

              <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">
                {truncateWords(blog.title, 10)}
              </h2>
              <p className="text-sm/relaxed font-normal text-gray-500 dark:text-gray-400 mb-4">
                {truncateWords(blog.description, 20)}
              </p>
              <Link href={`/blog/${blog._id}`} className="mt-auto text-blue-600 dark:text-blue-500 hover:underline font-medium text-sm inline-flex items-center">
                Read more
                <FaArrowRightLong className='ms-1.5' />
              </Link>
            </div>
          ))}
        </div>
        }
     

      </div>

    </section>

  )
}
