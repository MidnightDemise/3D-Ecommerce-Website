'use client'

import NavbarUser from '@/components/NavbarUser'
import React, { useState } from 'react'

const ContactPage = () => {
    const [firstname , setFirstname] = useState('');
    const [lastname , setLastname ] = useState('');
    const [email , setEmail] = useState('');
    const [phone , setPhone ] = useState('');
    const [message , setMessage] = useState('');


    const handleSubmitForm = async (e) => {
        
        try {
            const res = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: {
                    "CONTENT_TYPE": "application/json",

                },
                body: JSON.stringify({ firstname , lastname , email , phone , message})
            })

            if(res.ok) console.log("Successfully posted");


        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div> <NavbarUser />
    <div className="flex justify-center items-center w-screen h-screen bg-white">
	<div className="container mx-auto my-4 px-4 lg:px-20">

		<div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
			<div className="flex">
				<h1 className="font-bold uppercase text-5xl">Send us a <br /> message</h1>
			</div>
			<div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
				<input onChange={(e) => setFirstname(e.target.value)} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="First Name*" />
				<input  onChange={(e) => setLastname(e.target.value)} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="Last Name*" />
				<input  onChange={(e) => setEmail(e.target.value)} className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" placeholder="Email*" />
				<input className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
            type="text" onChange={(e) => setPhone(e.target.value)} placeholder="Phone*" />
        </div>
				<div className="my-4">
					<textarea onChange={(e) => setMessage(e.target.value)} placeholder="Message*" className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"></textarea>
				</div>
				<div className="my-2 w-1/2 lg:w-1/4">
					<button onClick={handleSubmitForm} className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                      focus:outline-none focus:shadow-outline">
            Send Message
          </button>
				</div>
			</div>

			<div
				className="w-full lg:-mt-96 lg:w-2/6 px-8 py-12 ml-auto bg-blue-900 rounded-2xl">
				<div className="flex flex-col text-white">
					<h1 className="font-bold uppercase text-4xl my-4">Drop in our office</h1>
					<p className="text-gray-400">Thank you for your interest! If you have any questions or inquiries, feel free to reach out to us.
					</p>

					<div className="flex my-4 w-2/3 lg:w-1/2">
						<div className="flex flex-col">
							<i className="fas fa-map-marker-alt pt-2 pr-2" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl">Main Office</h2>
              <p className="text-gray-400">TownShip Lahore 5555</p>
            </div>
          </div>
          
          <div className="flex my-4 w-2/3 lg:w-1/2">
            <div className="flex flex-col">
              <i className="fas fa-phone-alt pt-2 pr-2" />
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl">Call Us</h2>
              <p className="text-gray-400">Tel: 0317-5344204</p>
              <p className="text-gray-400">Fax: ...-...-...</p>
            </div>
          </div>
          
          
        </div>
      </div>
    </div>
</div>
    
    
    </div>
  )
}

export default ContactPage