'use client'

import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react'






const handleDelete = async (e,id) => {
    
  console.log(id);
  try {
      const res = await fetch(`/api/orders?id=` + id, {
          method: 'DELETE',
      });

      if(res.ok) console.log(res.body);
  } catch (error) {
      console.log(error);
  }
}



const handleDoneClick = async (id) => {
    try {
        const result = await fetch(`/api/adminOrders/${id}`,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({id})
        })
        if(result.ok) { console.log("Successfully updated");}
        

    } catch (error) {
        console.log(error);
        console.log("Failed to update the product");
    }
    
}


const getOrders = async ( ) => 
{
    try {
        const res = await fetch("http://localhost:3000/api/adminOrders", {cache: 'no-store'});

        if(res.ok)
        {
            console.log("Succesfully fetched all the orders");

        }

        return res.json();
        
    } catch (error) {
        console.log(error);
        console.log("failed to go in the try block of the orders admin page getOrders fucntion")
    }
}

const AdminOrdersPage = () => {
    const[orders , setOrders] = useState([]);
    const[loading , setLoading] = useState(true);
    const[status , setOrderStatus ] = useState("Pending");

    useEffect(() => {
        const fetchOrders = async () => {
            const allOrders = await getOrders();
            setOrders(allOrders);
            setLoading(false);
        }

        fetchOrders();
    },[])


    console.log(orders);
  return (
    <div className="p-8">
     <Navbar/>
      <h1 className="text-2xl font-bold mb-4">Admin Orders Page</h1>

      {/* Display order cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!loading && orders.orders.map(order => (
          <div key={order._id} className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-2">{`Order ID: ${order.orderId}`}</h2>
            <p>{`User ID: ${order.userId}`}</p>
            <p>{`Order Date: ${new Date(order.orderDate).toLocaleString()}`}</p>
            <p>{`Status: ${order.status}`}</p>

            {/* Display products for each order */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Products</h3>
              <ul>
                {order.products.map(product => (
                  <li key={product._id}>{`${product.quantity} x ${product.productName} - ${product.productPrice}`}</li>
                ))}
              </ul>
              <button
              onClick={() => handleDoneClick(order.orderId)}
              className="bg-green-500 text-white rounded-md px-4 py-2 mt-4"
            >
              Done
            </button>

            <button
              onClick={(e) => handleDelete(e,order._id)}
              className="bg-red-500 text-white rounded-md px-4 py-2 mt-4"
            >
              DELETE
            </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminOrdersPage