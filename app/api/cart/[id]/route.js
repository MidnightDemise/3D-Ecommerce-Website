import { connectMongoDB } from "@/lib/mongodb";
import Cart from "@/models/CartSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function PUT(request , {params})
{
    const session = await getServerSession();

    try {
        await connectMongoDB(); // Make sure this is working correctly
        const email = session.user.email;
        const currentUserCart = (await Cart.findOne({userId: email}));
        console.log(currentUserCart)
        const { id } = params;
        const { quantity } = await request.json();
        
        const productIndex = currentUserCart.products.findIndex((product) => product._id.toString() === id);

        const product = await Cart.findByIdAndUpdate(id, { quantity: quantity }, { new: true });
       
        if (!product) {
            return NextResponse.json({ message: "cart not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "cart updated", product }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}


export async function DELETE(req, { params }) {
    const id = params.id;
    console.log(id);
    
    const session = await getServerSession();

    await connectMongoDB();

    try {
        // Find the user's cart
        const userCart = await Cart.findOne({ userId: session?.user?.email });

        if (!userCart) {
            return NextResponse.json({ message: "User's cart not found" }, { status: 404 });
        }

        // Remove the product with the specified id from the userCart array
        const updatedProducts = userCart.products.filter(product => product.productId !== id);

        // Update the Cart table with the modified userCart
        await Cart.findOneAndUpdate(
            { userId: session?.user?.email },
            { products: updatedProducts },
            { new: true } // Set to true to return the modified document
        );

        return NextResponse.json({ message: "Successfully deleted product" }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}