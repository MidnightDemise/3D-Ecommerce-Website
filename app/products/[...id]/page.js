
'use client'
import Navbar from '@/components/Navbar';
import NavbarUser from '@/components/NavbarUser';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
const getProduct = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/api/products/${id}`, { cache: 'no-store' });

        
        if (res.ok) {
            console.log("Successfully fetched the specific product");
        }

        return res.json();
    } catch (error) {
        console.log("Error fetching the specific product", error);
    }
}



const handleAddProductToCart = async (email, id, quantity) => {

    console.log(quantity);
    try {
        const productId = Array.isArray(id) ? id[0] : id;
        console.log(productId);
        console.log(email);
      const result = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , id: productId , quantity}),
  
      });
      
  
    } catch (error) {
      console.log(error);
      console.log('Failed to add the product');
    }
  };

const EachProductPage = async ({ params }) => {
  const { id } = params;
  const {data: session} = useSession();
  const res = await getProduct(id);
  const { name , description , price , category , url } = res.product;

  console.log(name , description);
  return (
    <>
    <NavbarUser/>
    <div className="min-w-screen min-h-screen bg-slate-800 flex items-center p-5 lg:p-10 overflow-hidden relative">
        <div className="w-full max-w-6xl rounded bg-white shadow-xl p-10 lg:p-20 mx-auto text-gray-800 relative md:text-left">
            <div className="md:flex items-center -mx-10">
                <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                    <div className="relative">
                        <img src={url} className="w-full relative z-10" alt="" />
                        <div className="border-4 border-slate-800 absolute top-10 bottom-10 left-10 right-10 z-0"></div>
                    </div>
                </div>
                <div className="w-full md:w-1/2 px-10">
                    <div className="mb-10">
                        <h1 className="font-bold uppercase text-2xl mb-5">{name}</h1>
                        <p className="text-sm">{description}<a href="#" className="opacity-50 text-gray-900 hover:opacity-100 inline-block text-xs leading-none border-b border-gray-900">MORE <i className="mdi mdi-arrow-right"></i></a></p>
                    </div>
                    <div>
                        <div className="inline-block align-bottom mr-5">
                            <span className="text-2xl leading-none align-baseline">$</span>
                            <span className="font-bold text-5xl leading-none align-baseline">{price}</span>
                            <span className="text-2xl leading-none align-baseline">.99</span>
                        </div>
                        <div className="inline-block align-bottom">
                            <button className="bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-10 py-2 font-semibold" onClick={() => handleAddProductToCart(session?.user?.email,id,1 )}><i className="mdi mdi-cart -ml-2 mr-2"></i> BUY NOW</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
);
}

export default EachProductPage;