import React, { useState } from 'react';
import Frame from '../assets/Logo/frame.png';
import loginImage from '../assets/Logo/login.png'
import HighlightText from '../components/core/HomePage/HighlightText';
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
const Login = () =>{

    const [loginFormData , setLoginFormData] = useState({ 
            email:"" , 
            password:""
    });

    const [accountType , setAccountType] = useState('student');
    
    function changeHandler(event){
        const {name , value} = event.target;
         setLoginFormData((prevState)=>({
             ...prevState , 
             [name] : value,

         }))
         console.log(loginFormData);
    }

    const [showPassword , setShowPassword] = useState(false);

    return (
        <div>
            
            <div className="w-11/12 max-w-maxContent flex flex-row  mt-20 mb-10 justify-between mx-auto">
            
                <div className="w-[40%] py-4 px-4 flex flex-col gap-4">
                    <h1 className="text-3xl text-white">Welcome back</h1>
                    <p className="text-richblack-200">Build skills for today, tomorrow, and beyond. <HighlightText text={"Education to future-proof your career."}/></p>
                    <div className="bg-richblack-800 w-fit py-1 px-1 flex flex-row gap-4 rounded-full mt-4">
                        <button
                        className={accountType ==="student" ? "bg-richblack-900 text-richblack-5 rounded-full py-2 px-5" : "bg-transparent text-richblack-200 py-2 px-5 rounded-full"}
                        onClick={()=>(setAccountType("student"))}>
                            Student
                        </button>
                        <button 
                        className={accountType ==="instructor" ? "bg-richblack-900 text-richblack-5 rounded-full py-2 px-5" : "bg-transparent text-richblack-200 py-2 px-5 rounded-full"}
                        onClick={()=>(setAccountType("instructor"))}>
                            Instructor
                        </button>
                    </div>

                    
                        <div className="mt-2">

                            <label >
                                <p className='text-richblack-25 text-[12px]  mb-1'>Email Address <sup className="text-pink-200">*</sup></p>
                                <input 
                                type="text"
                                placeholder='Enter email address'
                                name='email'
                                onChange={changeHandler}
                                className="bg-richblack-800 py-2 px-2 rounded-md w-[100%] text-[12px] border-b-[2px] border-richblack-400 text-richblack-400 outline-none focus:outline-none"
                                />
                            </label>
                        </div>

                        <div className="relative mt-2">

                            <label>
                                <div className="absolute top-[55%] right-4" onClick={()=>setShowPassword((prev)=>!prev)}>
                                    {
                                        showPassword ? <IoMdEyeOff className="text-richblack-200"/> : <IoMdEye className="text-richblack-200"/>
                                    }
                                </div>
                                <p className='text-richblack-25 text-[12px] mb-1 '>Password <sup className="text-pink-200">*</sup></p>
                                <input 
                                type="text"
                                placeholder='Enter Password'
                                name='password'
                                onChange={changeHandler}
                                className="bg-richblack-800 py-2 px-2 rounded-md w-[100%] text-[12px] border-b-[2px] border-richblack-400 text-richblack-400 outline-none focus:outline-none"
                                />
                            </label>
                        </div>
                        <p className='text-[12px] text-blue-300 flex justify-end -mt-3'>
                        Forgot Password
                        </p>

                        <button className="bg-yellow-50 w-[100%] py-2 px-2 mt-2 rounded-md" type="submit">
                            Sign in
                        </button>
                    

                    
                </div>
                <div className="w-[40%] relative">
                    <img src={loginImage} className="relative z-20"/>
                    <img src={Frame} className="absolute top-4 left-4 z-10"/>

                </div>
            
            </div>
        </div>
    )
}

export default Login;

