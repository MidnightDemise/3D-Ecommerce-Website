import { connectMongoDB } from "@/lib/mongodb";
import Order from "@/models/OrderSchema";
import { NextResponse } from "next/server";

export async function GET()
{
    await connectMongoDB();
    const orders = await Order.find();

    return NextResponse.json({orders}, {status: 201});

}




export async function DELETE()
{

}