import { connectMongoDB } from "@/lib/mongodb";
import prod from "@/models/prod";
import { connect } from "mongoose";
import { NextResponse } from "next/server";


export async function PUT(request , {params})
{

    try {
        await connectMongoDB(); // Make sure this is working correctly

        const { id } = params;
        const { newName: name, newDescription: description, newPrice: price , newCategory: category } = await request.json();
        console.log(name,description,price,category);
        const product = await prod.findByIdAndUpdate(id, { name, description, price , category }, { new: true });
       
        if (!product) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated", product }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}



export async function GET(request , { params })
{
    const { id } = params;
    await connectMongoDB();
    const product = await prod.findOne({_id: id});
    return NextResponse.json({product},{status: 200});

}



export async function DELETE(req)
{

    await connectMongoDB();
    await prod.deleteMany();

    return NextResponse.json({message: "succesfully deleted all the products"}, {status: 201});
}