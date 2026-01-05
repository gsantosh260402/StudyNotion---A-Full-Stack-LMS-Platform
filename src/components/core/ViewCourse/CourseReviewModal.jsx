import React from 'react'
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux'

const CourseReviewModal = ({setReviewModal}) => {
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const {courseEntireData} = useSelector((state)=>state.viewCourse);
    const {
        register , 
        handleSubmit,
        setValue,
        formState : {errors},
    } = useForm();

    useEffect(()=>{
        setValue("courseExperience" , "");
        setValue("courseRating" , 0);
    } , [])
    const onSubmit = async () =>{
         await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience,
            },token
         );
         setReviewModal(false);
    }

    const ratingChanged = (newRating) => {
           setValue("courseRating" , newRating)
    }
    return (
        <div>
           <div>
               <div>
                   <p>Add Review</p>
                   <button 
                    onClick={()=>{setReviewModal(true)}}
                   >Close</button>
               </div>

               <div>
                   <img
                     src={user?.image}
                     alt='user Image'
                     className='aspect-square w-[50px] rounded-full object-cover'
                   />
                   <div>
                       <p>{user?.firstName} {user?.lastName}</p>
                       <p>Posting Publicly</p>
                   </div>
               </div>

               <form
                 onSubmit={handleSubmit(onSubmit)}
                 className="mt-6 flex flex-col items-center"
               >
                   <ReactStars
                      count={5}
                      onChange={ratingChanged}
                      size={24}
                      activeColor="#ffd700"
                   />
                   <div>
                      <label>Add Your Experience</label>
                      <textarea
                          id="courseExperience"
                          placeholder="Add Your Experience here"
                          {...register("courseExperience" , {required:true})}
                          className="form-style min-h-[130px] w-full"
                      />
                      {
                        errors.courseExperience && (
                         <span>
                            Please add your experience
                         </span>
                        )
                      }
                   </div>

                   <div>
                       <button onClick={()=>{setReviewModal(false)}}>
                           Cancel
                       </button>
                       <IconBtn
                           text="save"
                       />
                   </div>
               </form>
           </div>
        </div>
    )
}

export default CourseReviewModal;