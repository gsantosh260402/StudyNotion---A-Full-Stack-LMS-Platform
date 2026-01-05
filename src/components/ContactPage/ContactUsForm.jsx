import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CountryCode from '../../data/countrycode.json'

const ContactUsForm = () => {
    const [loading , setLoading] = useState(false);
    const {
            register ,
            handleSubmit , 
            reset,
            formState : {errors , isSubmitSuccessful}
          } = useForm();

    const submitContactForm = async(data) => {
           console.log('Logging Data' , data);
           try{
                setLoading(true);
                //const response = await apiConnector("POST" , contactusEndpoint.CONTACT_US_API , data);
                const response = {status : "OK"}
                console.log('Logging response' , response);
                setLoading(false);
           }catch(error){
            console.log('Error' , error.message);
            setLoading(false);
           }
    }
    
    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                email : "",
                firstname : "",
                lastname : "",
                phoneNo : "",
                message : "",
            })
        }
    } , [isSubmitSuccessful , reset]);


    return (
        <form onSubmit={handleSubmit(submitContactForm)} className="text-black">
            <div className="flex gap-5">
                <div className="flex flex-col w-[50%] gap-2">
                    <label htmlFor='firstname' className="text-richblack-5">First Name</label>
                    <input 
                    type='text' 
                    name='firstname' 
                    id='firstname' 
                    placeholder='Enter first name' 
                    {...register("firstname" , {required:true})}
                    className="bg-richblack-800 py-1 px-2 text-richblack-25 h-[48px] rounded-md border-b-2 ring-richblack-600"
                    />
                        {
                            errors.firstname && (
                                <span>Please enter your name</span>
                            )
                        }
                </div>

                <div className="flex flex-col w-[50%] gap-2">
                    <label htmlFor='lastname' className="text-richblack-5">Last Name</label>
                    <input 
                    type='text' 
                    name='lastname' 
                    id='lasttname' 
                    placeholder='Enter last name' 
                    {...register("firstname" )}
                    className="bg-richblack-800 py-1 px-2 text-richblack-25 h-[48px] rounded-md border-b-2 ring-richblack-600"/>
                    
                </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <label htmlFor='email' className="text-richblack-5">Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter email address'
                    {...register('email' , {required:true})}
                    className="bg-richblack-800 py-1 px-2 text-richblack-25 h-[48px] rounded-md border-b-2 ring-richblack-600"
                />
                {
                    errors.email && (
                        <span>
                            please enter your email address
                        </span>
                    )
                }
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <label htmlFor='phonenumber' className="text-richblack-5">Phone Number</label>
                <div className="flex gap-7 flex-row ">

                    
                    <select name="dropdown" id="dropdown" {...register("countrycode" , {required:true})} className="w-[80px] bg-richblack-800 py-1 px-2 text-richblack-25 h-[48px] rounded-md border-b-2 ring-richblack-600">
                            {
                            CountryCode.map((element , index) => {
                                return (
                                    <option key={index} value={element.code}>{element.code} - {element.country}</option>
                                )
                            }) 
                            }
                    </select>
                       
                    <input type='tel' 
                    name='number' 
                    id='phonenumber' 
                    placeholder='12345 67890' 
                    {...register("phoneNo" , {required:true , maxLength:{value:10 , message:"Invalid phone number"} } )} 
                    className="bg-richblack-800 py-1 px-2 text-richblack-25 h-[48px] rounded-md border-b-2 ring-richblack-600 w-[100%]"/>
                    
                </div>
            </div>
            <div className="flex flex-col mt-4 gap-2">
                <label htmlFor="message" className="text-richblack-5">Message</label>
                <textarea
                   name='message'
                   id='message'
                   cols='30'
                   rows="7"
                   placeholder = 'Enter Your message here'
                   {...register("message" , {required:true})}
                   className="bg-richblack-800 py-1 px-2 text-richblack-25  rounded-md border-b-2 ring-richblack-600"

                />
                {
                    errors.message && (
                        <span>
                            Please enter your message.
                        </span>
                    )
                }
            </div>
            <button type='submit' className="rounded-md bg-yellow-25 text-center px-6 text-[16px]  text-black py-4 w-[100%] mt-8">
                 Send Message
            </button>
        </form>
    )
}

export default ContactUsForm;