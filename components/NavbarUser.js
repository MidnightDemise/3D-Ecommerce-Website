'use client'

import React from 'react';
import Link from 'next/link';

const NavbarUser = () => {

  return (
    <div className='   flex p-4 items-center justify-between bg-slate-700 text-white'>
      <div>
        <h1 className='text-3xl font-bold'>E VERSE</h1>
      </div>

      <div className=' flex space-x-8 mr-5 font-bold'>
        <NavLink href='/home'>Home</NavLink>
        <NavLink href='/about'>About Us</NavLink>
        <NavLink href='/contact'>Contact Us</NavLink>
        <NavLink href='/products'>Products</NavLink>
        <NavLink href='/reviews'>Reviews</NavLink>
        <NavLink href={'/orders'}>Orders</NavLink>
        <NavLink href={'/messages'}>Messages</NavLink>
        <NavLink href={'/experience'}>Experience</NavLink>

        <NavLink href='/cart'>
          Cart
          {/* {cartCount > 0 && <span className="cart-count">{cartCount}</span>} */}
        </NavLink>
      </div>      
    </div>
  );
};

// Custom NavLink component with inline styles
const NavLink = ({ href, children }) => {
  const linkStyles = {
    position: 'relative',
    textDecoration: 'none',
    color: 'white',
    transition: 'color 0.3s',
  };

  const lineStyles = {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0%',
    height: '2px',
    backgroundColor: 'white',
    transition: 'width 0.3s',
  };

  return (
    <Link style={linkStyles} href={href} onMouseEnter={(e) => (e.currentTarget.childNodes[0].style.width = '100%')}
    onMouseLeave={(e) => (e.currentTarget.childNodes[0].style.width = '0%')}>
      
        <span style={lineStyles}></span>
        {children}
    </Link>
  );
};

export default NavbarUser;