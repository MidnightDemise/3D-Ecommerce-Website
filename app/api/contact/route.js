import { connectMongoDB } from "@/lib/mongodb";
import Contact from "@/models/ContactSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req)
{
    try 
    {   const session = await getServerSession();
        const {firstname , lastname , email , phone , message } = await req.json();
        connectMongoDB();
        await Contact.create({userId : session?.user?.email , firstname , lastname , email , phone , message , contactId: uuidv4()});
        return NextResponse.json({message: "Successfully placed the contact message form in the database"}, {status: 201});
        
    } catch (error) {
        console.log(error.message);
        console.log(error)   
    }
    

}


export async function GET()
{
    await connectMongoDB();
    const contacts = await Contact.find();

    return NextResponse.json({contacts})


}