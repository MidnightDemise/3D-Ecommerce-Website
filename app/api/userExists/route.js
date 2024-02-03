import { connectMongoDB } from "@/lib/mongodb";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function POST(req)
{
    try {
        await connectMongoDB();
        const {email } = await req.json();
        const user = await User.findOne({email}).select("_id");
        console.log(user);
        return NextResponse.json({user});



    } catch (error) {
        console.log(error);
        console.log("Failed to fetch user for existing (userexists.js)");
    }
}


export async function GET()
{
    await connectMongoDB();
    const products = Product.find();
    return NextResponse.json({message: "All products are gonna get displayed"},{status: 200});
}