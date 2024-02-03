'use client'

import ContactForm from '@/components/ContactForm';
import NavbarUser from '@/components/NavbarUser';
import { headers } from '@/next.config';
import React, { useEffect, useState } from 'react'

const getMessages = async () => {

    try {
        const res = await fetch("http://localhost:3000/api/messages", {cache: 'no-store'});
        
        if(res.ok) {console.log("Succesfully fetcthed the messages in Messages page.js");}

        return res.json();
    } catch (error) {
        
    }
}


const messagesPage = () => {
    const [messages , setMessages] = useState([]);
    const [ loading , setLoading ] = useState(true);

    useEffect(() => {

        const fetchMessages = async () => {
            const message = await getMessages();
            console.log(message);
            setLoading(false);
            setMessages(message);
        }   

        fetchMessages();
    },[])
  return (
    <div>
            <NavbarUser/>
            {!loading && messages.messages.map(contact => (
                <>
                <ContactForm key={contact._id} contact={contact} />
                </>
            ))}
        </div>
  )
}

export default messagesPage