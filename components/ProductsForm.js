'use client'

import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const ProductsForm = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [media, setMedia] = useState(null); // New state for medi
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [productProperties,  setProductProperties] = useState({});

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







  const handleAddProduct = async (e) => {
    e.preventDefault();
    const url = await imageUpload(); // Wait for image upload before sending the request

    try {
      const result = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description, price , url , selectedCategory , properties: productProperties}),
      });
      

      if (result.ok) {
        console.log('Successfully added product:', { name, description, price , url , selectedCategory , productProperties });
        router.push('/products');
      }
    } catch (error) {
      console.log(error);
      console.log('Failed to add the product');
    }
  };

  const setProductProps = (propName , value) => {
    setProductProperties(prev => {
      const newProductPros = {...prev};
      newProductPros[propName] = value;
      return newProductPros;
    })
  }


  const imageUpload = async () => {
    if (!media) {
      // No media selected, do nothing
      return;
    }

    const formData = new FormData();
    formData.append('file', media);
    formData.append("upload_preset","mystore");
    formData.append("cloud_name","dyq48gxo5");

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dyq48gxo5/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json(); // Wait for the JSON response

      console.log('Image uploaded successfully');
      console.log(data);

      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleMediaChange = (e) => {
    // Set the selected media file
    setMedia(e.target.files[0]);
  };


  let propertiesToFill = []
  if(categories.length > 0 && selectedCategory)
  {
    let catInfo = categories.find(({_id})=> _id === selectedCategory);
    propertiesToFill.push(...catInfo.properties);
    while(catInfo?.parent?._id)
    {
      const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id);
      propertiesToFill.push(...parentCat.properties);
      catInfo = parentCat;

    }

  }

  return (
    <div>
      <div className="container mx-auto my-8 p-4">
        <h2 className="text-2xl font-semibold mb-4">Add a new Product</h2>

        {/* Product Title */}
        <div className="mb-4">
          <label htmlFor="productName" className="block text-sm font-medium text-gray-600">
            Product Name
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select a Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                {propertiesToFill.length > 0 && propertiesToFill.map((property) => (
                    <div>
                      {property.name} 
                      <select value={productProperties[property.name]} onChange={e => setProductProps(property.name,e.target.value)}>
                        {property.values.map((value) => (
                          <option value={ value}>{value}</option>
                        ))}
                      </select>
                    </div>
                ))}
      </div>
        {/* Product Description */}
        <div className="mb-4">
          <label htmlFor="productDescription" className="block text-sm font-medium text-gray-600">
            Product Description
          </label>
          <textarea
            id="productDescription"
            name="productDescription"
            value={description}
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Media Upload */}
        <div className="mb-4">
          <label htmlFor="productMedia" className="block text-sm font-medium text-gray-600">
            Product Media
          </label>
          <input
            type="file"
            id="productMedia"
            name="productMedia"
            onChange={handleMediaChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Add Product Button */}
        <button
          onClick={(e) => handleAddProduct(e)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsForm;
