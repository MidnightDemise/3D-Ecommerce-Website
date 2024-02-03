'use client';


import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'



const EditProductForm = (
    {
        id: id,
        name: existingName,
        description: existingDescription,
        price: existingPrice,
        category: existingCategory

    }
) => {

    const router = useRouter();
    const [newName, setName] = useState(existingName);
    const [newDescription, setDescription] = useState(existingDescription);
    const [newPrice, setPrice] = useState(existingPrice);
    const[newCategory , setCategory] = useState(existingCategory);


    const [categories, setCategories] = useState([]); // Initialize as an empty array


    useEffect(() => {
      const fetchCategories = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/categories", {
            cache: 'no-store'
          });
  
          if (!res.ok) {
            throw new Error("Failed to fetch the category");
          }
  
          const data = await res.json();
          setCategories(data.category); // Set the categories state
        } catch (error) {
          console.log(error);
          console.log("Error fetching the category");
        }
      };

      fetchCategories();
    }, []);



    const handleUpdateProduct = async (e,id) => {
        e.preventDefault();
        
        console.log(newCategory);
        const data = {
            newName,
            newDescription,
            newPrice,
            newCategory
        };

        try {
            const result = await fetch(`/api/products/${id}`,{
                method: "PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if(result.ok) { console.log("Successfully updated"); router.push("/products");}
            

        } catch (error) {
            console.log(error);
            console.log("Failed to update the product");
        }
        
    }

  return (
    <div>
        <div className="container mx-auto my-8 p-4">
          <h2 className="text-2xl font-semibold mb-4">Edit Product</h2>
  
          {/* Product Title */}
          <div className="mb-4">
            <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              id="productName"
              name="productName"
              value={newName}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
  
          {/* Product Description */}
          <div className="mb-4">
            <label htmlFor="productDescription" className="block text-sm font-medium text-gray-600">
              Product Description
            </label>
            <textarea
              id="productDescription"
              name="productDescription"
              value={newDescription}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            ></textarea>
          </div>
  
          {/* Product Price */}
          <div className="mb-4">
            <label htmlFor="productPrice" className="block text-sm font-medium text-gray-600">
              Product Price
            </label>
            <input
              type="text"
              id="productPrice"
              name="productPrice"
              value={newPrice}
              onChange={(e) => setPrice(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
  
          <div className="mb-4">
          <label htmlFor="productCategory" className="block text-sm font-medium text-gray-600">
            Product Category
          </label>
          <select
            id="productCategory"
            name="productCategory"
            value={newCategory}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a Category</option>
             {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))} 
          </select>
        </div>
          {/* Add Product Button */}
          
          <Link href={"/products"}
            onClick={e => handleUpdateProduct(e,id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            Update Product
          </Link>
        </div>

    </div>
  )
}

export default EditProductForm