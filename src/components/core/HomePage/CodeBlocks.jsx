import React from 'react'
import CTAButton from './CTAButton';
import HighlightText from './HighlightText';
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from 'react-type-animation'

const CodeBlocks = ({position , heading , subheading , ctabtn1 , ctabtn2 , codeblock , backgroundGradient , codeColor})=>{
   return (
       <div className={`flex ${position} my-14 lg:justify-between gap-[60px] w-[100%] relative flex-col  md:items-center  transition-all duration-700 ease-in-out`}>
            <div className="lg:w-[50%] flex flex-col lg:gap-11 max-md:w-[100%] w-[90%] ">
                <div className="text-2xl md:max-lg:text-center">{heading}</div>
                
                <div className="text-richblack-300 font-bold md:max-lg:text-center">
                    {subheading}
                </div>

                <div className="flex gap-7 mt-7 md:max-lg:justify-center">
                     <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>

                     </CTAButton>

                     <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn2.btnText}
                        </div>
                     </CTAButton>
                </div>
               
            </div>
             
             {/* Section 2 */}

             {/* HW - BG Gradient */}

            

            <div className="h-fit flex flex-row text-[10px] lg:w-[50%] relative py-4  border-[1px]  border-richblack-800 z-10 md:max-lg:w-[80%] md:w-[80%]"
                 style = {{boxShadow : "1px 1px 5px 1px rgba(111,111,111,0.23)"}}              
            >
            <div className={`absolute h-[300px] w-[350px] rounded-full left-2 -top-4  ${backgroundGradient} filter blur-[70px] opacity-20` }>
    
                </div>
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold leading-[22px] text-[15px]">
                   <p>1</p>
                   <p>2</p>
                   <p>3</p>
                   <p>4</p>
                   <p>5</p>
                   <p>6</p>
                   <p>7</p>
                   <p>8</p>
                   <p>9</p>
                   <p>10</p>
                   <p>11</p>
                </div>

                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 leading-[22px] text-[12px] lg:text-[15px] md:max-lg:text-[15px]`}>
                    <TypeAnimation
                        sequence = {[codeblock , 2000 , " "]}
                        repeat={Infinity}
                        style = {
                            {
                             whiteSpace:"pre-line" , 
                            }
                        }
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>
       </div>
   )
}

export default CodeBlocks;