import React, { useState } from 'react';
import {HomePageExplore} from "../../../data/homepage-explore"
import HighlightText from './HighlightText';
import CourseCard from './CourseCard';
const tabName = [
    "Free" , 
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const ExploreMore = () => {
    const [currentTab , setCurrentTab] = useState(tabName[0]);
    const [courses , setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard , setCurrentCard] = useState(HomePageExplore[0].courses[0].heading)

    const setMyCards = (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading)
    }

    return (
       <div>
          <div className="flex flex-col relative">
              <div className="text-3xl font-semibold md:text-center">
                Unlock the <HighlightText text={"Power of Code"}/>
              </div>
              <p className="md:text-center text-richblack-300 text-lg font-semibold mt-3 lg:mb-[10px] mb-[650px]">
                Learn to Build Anything You Can Imagine
              </p>
              
              <div className="flex-row items-center gap-2 bg-richblack-800 py-1 px-1 rounded-full lg:mb-[250px] mt-5  hidden lg:flex">
                {
                  tabName.map((element , index)=>{
                    return (
                         <div className={`text-[16px] px-3 py-1 flex flex-row gap-2
                             ${currentTab === element 
                                ? "bg-richblack-900 text-richblack-5 font-medium rounded-full" 
                                : "text-richblack-200"} transition-all duration-200 cursor-pointer hover:bg-richBlack-900 hover:text-richblack-5`} 
                                key={index} onClick={()=>setMyCards(element)}
                         >
                            {element}
                         </div>
                    )
                  })
                }
              </div>

              <div className=" flex lg:flex-row flex-col lg:items-center gap-10 absolute bottom-0  translate-y-[40%] max-md:left-0 max-md:translate-x-0 lg:translate-y-[80%] justify-between left-[50%] -translate-x-[50%]">
                 {
                    courses.map((element , index)=>{
                        return (
                            <div>
                              <CourseCard course={element} setCurrentCard={setCurrentCard} currentCard={currentCard} key={index}/>
                            </div>

                        )
                    })
                 }
              </div>
          </div>

       </div>
    )
}

export default ExploreMore