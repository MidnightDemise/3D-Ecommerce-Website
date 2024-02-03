'use client'

import NavbarUser from '@/components/NavbarUser';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'



const handleRemoveFromCart = async (product,cartData,setCartData) => {

    const updatedCartData = { ...cartData };

  // Find the index of the product in the cart
  const index = updatedCartData.products.findIndex((p) => p._id === product._id);

  if (index !== -1) {
    // If the quantity is greater than 0, decrement it
    if (updatedCartData.quantities[index] > 0) {
      updatedCartData.quantities[index]--;

      // Update the state with the new quantities
      setCartData(updatedCartData);

      // Make a request to your server to update the database
      await fetch(`http://localhost:3000/api/cart/${product._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            quantity: 0, // Set quantity to 0 for removed products
            products: updatedCartData.products, // Include the updated products array
          }),
      });

      console.log("succesfful updated")
    } else {
      // If the quantity is 0, remove the product from the cart
      updatedCartData.products.splice(index, 1);
      updatedCartData.quantities.splice(index, 1);

      // Update the state with the new data
      setCartData(updatedCartData);

    }

    }
}

const getProducts = async  () => {
    try {
        const res = await fetch("http://localhost:3000/api/cart",{
        cache: 'no-store'
    
    });
  
    if(!res.ok)
    {
        throw new Error("Failed to fetch the cart products")
    }
  
    return res.json();
    } catch (error) {
        console.log(error);
        console.log("Error fetching the cart products and failed to go in the try block");
    }
  
  }


const handleCheckout = async (cartData) => {
    console.log(cartData)
    try {
        const res = await fetch("/api/orders",{method: "POST", "Content-Type": "application/json" , body: JSON.stringify({cartData})})

        if(res.ok) console.log("Successfully placed the order for the user");
    } catch (error) {
        console.log(error);
        console.log("Failed to go in the try block fo the checkout function created in cart.page.js")
    }
}

  
const handleDelete = async (id) => {
    
    console.log(id);
    try {
        const res = await fetch(`/api/cart/${id._id}`, {
            method: 'DELETE',
        });

        if(res.ok) console.log(res.body);
    } catch (error) {
        console.log(error);
    }
}




const CartPage = () => {

    const [cartData, setCartData] = useState({ products: [], quantities: [] });
    const [totalCost , setTotalCost] = useState(0);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const products = await getProducts();
            console.log(products);
            setCartData(products);
            const total = products.products.reduce(
                (acc, product, index) => acc + parseFloat(product.price) * products.quantities[index],
                0
              );
      
              setTotalCost(total);
          } catch (error) {
            console.error('Error fetching product:', error);
          }
        };
    
        fetchData();
      }, []);
      
    console.log(cartData);


  return (
    <>
    <NavbarUser/>

    <div className="container mx-auto mt-10">

  <div className="flex shadow-md my-10">
    <div className="w-3/4 bg-white px-10 py-10">
      <div className="flex justify-between border-b pb-8">
        <h1 className="font-semibold text-2xl">Shopping Cart</h1>
        <h2 className="font-semibold text-2xl">{`Items ${cartData.products.length}`}</h2>
      </div>

      {cartData.products.map((product, index) => (
        <div key={product._id} className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
          <div className="flex w-2/5">
            <div className="w-20">
              <img className="h-24" src={product.url} alt={product.name} />
            </div>
            <div className="flex flex-col justify-between ml-4 flex-grow">
              <span className="font-bold text-sm">{product.name}</span>
              <span className="text-red-500 text-xs">{product.brand}</span>
              <Link href={''}  onClick={() => handleDelete(product)} className="font-semibold hover:text-red-500 text-gray-500 text-xs">
                Remove
              </Link>
            </div>
          </div>
          <div className="flex justify-center w-1/5">
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              {/* SVG Path for Decrease Quantity */}
            </svg>
            <input className="mx-2 border text-center w-8" type="text" value={cartData.quantities[index]} />
            <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
              {/* SVG Path for Increase Quantity */}
            </svg>
          </div>
          <span className="text-center w-1/5 font-semibold text-sm">{`$${parseFloat(product.price) * cartData.quantities[index]}.00`}</span>
          <span className="text-center w-1/5 font-semibold text-sm">{`$${parseFloat(product.price) * cartData.quantities[index]}.00`}</span>
        </div>
      ))}

      <a href="#" className="flex font-semibold text-indigo-600 text-sm mt-10">
        <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
          {/* SVG Path for Continue Shopping Icon */}
        </svg>
        Continue Shopping
      </a>
    </div>

    <div id="summary" className="w-1/4 px-8 py-10">
      <h1 className="font-semibold text-2xl border-b pb-8">Order Summary</h1>
      <div className="flex justify-between mt-10 mb-5">
        <span className="font-semibold text-sm uppercase">{`Items ${cartData.products.length}`}</span>
        {/* <span className="font-semibold text-sm">{`${calculateTotal(cartData)}`}</span> */}
      </div>
      <div>
        <label className="font-medium inline-block mb-3 text-sm uppercase">Shipping</label>
        <select className="block p-2 text-gray-600 w-full text-sm">
          <option>Standard shipping - $10.00</option>
        </select>
      </div>
      <div className="py-10">
        <label for="promo" className="font-semibold inline-block mb-3 text-sm uppercase">Promo Code</label>
        <input type="text" id="promo" placeholder="Enter your code" className="p-2 text-sm w-full" />
      </div>
      <button className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase">Apply</button>
      <div className="border-t mt-8">
        <div className="flex font-semibold justify-between py-6 text-sm uppercase">
          <span>Total cost {totalCost}</span>
          {/* <span>{`$${calculateTotal(cartData) + 10}.00`}</span> */}
        </div>
        <Link href={'/products'} onClick={() => handleCheckout(cartData)} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
          Checkout
        </Link>
      </div>
    </div>
  </div>
</div>
</>
  )
}

export default CartPage