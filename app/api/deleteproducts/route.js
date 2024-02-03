import { connectMongoDB } from "@/lib/mongodb";
import prod from "@/models/prod";
import { NextResponse } from "next/server";

export async function DELETE(req)
{

    await connectMongoDB();
    await prod.deleteMany();

    return NextResponse.json({message: "succesfully deleted all the products"}, {status: 201});
}