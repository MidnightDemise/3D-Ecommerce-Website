import Link from 'next/link'
import React, { useState } from 'react'
import { useCart } from './CartContext';
import { useSession } from 'next-auth/react';
import { useSelectedLayoutSegment } from 'next/navigation';




const handleAddProductToCart = async (email, id, quantity) => {

    console.log(quantity);
    try {
      const result = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email , id , quantity}),

      });
      

    } catch (error) {
      console.log(error);
      console.log('Failed to add the product');
    }
  };




const HeroBody = ({featuredProduct}) => {

    const { addToCart } = useCart();
    const {data: session} = useSession()
    const quantity = 1;

  return (
    <div className="p-10 grid grid-cols-2 items-center justify-center bg-cover bg-center text-white bg-slate-800 font-sans">
        <div className="text-center p-20">
          <h1 className="text-4xl font-bold mb-4">{featuredProduct.product.name}</h1>
          <p className='mb-10 '>
            {featuredProduct.product.description}
          </p>
          <Link href={""} onClick={ () => handleAddProductToCart(session?.user?.email,featuredProduct.product._id,quantity)} className='bg-blue-400 text-white rounded-3xl pt-3 pb-3 pr-10 pl-10 transition hover:bg-black duration-300'>Buy Now</Link>
        </div>
        <div>
          <img src='https://res.cloudinary.com/dyq48gxo5/image/upload/v1701500409/images_bpatzg.jpg'/>
        </div>
      </div>
  )
}

export default HeroBody

