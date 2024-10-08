"use client"

import React, { useState } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { RiLoader3Fill } from "react-icons/ri"; // For the loading spinner
import { FaCheck } from "react-icons/fa"; // For the success checkmark
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CommentModal = ({ blogData, closeModal }) => {
  const [comment, setComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // To track loading state
  const [success, setSuccess] = useState(false); // To track success state

  
  const router = useRouter();
  router.asPath = `https://everydayechoes.vercel.app/blog/${blogData._id}`;
  
  const handleCommentChange = (e) => {
    setComment(e.target.value);
    setErrorMessage('');

    // Check for authToken
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      setErrorMessage('Please log in to comment.');

    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Get the username from authToken stored in localStorage
    const authToken = localStorage.getItem('authToken');
    // if (!authToken) {
    //   setLoading(false);
    //   setErrorMessage('Please log in to comment.');

    //   setTimeout(() => {

    //     router.push({
    //       pathname: '/login',
    //       query: { redirect: router.asPath },  // Save the current path before redirecting to login
    //     });

    //   }, 1200);

    //   return;
    // }

    // Decode the JWT
    const decodedToken = jwtDecode(authToken);
    const username = decodedToken.name;

    // Ensure comment is not empty
    if (comment.trim() === '') {
      setErrorMessage('Comment cannot be empty.');
      return;
    }

    // Set loading to true while posting the comment

    try {
      // Send the comment to the server
      const commentData = {
        blogId: blogData._id,
        username: username,
        comment: comment,
      };

      await axios.post('https://everydayechoes.vercel.app/api/comment', commentData); // Adjust the API route to your setup

      // Clear the comment after submission and show success state
      setComment('');
      setSuccess(true); // Show success state

      // Close the modal after 1 second
      setTimeout(() => {
        closeModal();
      }, 1200);
    } catch (error) {
      console.error('Failed to post comment:', error);
      setErrorMessage('Failed to post comment. Please try again.');
    } finally {
      setLoading(false); // Stop the loading spinner
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-400 bg-opacity-30 flex">
      <div className="relative p-8 bg-gray-100 dark:bg-gray-700 w-full max-w-md m-auto flex-col flex rounded-md border-2 border-gray-400">
        <span className="absolute top-0 right-0 p-4">
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <IoCloseCircleOutline className="text-xl" />
          </button>
        </span>
        <h1 className="text-sm font-light mb-4">
          Comment on {blogData.title}
        </h1>
        <textarea
          value={comment}
          onChange={handleCommentChange}
          placeholder="Write your comment here..."
          className="border border-gray-300 p-2 w-full rounded-lg"
          rows="4"
          required
          disabled={loading || success} // Disable input when loading or after success
        />
        {errorMessage && (
        <Link
          href={'/login'} 
          className="text-red-500 text-sm mt-2"
        >
          {errorMessage} 
          <span className="ms-1 font-medium text-blue-600 dark:text-blue-500 hover:underline">
            Log In
          </span>
        </Link>
      )}

        <button
          onClick={handleSubmit}
          className={`flex items-center justify-center bg-blue-600 font-medium text-white mt-4 px-4 py-2 rounded text-sm w-full
            ${loading || success || comment.trim() === '' ? 'bg-blue-400' : ''}`}
          disabled={loading || success || comment.trim() === ''} // Disable button if comment is empty or loading/success
        >
          {loading ? (
            <RiLoader3Fill className="animate-spin text-xl" />
          ) : success ? (
            <span><FaCheck className="mr-2 text-white inline" /> Post</span>
          ) : (
            'Post'
          )}
        </button>
      </div>
    </div>
  );
};

export default CommentModal;
