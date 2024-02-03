import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/CartSchema";
import Order from "@/models/OrderSchema";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


export async function POST(req)
{
    
    const session = await getServerSession();

    const { cartData } = await req.json();
    const { products , quantities} = cartData;


    connectMongoDB();
    let orders = [];

    for (let i = 0 ; i < products.length ; i++)
    {
        const product = products[i];
        const quantity = quantities[i];

        orders.push({
            productId : product._id,
            productName : product.name,
            productPrice: product.price,
            quantity : quantity,
        });
    }


    const newOrder = new Order({
        userId: session.user.email,
        orderId: uuidv4(),
        products: orders,
        orderDate: new Date(),
        status: 'Pending', // Set the initial status
        // Add other fields relevant to your order
      });

    newOrder.save();
    
    await Cart.updateOne({ userId: session.user.email }, { $set: { products: [] } });


    return NextResponse.json({message: "successfully placed the order"} , {status: 201});
}



export async function GET()
{
    const session = await getServerSession();

    const orders = await Order.find({ userId: session.user.email });

    console.log(orders);
    return NextResponse.json({orders});
}


export async function DELETE(req , { params })
{  
        const id = req.nextUrl.searchParams.get("id");
        console.log(id);
        await connectMongoDB();
        await Order.findByIdAndDelete(id);

        return NextResponse.json({message: "Successfuly deleted Order"} , {status: 201});
    
    
}