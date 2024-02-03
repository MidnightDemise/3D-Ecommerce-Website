import { connectMongoDB } from "@/lib/mongodb";
import prod from "@/models/prod";
import { NextResponse } from "next/server";

export async function GET(req)
{
    

    await connectMongoDB();
    const product = await prod.findById(req);    
    return NextResponse.json({product});
}