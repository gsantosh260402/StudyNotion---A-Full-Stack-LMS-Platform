import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
const ForgotPassword = () =>{

    const {loading} = useSelector((state)=>(state.auth));
    const [emailSent , setEmailSent] = useState(false);
    const [email , setEmail] = useState("");
    const dispatch = useDispatch();
    const handleOnSubmit = (e) => {
        e.preventDefault();
        dispatch(getPasswordResetToken(email , setEmailSent));
    }
    return (
        <div className="w-[100%] mt-[100px] ml-20">
            <div className=" flex flex-col justify-center items-center w-[30%] mx-auto">
               {
                  loading ? (
                       <div> Loading ... </div>
                  ) : (
                       <div>
                           <h1>
                            {
                                !emailSent ? "Reset Your Password" : "Check email"
                            }
                           </h1>
                           <p>
                              {
                                !emailSent 
                                ? 
                                "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" 
                                : 
                                `We have sent the reset email to ${email}`
                              }
                           </p>

                            <form onSubmit={handleOnSubmit}>
                               {
                                 !emailSent && (
                                    <label>
                                        <p>Email Address</p>
                                        <input required type='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter email address' />
                                    </label>
                                 )
                               }
                               <button >
                                  {
                                     !emailSent ? "Reset Password" : "Resend email"
                                  }
                               </button>
                            </form>
                           <div>
                               <Link to="/login">
                                   <p>Back to Login</p>
                               </Link>
                           </div>
                       </div>
                  )
               }
            </div>
        </div>
    )
}

export default ForgotPassword