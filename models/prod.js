import mongoose, { Schema } from "mongoose";
import { models } from "mongoose";

const ProdSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId , ref: "Category",
    },
    properties: {
        type: Object
    }
   
});

const prod = models.prod || mongoose.model('prod', ProdSchema);

export default prod;