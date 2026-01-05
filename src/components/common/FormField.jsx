import React, { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
const FormField = ({labelText ,  setFormData , inputName , requirements , setrequirements}) => {

    const [showPassword , setShowPassword] = useState(false);
    function changeHandler(event){
        const {name , value} = event.target;
        setFormData((prevState) => ({
            ...prevState , [name] : value
        }))

        if (name === "password") {
    const password = value;

      setrequirements(prev => ({
      ...prev,
      one_lower_char: /[a-z]/.test(password),
      one_upper_char: /[A-Z]/.test(password),
      one_number: /[0-9]/.test(password),
      one_special_char: /[^a-zA-Z0-9]/.test(password),
      min_length: password.length >= 8,
    }));
}
    }

    return (

        <div>
           <div className="mt-4">
              <label className="relative">
                  <p className="mb-2 text-richblack-100">{labelText} <sup className="text-pink-200"> *</sup></p>
                  <input 
                  type={showPassword ? "text" : "password"}
                  name={inputName}
                  onChange={changeHandler}
                  style={{
                     boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                  />

                  {
                    
                  }

                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                  >
                    {showPassword ? (
                        <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                    ) : (
                        <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                    )}
                </span>
                    
                
              </label>
           </div>
        </div>
    )
}

export default FormField;