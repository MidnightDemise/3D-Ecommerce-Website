import mongoose, { Schema, mongo } from "mongoose";


const categorySchema = new Schema({
    name:{
        type: String,
        required: true,
    },

    parent:{
        type: mongoose.Types.ObjectId , ref: "Category",
        required: false,
    },
    properties: [{type: Object}],
})


const Category = mongoose.models.Category || mongoose.model("Category",categorySchema);

export default Category;