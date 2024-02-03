import React from 'react'


const handleDelete = async (e,id) => {
    
    try {
        const res = await fetch(`/api/messages?id=` + id, {
            method: 'DELETE',
        });

        if(res.ok) console.log(res.body);
    } catch (error) {
        console.log(error);
    }
}


const ContactForm = ({ contact }) => {
    return (
        <div className="flex-row mx-auto max-w-md  bg-white shadow-md rounded-md p-6 mb-4">
        <div className="">
            <h2 className="text-2xl font-bold mb-4">Contact Details</h2>
            <div className="mb-4">
                <h4 className="text-lg font-bold mb-2">Message</h4>
                <p className="text-gray-600">{contact.message}</p>
            </div>
        {contact.adminReply !== null && (
          <div>
            <h4 className="text-lg font-bold mb-2">Admin Reply</h4>
            <p className="text-gray-600">{contact.adminReply}</p>
            <button
              onClick={() => handleDelete(contact._id)}
              className="bg-red-500 text-white rounded-full px-6 py-2 text-lg font-bold hover:bg-red-600 transition duration-300"
            >
              DELETE
            </button>
          </div>
        )}
      </div>
    </div>
    );
};

export default ContactForm;