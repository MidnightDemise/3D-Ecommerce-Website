// import mongoose from "mongoose";


// export const connectMongoDB = async () => {

//     try {
//         await mongoose.connect(process.env.MONGODB_URI);
//         console.log("Connected to MongoDB");
//     } catch (error) {
//         console.log(error);
//         console.log("Failed to connect to MONGODB");
//     }
// }


import mongoose from "mongoose";

let isConnected = false;

export const connectMongoDB = async (pause = false) => {
    if (isConnected && !pause) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI);
        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        isConnected = false;
    }
};

export const disconnectMongoDB = async () => {
    if (isConnected) {
        await mongoose.disconnect();
        isConnected = false;
        console.log("Disconnected from MongoDB");
    }
};




export async function getFeaturedProduct() {
    const featuredId = '65619cc2805ff7c695b0e7a6';
    await connectMongoDB();
    const featuredProduct = await prod.findById(featuredId);
    return JSON.parse(JSON.stringify(featuredProduct));
  }