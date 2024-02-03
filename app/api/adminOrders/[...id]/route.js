import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/OrderSchema";
import { NextResponse } from "next/server";

export async function PUT(req , { params })
{
    try {
        const { id } = params;
    
        await connectMongoDB();

        await Order.findOneAndUpdate({orderId : id} , {$set: { status: "completed"}})
        console.log("hi");
        return NextResponse.json({message: "Succesfully updated"} , { status : 201});

    } catch (error) {
        
    }

}