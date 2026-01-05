import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import IconBtn from '../../common/IconBtn';

const VideoDetailsSidebar = ({setReviewModal}) => {

    const [activeStatus , setActiveStatus] = useState("");
    const [videoBarActive , setVideoBarActive] = useState("");
    const [videobarActive , setVideobarActive] = useState("");
    const navigate = useNavigate();
    const {sectionId , subSectionId} = useParams();
    const {
        courseSectionData , 
        courseEntireData ,
        totalNoOfLectures,
        completedLectures, 

    } = useSelector((state)=>state.viewCourse);
    
    const location = useLocation();
    useEffect(()=>{
        ;(()=>{
            if(!courseSectionData.length){
                return;
            }
            const currentSectionIndex = courseSectionData.findIndex((data)=>(data._id === sectionId));
            const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)
            const activeSubSectionId = courseSectionData[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;
            
            //set currentSection
            setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
            
            //set current SubSection
            setVideoBarActive(activeSubSectionId);

        })()
    } , [courseSectionData , courseEntireData , location.pathname])
    return (
        <>
           <div>
              <div>
                  <div>
                      <div onClick={()=>{navigate("/dashboard/enrolled-courses")}}>
                        Back
                      </div>

                      <div>
                         <IconBtn
                            text="Add Review"
                            onclick={()=> setReviewModal(true)}
                         />
                      </div>
                  </div>
                  <div>
                     <p>{courseEntireData?.courseName}</p>
                     <p>{completedLectures.length} / {totalNoOfLectures}</p>
                  </div>
              </div>
              
              <div>
                 {
                    courseSectionData.map((section , index)=>(
                        <div 
                        onClick={()=>setActiveStatus(section?._id)}
                        key={index}
                        >
                            
                            <div>
                                <div>{section?.sectionName}</div>
                                {/* <div> Arrow</div> */}
                            </div>
                            <div>
                                {
                                    activeStatus === section?._id && (
                                        <div>
                                            {
                                                section.subSection.map((topic , index)=>(
                                                     <div 
                                                        className={`flex gap-3 p-4 ${videoBarActive === topic._id ? "bg-yellow-200 text-richblack-900 " : "bg-richblack-900 text-white"}`}
                                                        key={index}
                                                        onClick={()=>{
                                                            navigate(`/view-course/${courseEntireData?._id}/section/${section._id}/sub-section/${topic?._id}`)
                                                            setVideoBarActive(topic?._id)
                                                        }}

                                                     >
                                                        <input
                                                           type='checkbox'
                                                           checked= {completedLectures.includes(topic?._id)}
                                                           onChange={()=>{}}  
                                                        />
                                                        <span>
                                                            {topic.title}
                                                        </span>
                                                     </div>
                                                ))
                                            }
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    ))
                 }
              </div>
           </div>
        </>

    )
}

export default VideoDetailsSidebar;