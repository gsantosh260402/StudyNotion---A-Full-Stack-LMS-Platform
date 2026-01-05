import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText';
import CTAButton from './CTAButton';
import { FaArrowRight } from 'react-icons/fa';
const InstructorSection = ()=>{
   return (
     <div>
        <div className="flex lg:flex-row flex-col lg:items-center justify-between gap-5" >
            <div className="lg:w-[45%] relative ">
                 <div className="relative z-10" >
                    <img src={Instructor} style={{boxShadow:"10px 10px rgb(255,255,255)"}}/>
                 </div>
            </div>
            <div className="lg:w-[45%] flex flex-col">
                <div className=' flex lg:flex-col gap-2 text-3xl font-semibold my-2'>
                    <div>Become an</div>
                    <HighlightText text={"Instructor"}/>
                </div>
                <p className="font-medium text-[16px] w-[90%] text-richblack-300 mt-2">Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.</p>
                
                <div className="mt-12 w-fit">
                    <CTAButton active={true} >
                        <div className='flex gap-2 items-center'>
                            Start Teaching Today
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
     </div>
   )
}

export default InstructorSection;