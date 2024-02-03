import { connectMongoDB } from "@/lib/mongodb";
import Contact from "@/models/ContactSchema";
import { NextResponse } from "next/server";



export async function PUT(req , { params } )
{   
    const {adminReply} = await req.json();
    const {id} = params;
    connectMongoDB();

    await Contact.findOneAndUpdate({contactId : id} , {$set: { adminReply} })
    return NextResponse.json({message: "Succesfully updated"} , { status : 201});

}