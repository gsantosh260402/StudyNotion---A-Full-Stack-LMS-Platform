import React, { useState } from "react";
import signupImage from "../assets/Logo/signup.png";
import Frame from "../assets/Logo/frame.png";
import HighlightText from "../components/core/HomePage/HighlightText";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const SignUp = () => {
  const [accountType, setAccountType] = useState("student");

  const [showPassword, setShowPassword] = useState(false);

  const [signupFormData, setSignupFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  function changeHandler(event) {
    const { name, value } = event.target;
    setSignupFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(signupFormData);
  }

  return (
    <div>
      
      <div className="w-11/12 max-w-maxContent flex flex-row  mt-20 mb-10 justify-between mx-auto">
        <div className="w-[45%] py-4 px-4 flex flex-col gap-4">
          <h1 className="text-3xl text-white">
            Join the millions learning to code with StudyNotion for free
          </h1>
          <p className="text-richblack-200">
            Build skills for today, tomorrow, and beyond.{" "}
            <HighlightText text={"Education to future-proof your career."} />
          </p>
          <div className="bg-richblack-800 w-fit py-1 px-1 flex flex-row gap-4 rounded-full mt-4">
            <button
              className={
                accountType === "student"
                  ? "bg-richblack-900 text-richblack-5 rounded-full py-2 px-5"
                  : "bg-transparent text-richblack-200 py-2 px-5 rounded-full"
              }
              onClick={() => setAccountType("student")}
            >
              Student
            </button>
            <button
              className={
                accountType === "instructor"
                  ? "bg-richblack-900 text-richblack-5 rounded-full py-2 px-5"
                  : "bg-transparent text-richblack-200 py-2 px-5 rounded-full"
              }
              onClick={() => setAccountType("instructor")}
            >
              Instructor
            </button>
          </div>

          <form className="flex flex-col gap-4">
            <div className="w-[100%] flex gap-4">
              <div className="mt-2 w-[50%]">
                <label>
                  <p className="text-richblack-25 text-[12px]  mb-1">
                    First Name <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    name="firstName"
                    onChange={changeHandler}
                    className="bg-richblack-800 py-2 px-2 rounded-md w-[100%] text-[12px] border-b-[2px] border-richblack-400 text-richblack-400 outline-none focus:outline-none"
                  />
                </label>
              </div>

              <div className="mt-2 w-[50%]">
                <label>
                  <p className="text-richblack-25 text-[12px]  mb-1">
                    Last Name <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter last Name"
                    name="lastName"
                    onChange={changeHandler}
                    className="bg-richblack-800 py-2 px-2 rounded-md w-[100%] text-[12px] border-b-[2px] border-richblack-400 text-richblack-400 outline-none focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <div className="mt-2">
              <label>
                <p className="text-richblack-25 text-[12px]  mb-1">
                  Email Address <sup className="text-pink-200">*</sup>
                </p>
                <input
                  type="text"
                  placeholder="Enter email address"
                  name="email"
                  onChange={changeHandler}
                  className="bg-richblack-800 py-2 px-2 rounded-md w-[100%] text-[12px] border-b-[2px] border-richblack-400 text-richblack-400 outline-none focus:outline-none"
                />
              </label>
            </div>

            <div>
              <label>
                <p className="text-richblack-25 text-[12px]  mb-1">
                  Phone Number <sup className="text-pink-200">*</sup>
                </p>

                <div className="w-[100%] flex gap-2">
                  <div className="relative w-[10%]">
                    <select
                      className="bg-richblack-800 py-2 px-2 rounded-md text-[12px]
                                                            border-b-[2px] border-richblack-400 text-richblack-400
                                                            outline-none focus:outline-none focus:ring-0
                                                            appearance-none cursor-pointer w-full"
                    >
                      <option value="+91">+91</option>
                      <option value="+256">+256</option>
                    </select>

                    {/* Dropdown arrow */}
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-richblack-200 text-[10px]">
                       <IoIosArrowDown/>
                    </span>
                  </div>

                  <input
                    type="tel"
                    placeholder="Enter Ph no."
                    name="phoneNumber"
                    onChange={changeHandler}
                    className="bg-richblack-800 py-2 px-2 rounded-md w-[90%] text-[12px] border-b-[2px] border-richblack-400 text-richblack-400 outline-none focus:outline-none"
                  />
                </div>
              </label>
            </div>

            <div className="w-[100%] flex gap-4">
              <div className="relative mt-2 w-[50%]">
                <label>
                  <div
                    className="absolute top-[55%] right-4"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <IoMdEyeOff className="text-richblack-200" />
                    ) : (
                      <IoMdEye className="text-richblack-200" />
                    )}
                  </div>
                  <p className="text-richblack-25 text-[12px] mb-1 ">
                    {" "}
                    Create Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter Password"
                    name="password"
                    onChange={changeHandler}
                    className="bg-richblack-800 py-2 px-2 rounded-md w-[100%] text-[12px] border-b-[2px] border-richblack-400 text-richblack-400 outline-none focus:outline-none"
                  />
                </label>
              </div>

              <div className="relative mt-2 w-[50%]">
                <label>
                  <div
                    className="absolute top-[55%] right-4"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <IoMdEyeOff className="text-richblack-200" />
                    ) : (
                      <IoMdEye className="text-richblack-200" />
                    )}
                  </div>
                  <p className="text-richblack-25 text-[12px] mb-1 ">
                    Confirm Password <sup className="text-pink-200">*</sup>
                  </p>
                  <input
                    type="text"
                    placeholder="Enter Password"
                    name="confirmPassword"
                    onChange={changeHandler}
                    className="bg-richblack-800 py-2 px-2 rounded-md w-[100%] text-[12px] border-b-[2px] border-richblack-400 text-richblack-400 outline-none focus:outline-none"
                  />
                </label>
              </div>
            </div>

            <button
              className="bg-yellow-50 w-[100%] py-2 px-2 mt-4 rounded-md"
              type="submit"
            >
              Create Account
            </button>
          </form>
        </div>
        <div className="w-[40%] relative">
          <img src={signupImage} className="relative z-20 object-contain" />
          <img src={Frame} className="absolute z-10 top-4 left-4" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
