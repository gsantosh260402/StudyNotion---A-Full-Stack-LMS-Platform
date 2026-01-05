import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import FormField from '../components/common/FormField';
import { IoIosCheckmarkCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation } from 'react-router-dom';
import { resetPassword } from '../services/operations/authAPI';
const UpdatePassword = () => {
    
    const {loading} = useSelector((state) => (state.auth));
    
    const dispatch = useDispatch();
    
    const location = useLocation();
    
    const [formData , setFormData]  = useState({
        password : "" ,
        confirmPassword : ""
    })

    const [requirements , setrequirements] = useState({
         one_lower_char : false , 
         one_special_char : false,
         one_number : false , 
         min_length : false,
         one_upper_char : false
    })

    const allRequirementsMet =
    requirements.one_lower_char &&
    requirements.one_upper_char &&
    requirements.one_number &&
    requirements.one_special_char &&
    requirements.min_length;

    const {password , confirmPassword} = formData
    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        dispatch(resetPassword(password , confirmPassword , token))
    }
    
    return (
        <div className="mt-[80px] mx-auto mb-[40px]">
        {
            loading 
            ?(
                <div>
                    Loading ...
                </div>
            )
            :(
                <div className=" w-[400px] ">
                   <h1 className="font-semibold text-3xl text-richblack-5">Choose New Password</h1>
                   <p className="text-richblack-200">Almost done. Enter your new password and youre all set.</p>
                   
                   <form onSubmit={handleOnSubmit}>
                        <FormField labelText="New Password"  setFormData = {setFormData} inputName="password" requirements={requirements} setrequirements={setrequirements}/>
                        <FormField labelText="Confirm New Password"  setFormData = {setFormData} inputName="confirmPassword" requirements={null} setrequirements={null}/>
                        <ul className="w-full grid grid-cols-2 mt-4">
                            

                            <li className="flex gap-1 items-center">
                                {
                                  requirements.one_lower_char ? (<IoIosCheckmarkCircle className="text-caribbeangreen-300"/>) : (<IoIosCloseCircleOutline className="text-pink-200"/>)
                                }
                                <div className={`${!requirements.one_lower_char ? 'text-pink-200' : 'text-caribbeangreen-300'}`}>
                                    <p>one lowercase character</p>
                                </div>
                            </li>

                            <li className="flex gap-1 items-center">
                                {
                                  requirements.one_special_char ? (<IoIosCheckmarkCircle className="text-caribbeangreen-300"/>) : (<IoIosCloseCircleOutline className="text-pink-200"/>)
                                }
                                <div className={`${!requirements.one_special_char ? 'text-pink-200' : 'text-caribbeangreen-300'}`}>
                                    <p>one special character</p>
                                </div>
                            </li>

                            <li className="flex gap-1 items-center">
                                {
                                  requirements.one_upper_char ? (<IoIosCheckmarkCircle className="text-caribbeangreen-300"/>) : (<IoIosCloseCircleOutline className="text-pink-200"/>)
                                }
                                <div className={`${!requirements.one_upper_char ? 'text-pink-200' : 'text-caribbeangreen-300'}`}>
                                    <p>one uppercase character</p>
                                </div>
                            </li>

                            <li className="flex gap-1 items-center">
                                {
                                  requirements.min_length ? (<IoIosCheckmarkCircle className="text-caribbeangreen-300"/>) : (<IoIosCloseCircleOutline className="text-pink-200"/>)
                                }
                                <div className={`${!requirements.min_length ? 'text-pink-200' : 'text-caribbeangreen-300'}`}>
                                    <p>8 character minimum</p>
                                </div>
                            </li>

                            <li className="flex gap-1 items-center">
                                {
                                  requirements.one_number ? (<IoIosCheckmarkCircle className="text-caribbeangreen-300"/>) : (<IoIosCloseCircleOutline className="text-pink-200"/>)
                                }
                                <div className={`${!requirements.one_number ? 'text-pink-200' : 'text-caribbeangreen-300'}`}>
                                    <p>one number</p>
                                </div>
                            </li>

                        </ul>
                        <button
                            disabled={!allRequirementsMet}
                            className={`${allRequirementsMet ? "mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900 w-full transition-all duration-500 ease-out" : " w-full bg-richblack-700 cursor-not-allowed text-richblack-25 mt-6 rounded-[8px] py-[8px] px-[12px] font-medium transition-all duration-500 ease-out"}`}
                        >
                            Reset Password
                        </button>
                   </form>

                </div>
            )
        }
        </div>
    )
}

export default UpdatePassword;