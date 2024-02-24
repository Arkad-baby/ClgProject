"use client"
import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import { useUser } from "@clerk/nextjs";

const Page = () => {
  const [formData, setFormData] = useState({
    username: '',
    Email: '',
    uuid: ''
  });

  const { isLoaded, isSignedIn, user } = useUser();

  return (
    <div className="h-[200vh] w-full dark:bg-black text-white bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] ">
      <Navbar />
      <h1 className='text-center text-white text-3xl md:text-3xl mt-[20px]'>I am<br /><span className='text-transparent font-bold bg-clip-text bg-gradient-to-r from-purple-500 via-pink-400 to-purple-500'>Hungry</span></h1>
    </div>
  );
};

export default Page;
