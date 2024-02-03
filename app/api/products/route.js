import { connectMongoDB } from "@/lib/mongodb";
import prod from "@/models/prod";
import { NextResponse } from "next/server";
export async function POST(req)
{
    try {
        const { name , description , price , url , selectedCategory , properties } = await req.json();
        await connectMongoDB();
        await prod.create({name,description,price , url , category: selectedCategory , properties});
        console.log(name , description , price,url, selectedCategory);
        return NextResponse.json({message: "Successfully created the product"}, {status: 201});
    } catch (error) {
        return NextResponse.json({message: "Error creating the product" , error});
    }
    

}


export async function GET()
{
    

    await connectMongoDB();
    
    const products = await prod.find();
    return NextResponse.json({products});
}


export async function DELETE(req , { params })
{  
        const id = req.nextUrl.searchParams.get("id");
        console.log(id);
        await connectMongoDB();
        await prod.findByIdAndDelete(id);

        return NextResponse.json({message: "Successfuly deleted product"} , {status: 201});
    
    
}