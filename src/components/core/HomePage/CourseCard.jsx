import React from 'react'
import { FaUserGroup } from "react-icons/fa6";
import { RiGitForkFill } from "react-icons/ri";
const CourseCard = ({course , setCurrentCard , currentCard})=>{
    return (
       <div onClick={()=>setCurrentCard(course.heading)}>
          <div className={`flex flex-col ${course.heading === currentCard ? "bg-white " : "bg-richblack-700"}  lg:h-[250px] lg:w-[250px]  max-md:h-[250px] max-md:w-[250px] w-[500px] h-[250px] -translate-y-[50%] p-4 gap-3 justify-between transition-all duration-500 ease-in-out hover:cursor-pointer`}  
          style={
           course.heading === currentCard
           ? { boxShadow: "10px 10px  #FFE83D" }  // your custom shadow
           : {boxShadow: "2px 2px 4px #585D69"}
          } >
            <div className=" h-[85%] border-b-2 border-dashed border-richblack-500 ">
                <h1 className={`text-[18px] ${course.heading === currentCard ? "text-richblack-900" : "text-richblack-300"} font-semibold mb-[20px]`}>{course.heading}</h1>
                <p className={`text-[12px] ${course.heading === currentCard ? "text-richblack-900" : "text-richblack-300"}`}>{course.description}</p>
            </div>
            <div>
                <div className={`flex flex-row justify-between  ${course.heading === currentCard ? "text-blue-200" : "text-richblack-100"} `}>
                    <div className="flex items-center gap-2">
                        <FaUserGroup className=" text-lg"/>
                        <div className="text-sm">{course.level}</div>
                    </div>
                    <div className="flex items-center gap-2">
                       <RiGitForkFill  className=" text-lg" />
                       <div className="text-sm">{course.lessionNumber}</div>
                    </div>
                </div>
            </div>
          </div>
       </div>
    )

}

export default CourseCard;