'use client'


import React from 'react'
import {useParams, useRouter, useSearchParams} from 'next/navigation';
import ProductsForm from '@/components/ProductsForm';
import EditProductForm from '@/components/EditProductForm';


const getSpecificProduct = async (id) => {
    try {
      const result = await fetch(`/api/admin/products/${id}`,{
        cache: "no-store"
      })

      if(!result.ok) throw new Error("Cant find the specified product");

      return result.json();


    } catch (error) {
      console.log(error);
      console.log("Try block in edit page failed");
    }



}



const EditProductPage = async () => {
  const router = useRouter();
  
  const params = useParams();
  const { id } = params;

  const res = await getSpecificProduct(id);
  const { name , description , price , category } = res.product;

  console.log(id);
  
  return (
    <div>
      <EditProductForm
        id={id}
        name={name}
        description={description}
        price={price}
        category={category}
      />
    </div>
  )
}

export default EditProductPage