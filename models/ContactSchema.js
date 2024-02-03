import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({

    userId : {
        type: String,
        required: true,
    },
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: String
    },
    message: {
        type: String
    },
    contactId: {
        type: String,
        required: true,
    },
    adminReply: {
        type: String,
        required: false
    }
})


const Contact = mongoose.models.Contact || mongoose.model("Contact",contactSchema);

export default Contact;