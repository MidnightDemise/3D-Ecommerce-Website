'use client'

import NavbarUser from '@/components/NavbarUser'
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


const getProducts = async  () => {
    try {
        const res = await fetch("http://localhost:3000/api/orders",{
        cache: 'no-store'
    
    });
  
    if(!res.ok)
    {
        throw new Error("Failed to fetch the orders")
    }
  
    return res.json();
    } catch (error) {
        console.log(error);
        console.log("Error fetching the orders and failed to go in the try block in orders.js");
    }
  
  }



const ordersPage = () => {
    const [orders, setOrders] = useState([]);
    const[loading,setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
          try {
            const products = await getProducts();
            setOrders(products);

            setLoading(false);
          } catch (error) {
            console.error('Error fetching orders:', error);
          }
        };
    
        fetchData();
      }, []);

      
      console.log(orders.orders);

  return (
    <div>
        
        <NavbarUser/>
        <div className="container mx-auto mt-10">
                    {!loading &&
                orders.orders.map((order) => (
                <div key={order._id} className="border p-4 mb-4">
                    <h2 className="text-xl font-bold mb-2">Order ID: {order.orderId}</h2>
                    <p className="text-sm text-gray-500 mb-2">
                    Order Date: {new Date(order.orderDate).toLocaleString()}
                    </p>
                    <p className="text-sm text-gray-500 mb-2">Status: {order.status}</p>
                    <button className='bg-green-500 rounded-md ' onClick={(e) => handleDelete(e,order._id)}>CANCEL</button> 

                    {order.products && order.products.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {order.products.map((product) => (
                        <div key={product._id} className="border p-2">
                            <p className="text-sm font-bold">Product Name: {product.productName}</p>
                            <p className="text-sm font-bold">Product Price: {product.productPrice}</p>

                            <p className="text-sm">Quantity: {product.quantity}</p>
                            {/* Add other product details as needed */}
                        </div>
                        ))}

                    </div>
                    ) : (
                    <p>No products in this order.</p>
                    )}
                </div>
                ))}
            </div>
    
    </div>
  )
}

export default ordersPage