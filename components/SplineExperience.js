import Spline from '@splinetool/react-spline';
import { useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import NavbarUser from './NavbarUser';


let target;
const SplineExperience = () => {
  const { data : session } = useSession();
  const [hover, setHover] = useState(false);
  const [drag, setDrag] = useState(false);
  const [productId , setProductId] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (drag && hover) {
        try {
          const res = await fetch("http://localhost:3000/api/cart", {
            method: "POST",
            headers: {
              'Content-Type': "application/json",
            },
            body: JSON.stringify({
              email: session?.user?.email,
              id: productId,
              quantity: 1,
            }),
          });
  
          if (res.ok) {
            console.log("Successfully posted to cart (splineexperinece)");
          }
          // Handle response if needed
        } catch (error) {
          console.error("Error fetching data:", error);
          // Handle error
        }
      }
    };
  
    fetchData();
  }, [drag, hover, productId]);

  const onMouseDown = (e) => {
    setProductId(e.target.name);
    if (e.target.name === "6569b1905de9c980a6e50455" || e.target.name === "6569aebd5de9c980a6e50437" || e.target.name === "656c9704cb6b0cdb6db7c5c2" || e.target.name === "656af73f818e967aa2c5c435" || e.target.name === "658072b646798c53701c8c7f" || e.target.name === "6569b3d05de9c980a6e50492" || e.target.name === "6569b2105de9c980a6e50463") {
      setDrag(true);
    }
  };

  const onMouseUp = (e) => {
    setDrag(false);
    setHover(false);
  };

  const onHovered = (e) => {
    if (e.target.name === "table_large" || e.target.name === "Box") {
      setHover(true);
    }
  };

  return (
    <div>
      <NavbarUser />
      <Spline scene="https://prod.spline.design/toBErUz9ECLdjYxC/scene.splinecode" onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseHover={onHovered} />
    </div>
  );
};

export default SplineExperience;