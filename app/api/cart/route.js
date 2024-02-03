import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/CartSchema";
import prod from "@/models/prod";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";


 export async function POST(req)
 {
     const { email , id: productId , quantity: quantity } = await req.json();
     await connectMongoDB();
     console.log(quantity)

     console.log(email);
     const userCart = await Cart.findOne({ userId: email});
     if(!userCart) return NextResponse.json({message: "Failed to find user cart"} , {status: 401});

     const existingProduct = userCart.products.find((product) => product.productId === productId);

     if (existingProduct) {
         // If the product is already in the cart, update the quantity
         existingProduct.quantity += quantity;
       } else {
         // If the product is not in the cart, add a new product entry
         userCart.products.push({ productId, quantity });
       }

       await userCart.save();

       return NextResponse.json({message: "Successfully added the product into the cart!"}, {status: 201});

 }



 export async function GET()
 {
    const session = await getServerSession();
    console.log(session.user.email)
    let quantities = [];
    await connectMongoDB();
    const email = session.user.email;
    const currentUserCart = (await Cart.findOne({userId: email}));
    const cartProductsIds = currentUserCart.products.map(product => (product.productId));
    currentUserCart.products.map(product => (quantities.push(product.quantity)))
    // const cartProductsIds = (await currentUserCart.find()).map(cartItem => console.log(cartItem));
    
    // // Fetch products that have matching IDs in the Product collection
    const products = await prod.find({ _id: { $in: cartProductsIds } });

    const response = {
        products: products,
        quantities: currentUserCart.products.map(product => product.quantity),
      };
  

    return NextResponse.json(response);


 }

 export async function DELETE(req)
{  
        const session = await getServerSession();

        await connectMongoDB();
        const userCart = await Cart.findOne({userId: session?.user?.email});

        return NextResponse.json({message: "Successfuly deleted product"} , {status: 201});

    
}