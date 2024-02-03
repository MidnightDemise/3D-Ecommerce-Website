'use client'

import NavbarUser from '@/components/NavbarUser';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';
import HeroBody from '@/components/HeroBody';
import { useEffect, useState } from 'react';
import { CartProvider, useCart } from '@/components/CartContext';
import { Select, SelectItem } from '@nextui-org/react';



const getProducts = async  () => {
  try {
      const res = await fetch("http://localhost:3000/api/products",{
      cache: 'no-store'
  
  });

  if(!res.ok)
  {
      throw new Error("Failed to fetch the products")
  }

  return res.json();
  } catch (error) {
      console.log(error);
      console.log("Error fetching the products");
  }

}
const getSpecificProduct = async (id) => {
  try {
    const result = await fetch(`/api/products/${id}`, {
      cache: 'no-store',
    });

    if (!result.ok) throw new Error("Can't find the specified product");

    return result.json();
  } catch (error) {
    console.log(error);
    console.log('Try block in edit page failed');
  }
};
const ProductsPage = () => {
  const [featuredProduct, setFeaturedProduct] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const product = await getSpecificProduct('6569aebd5de9c980a6e50437');
        const products = await getProducts();
        setFeaturedProduct(product);
        console.log(products);

        setAllProducts(products.products);
        setFilteredProducts(products.products); // Initialize filteredProducts with all products
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value;
    console.log(newCategory)
    setCategoryFilter(newCategory);
    filterProducts(newCategory);
  };

  const filterProducts = (category) => {
    if (category === "$.1") {
      // Filter for laptops
      console.log("Working")
      setFilteredProducts(allProducts.filter(product => product.category === "655f72a75e69722e693002dd"));
      console.log(filterProducts)
    } else if (category === '$.2') {
      // Filter for mobiles
      setFilteredProducts(allProducts.filter(product => product.category === "65619cc2805ff7c695b0e7a6"));
    } else {
      // No filter, show all products
      setFilteredProducts(allProducts);
    }
  };

  return (
    <CartProvider>
      <div>
        <NavbarUser />
        {!loading && <HeroBody featuredProduct={featuredProduct} />}

        {/* Filter Search Bar */}
        <Select
                aria-label = "Yes"
                value={categoryFilter}
                onChange={handleCategoryChange}
                className="bg-white border-slate-600 text-gray-800 px-4 py-2 rounded-md"
              >
                <SelectItem value="">All Categories</SelectItem>
                <SelectItem value="name">Laptops</SelectItem>
                <SelectItem value="midny">Mobiles</SelectItem>
              </Select>

        {/* Product List */}
        <div className='flex justify-center mt-5'>
          <div className='grid grid-cols-4 space-x-6 items-center bg-white ml-5'>
            {!loading &&
              filteredProducts.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default ProductsPage;