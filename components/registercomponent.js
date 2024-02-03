// Register.js
'use client';
import React, { useState } from 'react';
import Link from 'next/link'; // Import Link from 'next/link'
import { useRouter } from 'next/navigation';
const RegisterPagee = () => {
  
  const router = useRouter();
  const[name , setName] = useState('');
  const[email , setEmail] = useState('');
  const[password , setPassword] = useState('');
  const[error , setError] = useState();



  const handleSubmit = async (e) => {
      e.preventDefault();

      if(!name || !password || !email)
      {
        return;
      }

      try
      {
        const result = await fetch("api/userExists",{
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({email})
        })

        const {user} = await result.json();
        if(user)
        {
          console.log("Error User Already exists");
          return;
        }

        const res = await fetch("api/register", {
          method: "POST",
          headers: {
           "Content-type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          })
        })

        if(res.ok)
        {
          console.log("Successfully registered the account");
          router.push("/");
        }
        else
        {
          
          console.log("User registration failed");
        }
      }
      catch(error)
      {
        console.log(error);
          console.log("Error registering the user");
      }
      
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Name</label>
            <input
              onChange={e => setName(e.target.value)}
              type="text"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Email</label>
            <input
              onChange={e => setEmail(e.target.value)}
              type="email"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">Password</label>
            <input
              onChange={ (e) => setPassword(e.target.value)}
              type="password"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your password"
            />
          </div>
          <button
            onClick={e => handleSubmit(e)}
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="mt-4">
          <p className="text-gray-600">
            Already have an account?
            <Link href="/">
              Login
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPagee;
