"use client"; 

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // For navigation

const NewBlogForm = () => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [like, setLike] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  // Check for auth token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      // If no token, redirect to the login page
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!title || !date || !image || !description) {
      setErrorMessage('Please fill in all the fields.');
      return;
    }

    const newBlogData = {
      title,
      date,
      image,
      description,
      like
    };

    try {
      // Replace the API endpoint with your backend
      const response = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBlogData),
      });

      if (response.ok) {
        // Clear form and redirect to home page or blog list page
        setTitle('');
        setDate('');
        setImage('');
        setDescription('');
        setLike(0);
        
      } else {
        setErrorMessage('Failed to submit the blog.');
      }
    } catch (error) {
      console.error('Failed to submit blog:', error);
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="mx-auto p-6 bg-white dark:bg-gray-800 rounded-md border-2 lg:w-[400px] max-w-96 mb-5">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Create a New Blog</h1>

      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="relative mb-4 mt-8">
          <input
            id="title"
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder=" "
            required
          />
          <label
            htmlFor="title"
            className="absolute text-sm left-3 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-transparent peer-focus:bg-white dark:peer-focus:bg-gray-800 px-0 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Blog Title
          </label>
        </div>

        {/* Image URL Input */}
        <div className="relative mb-4 mt-6">
          <input
            id="image"
            type="text"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder=" "
            required
          />
          <label
            htmlFor="image"
            className="absolute text-sm left-3 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-transparent peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Image URL
          </label>
        </div>

        {/* Description Textarea */}
        <div className="relative mb-4 mt-6">
          <textarea
            id="description"
            className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border border-gray-300 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder=" "
            required
          />
          <label
            htmlFor="description"
            className="absolute text-sm left-3 text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-transparent peer-focus:bg-white dark:peer-focus:bg-gray-800 px-0 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 
            peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:top-4 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4"
          >
            Blog Description
          </label>
        </div>

        {/* Error Message */}
        {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full text-blue-500 hover:text-blue-600 text-sm py-2 px-4 rounded-lg transition-colors font-bold"
        >
          Create Blog
        </button>
      </form>
    </div>
  );
};

export default NewBlogForm;
