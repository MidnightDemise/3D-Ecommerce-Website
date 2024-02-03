'use client'

import Navbar from '@/components/Navbar'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const deleteAllProducts = async () => {
    
    try {
        const res = await fetch(`/api/deleteproducts/`, {
            method: 'DELETE',
        });

        if(res.ok) console.log(res.body);
    } catch (error) {
        console.log(error);
    }
}



const getProducts = async  () => {
    try {
        const res = await fetch("http://localhost:3000/api/products",{
        cache: 'no-store'
    
    });

    if(!res.ok)
    {
        throw new Error("Failed to fetch the products")
    }

    return res.json();
    } catch (error) {
        console.log(error);
        console.log("Error fetching the products");
    }

}


const productspage = async () => {
    const response = await getProducts();
    const products = response.products || [];

    return (
        <>
            <div>
                <Navbar/>
                <div className="container mx-auto my-8 p-4">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-semibold">Product Management</h2>
                        <Link href="products/add-product">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                Add Product
                            </button>
                        </Link>
                        <Link href="" onClick={deleteAllProducts} >
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                                Delete All
                            </button>
                        </Link>


                    </div>
                    {/* Add your content here */}
                    {/* For example, you can display a list of products or other relevant information */}
                </div>
            </div>

            {products.map((t, index) => (
                <div key={index} className="flex justify-between bg-white m-5 border border-black p-4 rounded-md shadow-md">
                    
                    <div>
                    {/* Random title */}
                    <h3 className="text-xl font-semibold mb-2">{t.name}</h3>
                    
                    {/* Random description */}
                    <p className="text-gray-600 mb-2 ">{t.description}</p>
                    
                    {/* Random price */}
                    <p className="text-lg font-bold text-green-500">{t.price}</p>
                    </div>

                    <div>
                        
                        <Link className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg" href={"/admin/products/delete/" + t._id}>
                            Delete
                        </Link>

                    </div>

                </div>

            ))}

        </>
    );
};

export default productspage