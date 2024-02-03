
'use client'

import Navbar from '@/components/Navbar'
import ProductsForm from '@/components/ProductsForm';
import { useRouter } from 'next/navigation';

import React, { useState } from 'react'

const AddProductPage = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
  
    const handleAddProduct = async (e) => {
      // Handle adding the product, e.g., sending a request to your API
      e.preventDefault();


      try
      {
        const result = await fetch("/api/products",{
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify({name,description,price})
        })

        if(result.ok)
        {
            console.log("Successfully added product:", { productName, productDescription, productPrice});
            router.push("/admin/products");
        }
    }
        catch(error)
        {
            console.log(error);
            console.log("cant go in the try block in addproducts page");
        }



      // You may want to redirect the user or perform other actions after adding the product
    };
  
    return (
      <div>
        <Navbar />
        <ProductsForm/>
       
      </div>
    );
  };
  
  export default AddProductPage;