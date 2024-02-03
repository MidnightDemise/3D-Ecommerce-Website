import { connectMongoDB } from "@/lib/mongodb";
import Contact from "@/models/ContactSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";




export async function GET()
{
    const session = await getServerSession();

     connectMongoDB();

     const messages = await Contact.find({userId: session?.user?.email});
     console.log(messages);
     return NextResponse.json({messages});


}

export async function DELETE(req , { params })
{  
        const id = req.nextUrl.searchParams.get("id");
        console.log(id);
        await connectMongoDB();
        await Contact.findByIdAndDelete(id);

        return NextResponse.json({message: "Successfuly deleted Message"} , {status: 201});
    
    
}