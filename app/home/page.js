
import { CartProvider } from '@/components/CartContext'
import NavbarUser from '@/components/NavbarUser'
import SplineScene from '@/components/SplineScene'
import { connectMongoDB } from '@/lib/mongodb'
import prod from '@/models/prod'
import React from 'react'

const HomePage = () => {
  return (
    <div>
        <NavbarUser/>
        <SplineScene/>
    </div>
  )
}

export default HomePage

