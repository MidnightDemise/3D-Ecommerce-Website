import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs'
import Cart from "@/models/CartSchema";

export async function POST(req)
{
    try {
        const {name , email , password} = await req.json();
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(name , email , password);

        await connectMongoDB();

        createCartForUser(email);
        
        await User.create({name,email,password: hashedPassword});
        return NextResponse.json({message: "User Registered"},{status: 201});

    } 
    catch(error)
    {
        return NextResponse.json({message: "Error registering user"},{status: 500});
    }
}

const createCartForUser = async (userId) => {
    try {
      const cart = new Cart({
        userId: userId,
        products: [],
      });
  
      await cart.save();
      console.log('Cart created successfully');
    } catch (error) {
      console.error('Error creating cart:', error);
    }
  };