import { connectMongoDB } from "@/lib/mongodb";
import Category from "@/models/categorySchema";
import { Types } from "mongoose";
import { NextResponse } from "next/server";




export async function POST(req)
{
    
    const { name , option , properties } = await req.json();
    console.log(name,option, properties);
    
    await connectMongoDB();

    if(Types.ObjectId.isValid(option))
    {
        await Category.create({name,parent: option , properties});


    }
    else
    {
        await Category.create({name , properties});

    }
    return NextResponse.json({message: "Successfully posted the category"}, {status: 201});
}


export async function GET()
{
    await connectMongoDB();
    const category = await Category.find().populate("parent");
    return NextResponse.json({category});

}



export async function DELETE(req , { params })
{  
        const id = req.nextUrl.searchParams.get("id");
        console.log(id);
        await connectMongoDB();
        await Category.findByIdAndDelete(id);

        return NextResponse.json({message: "Successfuly deleted category"} , {status: 201});
    
    
}



export async function PUT(req)
{
    const { name , option , properties , _id} = await req.json();
    console.log(name,option , _id , properties);
    await connectMongoDB();

    const categoryUpdate = await Category.updateOne({_id},{
        name,
        parent: option,
        properties
    })


    return NextResponse.json({categoryUpdate});

}