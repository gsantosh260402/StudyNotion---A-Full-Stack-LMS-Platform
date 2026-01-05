import React from 'react'
import { IoIosChatbubbles } from "react-icons/io";
import { HiGlobeEuropeAfrica } from "react-icons/hi2";
import { MdOutlineCall } from "react-icons/md";
import ContactUsForm from '../components/ContactPage/ContactUsForm';

const contactPageData = [
    {
        id:1 , 
        feature: "Chat on us",
        description : "Our friendly team is here to help.",
        details : "gsantosh1234@gmail.com"
    },
    {
        id:2 , 
        feature: "Visit us",
        description : "Come and say hello at our office HQ.",
        details : "Here is the location/ address"
    },
    {
        id:3 , 
        feature: "Call us",
        description : "Mon - Fri From 8am to 5pm",
        details : "+123 456 7890"
    }
]
const ContactUs = () => {
    return (
        <div className="w-11/12 max-w-maxContent mx-auto mt-10">
            <div className="flex justify-between">
                <div className="bg-richblack-800 w-[35%] p-10 rounded-md h-[390px]">
                    {
                        contactPageData.map((element , index) => {
                            return (

                                <div className="mb-4">
                                    <div className="flex flex-row items-start gap-4 ">
                                        <div className="text-richblack-25">
                                        {
                                            element.feature === 'Chat on us' ? (<IoIosChatbubbles size={24} />) : (element.feature === "Visit us" ? (<HiGlobeEuropeAfrica size={24} />) : (<MdOutlineCall size={24} />))
                                        }
                                        </div>
                                        <div className="flex flex-col gap-[2px] leading-none">
                                            <div className="text-richblack-25 font-semibold text-xl">{element.feature}</div>
                                            <div className="text-richblack-200 text-sm">{element.description}</div>
                                            <div className="text-richblack-200 text-sm">{element.details}</div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="w-[55%] p-10 border-2 border-richblack-600 rounded-md">
                    <h1 className="text-3xl font-semibold w-[90%] text-richblack-5">Got a Idea? We’ve got the skills. Let’s team up</h1>
                    <p className="text-richblack-300 mt-[10px]">Tall us more about yourself and what you’re got in mind.</p>
                    <div className="mt-[20px]">
                       <ContactUsForm/>
                    </div>
                </div>
           </div>
        </div>
    )
}

export default ContactUs;