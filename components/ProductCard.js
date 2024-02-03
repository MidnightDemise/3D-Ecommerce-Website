'use client'

import React from 'react';
import { useCart } from './CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';




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




const ProductCard = ({product}) => {

  const {data: session} = useSession();
  const {addToCart} = useCart();
  if(!product) return


  const router = useRouter();

  const handleProduct = () => {
    // Check if product is available
    if (product) {
      // Use the push method of the router to navigate to the product details page
      router.push(`/products/${product._id}`);
    }
  };



  return (
    <div className="relative flex flex-col items-center justify-center text-white bg-slate-700  shadow-md w-72 rounded-xl bg-clip-border mt-10 mb-10 ">
      <div className="relative h-40 mx-4 -mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
          <img
          src={product.url}
          alt="img-blur-shadow"
          layout="fill"
    />
      </div>
      <div className="p-4">
        <h5 className="block mb-2 font-sans text-lg antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
          {product.name}
        </h5>
        <p className="block font-sans text-sm antialiased font-light leading-relaxed text-inherit">
          {product.description}
        </p>
      </div>
      <div className="p-4 pt-0 flex items-center justify-between space-x-6">
      <h2 className='font-bold '>Price {product.price}</h2>

        <button
          className="select-none rounded-lg bg-white text-black py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase shadow-lg shadow-pink-700 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
          onClick={() => handleAddProductToCart(session?.user?.email , product._id, 1 )}
        >
          Add To Cart
        </button>

        <button
          className="select-none rounded-lg bg-white text-black py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase shadow-lg shadow-pink-700 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
          onClick={(e) => handleProduct(e)}
        >Details</button>


      </div>
    </div>
  );
};

export default ProductCard;
