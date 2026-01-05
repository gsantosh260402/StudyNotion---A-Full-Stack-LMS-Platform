import React from 'react';
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timeLineImage from "../../../assets/Images/TimelineImage.png";
const timeLine = [
    {
        Logo : Logo1,
        heading: "Leadership",
        Description : "Fully committed to the success company"
    },

    {
        Logo : Logo2,
        heading: "Responsibility",
        Description : "Students will always be our top priority"
    },

    {
        Logo : Logo3,
        heading: "Flexibility",
        Description : "The ability to switch is an important skills"
    },

    {
        Logo : Logo4,
        heading: "Solve the problem",
        Description : "Code your way to a solution"
    },
]
const TimelineSection = () => {
   return (
    <div>
        <div className="flex lg:flex-row flex-col gap-8 items-start">
            <div className="lg:w-[50%] flex flex-col gap-5 ">
              {
                  timeLine.map((element , index)=>{
                      return (
                        <div className='flex flex-col relative' key={index}>
                            <div className="flex flex-row gap-8">
                                <div className="w-[51px]  flex items-center justify-center bg-white rounded-full shadow-richblack-100 shadow-md ">
                                    <img src={element.Logo} />
                                </div>
                                
                                <div>
                                    <h2 className="font-semibold text-[18px] ">{element.heading}</h2>
                                    <p className="text-base">{element.Description}</p>

                                </div>
                            </div>
                            {index!==timeLine.length -1 && (
                            
                                <div className='mx-7  font-semibold flex flex-col mt-3 text-richblue-50'>
                                    <span className="m-0 w-[10px] h-[10px] rotate-90 ">-</span>
                                    <span className="m-0 w-[10px] h-[10px] rotate-90">-</span>
                                    <span className="m-0 w-[10px] h-[10px] rotate-90 ">-</span>
                                    <span className="m-0 w-[10px] h-[10px] rotate-90 ">-</span>
                                    <span className="m-0 w-[10px] h-[10px] rotate-90 ">-</span>
                                    <span className="m-0 w-[10px] h-[10px] rotate-90 ">-</span>
                                </div>
                            )}
                            
                        </div>
                        
                      )
                  })      
              }
            </div>

            <div className="relative shadow-blue-200 ">
             <div className="absolute h-[50%] w-[100%] top-0 left-0 rounded-full filter blur-[50px] z-0 translate-y-[50%] bg-blue-100" ></div>
             <img src={timeLineImage} className="shadow-white object-cover h-fit relative z-10"/>
             <div className=" bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 absolute left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] max-sm:hidden justify-around z-20">
                <div className=" w-[50%] flex flex-row gap-4 items-center border-r border-caribbeangreen-300 pl-3">
                    <p className="text-2xl font-bold">10</p>
                    <p className="text-caribbeangreen-300 text-sm">Years of Experience</p>
                </div>
                <div className="flex flex-row gap-4 items-center w-[50%] pl-3 ">
                    <p className="text-2xl font-bold">250</p>
                    <p className="text-caribbeangreen-300 text-sm">Types of Courses</p>
                </div>
             </div>
            </div>
        </div>
    </div>
   )
}
export default TimelineSection;