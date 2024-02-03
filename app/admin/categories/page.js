'use client'

import Navbar from '@/components/Navbar';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';


const CategoriesPage = () => {

    const [name, setName] = useState('');
    const [option, setOption] = useState('');
    const [editCategory , setEditCategory] = useState(null);
    const [categories, setCategories] = useState([]); // Initialize as an empty array
    const [propertyName, setPropertyName] = useState('');
    const [propertyValue, setPropertyValue] = useState('');
    const [properties , setProperties] = useState([]);


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



    const handleUpdatePropertyName = (index , property , newName)  => {



        setProperties(prev => {
          const properties = [...prev];
          properties[index].name = newName;
          return properties;
        })
    }


    const handlePropertiesValueChange = (index , property , newValues)  => {



      setProperties(prev => {
        const properties = [...prev];
        properties[index].values = newValues;
        return properties;
      })
  }


    const handleRemoveProperty = (index) => {
      setProperties((prev) => {
        const newProperties = [...prev];
        newProperties.splice(index, 1); // Remove the property at the specified index
        return newProperties;
      });
    };


    const handleSaveProperty = () => {
      // Add your logic here to save the property, e.g., send an API request
      // Reset the input values after saving
      console.log('Saving property...', propertyName, propertyValue);
    
      // Clear the input fields and set addingProperty to false
      setPropertyName('');
      setPropertyValue('');
    };




    const addProperty = () => 
    {
      setProperties(prev => {
        return [...prev , {name: '' , values: ''}]
      })

    }




  // Function to handle saving the new category
  const handleSaveCategory = async (e) => {
    e.preventDefault();
    console.log(categories); 
    const data = {name , option , properties: properties.map((property) => ({name: property.name , values: property.values.split(',')}))};

    if(editCategory)
    {
      data._id = editCategory._id;
        try {
          const result = await fetch(`http://localhost:3000/api/categories`,{
              method: "PUT",
              headers:{
                  "Content-Type": "application/json",
              },
              body: JSON.stringify(data)
          })
          if(result.ok) { console.log("Successfully updated");}
          

      } catch (error) {
          console.log(error);
          console.log("Failed to update the product");
      }
    }
    else
    {

      try {
        const res = await fetch("/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data)
        });
  
        if (res.ok) {
          console.log("Successfully created category");
        }
      } catch (error) {
        console.log(error);
        console.log("Failed to go in the try block of category page");
      }


    }




    

    // Add your logic here to save the category, e.g., send an API request
    // Reset the input and dropdown values after saving
  };


  const handleEditCategory = (category) => {
      setEditCategory(category);
      setName(category.name);
      setOption(category.parent?._id);
      setProperties(category.properties.map((property) => ({
        name: property.name,
        values: property.values.join(','),
      })));
  }

  const handleDeleteCategory = (category) => {
    Swal.fire({
      
        title: 'Are you sure?',
        text: 'You will not be able to recover this category!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
    }).then(async (result) => {
        if (result.isConfirmed) {
            // Call the function to delete the category here
            // You can use the same logic as in your existing code
            console.log('Deleting category...');

            try {
              const res = await fetch(`/api/categories?id=` + category._id, {
                  method: 'DELETE',
              });
      
              if(res.ok) console.log(res.body);
            } catch (error) {
                console.log(error);
            }
            // handleDeleteCategoryLogic(category);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            console.log('Cancelled deletion');
        } 
    });
};





  return (
    <>
      <div>
        <Navbar />
        <div className="max-w-md mx-auto mt-8 p-4 bg-gray-100 shadow-md">
          {/* Input for new category name */}
          <div className="mb-4">
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-600">
              Category Name:
            </label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
            />
          </div>




          

          {/* Dropdown for category options */}
          <div className="mb-4">
            <label htmlFor="categoryOptions" className="block text-sm font-medium text-gray-600">
              Category Options:
            </label>
            <select
              id="categoryOptions"
              value={option}
              onChange={(e) => setOption(e.target.value)}
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:border-blue-500"
            >
              <option value="">No Category Selected</option>

              {categories && categories.map((category) => (
                <option key={category._id} value={category._id}>
                    {category.name}
                </option>
                ))}

              {/* Add more options as needed */}
            </select>


            <button
          onClick={() => addProperty()}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green active:bg-green-800 mr-2"
        >
          Add Property
        </button>

        {/* Property inputs */}
        {properties.length > 0 && (
          <div className="mt-4">
            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b">Property Name</th>
                  <th className="py-2 px-4 border-b">Property Values</th>
                  <th className="py-2 px-4 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={property.name}
                        onChange={(e) => handleUpdatePropertyName(index, property, e.target.value)}
                        placeholder="Property Name"
                        className="w-full border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <input
                        type="text"
                        value={property.values}
                        onChange={(e) => handlePropertiesValueChange(index, property, e.target.value)}
                        placeholder="Property Values"
                        className="w-full border rounded-md focus:outline-none focus:border-blue-500"
                      />
                    </td>
                    {/* Save Property and Remove buttons */}
                    <td className="py-2 px-4 border-b">
                      <div className="flex">
                      
                        <button
                          onClick={() => handleRemoveProperty(index)}
                          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </div>

          {/* Save button */}
          <button
            onClick={(e) => handleSaveCategory(e)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
          >
            Save
          </button>

        </div>



        


         






        <div className="flex justify-between p-4 m-4">
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Category Name</th>
                <th className="py-2 px-4 border-b">Parent Category</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category._id}>
                  <td className="py-2 px-4 border-b">{category.name}</td>
                  <td className="py-2 px-4 border-b">{category?.parent?.name}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEditCategory(category)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600 focus:outline-none focus:shadow-outline-yellow active:bg-yellow-800 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 focus:outline-none focus:shadow-outline-red active:bg-red-800"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  );
};

export default CategoriesPage;