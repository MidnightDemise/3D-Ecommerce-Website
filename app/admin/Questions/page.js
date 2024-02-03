'use client'


import ContactCard from '@/components/ContactCard';
import Navbar from '@/components/Navbar'
import React, { useEffect, useState } from 'react'


const getContact = async () => {
    try {
        const res = await fetch("http://localhost:3000/api/contact", {cache: 'no-store'});

        if(res.ok) { console.log( "Successfully fetched all the contact forms to reply to in the page.js Admin questions" );}

        return res.json();
    } catch (error) {
            console.log(error);
            console.log(error.message);
    }
}


const contactPageAdmin = () => {
    const [loading , setLoading] = useState(true);
    const [contacts , setContacts] = useState([]);

    useEffect(() => {
        const fetchContact = async () => {
            const contact = await getContact();
            console.log(contact);
            setContacts(contact.contacts);
            setLoading(false);
        }

        fetchContact();


    }, [])
  return (
    <div>
        <Navbar /> 
        {!loading && contacts.map(contact => ( 
            <div key={contact._id}> 
            <ContactCard contact={contact} />
        </div>
        ))}
        
        
        </div>
  )
}

export default contactPageAdmin
