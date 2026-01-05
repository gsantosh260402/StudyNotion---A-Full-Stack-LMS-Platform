import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { buyCourse } from '../services/operations/studentFeaturesAPI';
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI';
import Error from './Error';
import ConfirmationModal from '../components/common/ConfirmationModal';
import RatingStars from '../components/common/RatingStars';
import GetAvgRating from '../utils/avgRating';
import { formatDate } from '../services/formatDate';
                import { MdOutlineLanguage } from "react-icons/md"; 
import CourseDetailsCard from '../components/core/Course/CourseDetailsCard';
const CourseDetails = () => {

    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {courseId}  = useParams();
    const {loading} = useSelector((state)=>state.profile);
    const {paymentLoading} = useSelector((state)=>state.course);
    const [courseData , setCourseData] = useState(null);
    const [confirmationModal , setConfirmationModal] = useState(null);

    useEffect(()=>{
        const getCourseFullDetails = async() => {
            try{

              const result = await fetchCourseDetails(courseId);
              console.log("Course Data ..." , result);
              setCourseData(result);


            }
            catch(error){
               console.log("Could Not Fetch course details")
            }

        }
        
        getCourseFullDetails();
        

    } , [courseId])

    const [avgReviewCount , setAvgReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(courseData?.data?.courseDetails.ratingAndReviews);
        setAvgReviewCount(count);

    } , [courseData])

    const [totalNoOfLectures , setTotalNoOfLectures] = useState(0);
    useEffect(()=>{
         let lectures = 0;
         courseData?.data?.courseDetails?.courseContent?.forEach((sec)=>{
            lectures += sec.subSection.length || 0;
         })
         setTotalNoOfLectures(lectures); 
    } , [courseData]);


    const [isActive , setIsActive] = useState([]);

    const handleActive = (id) =>{
        setIsActive(
            !isActive.includes(id) ? isActive.concat(id) : isActive.filter((e)=> e!=id)
        )
    }
    
    const handleBuyCourse = () => {
        
        if(token) {
            buyCourse(token, [courseId], user, navigate, dispatch);
            return;
        }

        
    }

    if(loading || !courseData){
        return (
            <div>
                Loading ...
            </div>
        )
    }

    if(!courseData.success){
        return (
            <div>
                <Error/>
            </div>
        )
    }


    


  const {
    _id:course_id , 
     courseName,
     courseDescription,
     thumbNail,
     price,
     whatYouWillLearn,
     courseContent,
     ratingAndReviews,
     instructor,
     studentsEnrolled,
     createdAt,
  } = courseData.data?.courseDetails;
  return (
    <div className='flex flex-col  text-white'>

        <div className="relative flex flex-col justify-start">
            <p>{courseName}</p>
            <p>{courseDescription}</p>
            <div>

                <span>{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
                <span>{`(${ratingAndReviews.length} reviews)`}</span>
                <span>{`(${studentsEnrolled.length} student enrolled)`}</span>
                
            </div>
            
            <div>
                <p>Created By {`${instructor.firstName}`}</p>

            </div>

            <div className="flex gap-x-3">
                <p>
                    Created At {formatDate(createdAt)}
                </p>
                <p>
                <MdOutlineLanguage /> English
                </p>
            </div>
        </div>
        {/* <img src={thumbNail}/> */}

        <div>
           <CourseDetailsCard 
              course = {courseData?.data?.courseDetails}
              setConfirmationModal = {setConfirmationModal}
              handleBuyCourse = {handleBuyCourse}
           />
        </div>

        <div>
            <p>What You Will Learn</p>
            <div>
                {whatYouWillLearn}
            </div>
        </div>

        <div>
            <div>
                <p>Course Content</p>
            </div>
            <div className="flex gap-x-3 justify-between">
                <div>
                    <span>{courseContent.length} section(s)</span>
                    <span>{totalNoOfLectures} lectures</span>
                    <span>{courseData.data?.totalDuration} total length</span>
                </div>

                <div>
                    <button onClick={()=>setIsActive([])}>
                        Collapse all Sections
                    </button>
                </div>
                
            </div>
        </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        
    </div>
  )
}

export default CourseDetails