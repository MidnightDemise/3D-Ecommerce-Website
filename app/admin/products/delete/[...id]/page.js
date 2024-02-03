'use client'

import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'


const getSpecificProduct = async (id) => {
    try {
      const result = await fetch(`/api/products/${id}`,{
        cache: "no-store"
      })

      if(!result.ok) throw new Error("Cant find the specified product in delete page");

      return result.json();


    } catch (error) {
      console.log(error);
      console.log("Try block in deletepage failed");
    }



}


const handleDelete = async (e,id) => {
    
    try {
        const res = await fetch(`/api/products?id=` + id, {
            method: 'DELETE',
        });

        if(res.ok) console.log(res.body);
    } catch (error) {
        console.log(error);
    }
}


const DeletePage = async () => {
    const params = useParams();

    const {id} = params;

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Are you sure you want to delete the product</h1>
      
        <div className="flex space-x-4">
            <button onClick={e=> handleDelete(e,id)}>yes</button>
            {/* <Link href={"/products"} onClick={e => handleDelete(e,id)} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Yes</Link> */}
            <Link href={"/admin/products"} className="bg-green-500 hover:bg-green-800 text-white font-bold py-2 px-4 rounded">No</Link>
        </div>
        
    </div>
  );
};

export default DeletePage;
