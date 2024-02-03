import React, { useState, useEffect } from 'react';

const ContactCard = ({ contact }) => {
  // Check if the component has been replied before using local storage
  const hasRepliedBefore = localStorage.getItem(`replied_${contact.contactId}`) === 'true';

  const [reply, setReply] = useState('');
  const [replied, setReplied] = useState(hasRepliedBefore);

  useEffect(() => {
    // Save replied state in local storage when it changes
    localStorage.setItem(`replied_${contact.contactId}`, replied.toString());
  }, [replied, contact.contactId]);

  const handleReplyChange = (e) => {
    setReply(e.target.value);
  };

  const handleReplySubmit = async (contactId, adminReply) => {
    // Handle the logic to send the reply
    try {
      const res = await fetch(`http://localhost:3000/api/contact/${contactId}`, {
        method: 'PUT',
        headers: { 'Contact-Type': 'application/json' },
        body: JSON.stringify({ contactId, adminReply }),
      });

      if (res.ok) {
        console.log('Successfully updated the contact form and replied');
      }

      setReplied(true);
    } catch (error) {
      console.log(error);
      console.log('Failed to go into the try block of the contactcard.js');
    }
  };

  return (
    <>
      <div className="bg-white p-6 rounded-md shadow-md mb-4">
        {!replied && (
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">{contact.userId}</h2>
              <p className="text-gray-600">{`${contact.firstname} ${contact.lastname}`}</p>
            </div>
            <p className="mt-4">{contact.message}</p>
          </div>
        )}
        {!replied && (
          <>
            <div className="mt-4">
              <textarea
                className="w-full h-20 p-2 border border-gray-300 rounded-md"
                placeholder="Type your reply here..."
                value={reply}
                onChange={handleReplyChange}
              ></textarea>
            </div>
            <div className="mt-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md"
                onClick={() => handleReplySubmit(contact.contactId, reply)}
              >
                Send Reply
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ContactCard;