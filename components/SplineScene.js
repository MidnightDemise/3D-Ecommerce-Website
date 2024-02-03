'use client'

import React from 'react'
import Spline from '@splinetool/react-spline'
import { useRouter } from 'next/navigation'


const SplineScene = () => {
    const router = useRouter();

    function onMouseDown(e) {
      console.log(e.target.name);

      if(e.target.name === 'AboutUs' || e.target.name === "about")
      {
        console.log("about works")
        router.push("/about");
      }
        if(e.target.name === 'shopNow')
        {
            router.push("/products");
        }
       
        if(e.target.name === "Telephone" || e.target.name === "Phone")
        {
          console.log("works")
          router.push("/contact");
        }
    }
    
  return (
    <div>
<Spline scene="https://prod.spline.design/JW299b2TFqh6Ki5t/scene.splinecode" onMouseDown={onMouseDown}/>   </div>
  )
}

export default SplineScene