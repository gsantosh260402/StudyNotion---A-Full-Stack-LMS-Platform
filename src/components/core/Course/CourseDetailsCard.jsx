import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import copy from 'copy-to-clipboard'
import toast from 'react-hot-toast';
import { addToCart } from '../../../slices/cartSlice';
import {ACCOUNT_TYPE} from '../../../utils/constants'
function CourseDetailsCard({course , setConfirmationModal , handleBuyCourse}){
    const {user} = useSelector((state)=>state.profile);
    const {token} = useSelector((state)=>state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {
        thumbNail : ThumbnailImage , 
        price : CurrentPrice
    } = course;

    const handleAddToCart = ()=>{
         if(user && user?.accountType == ACCOUNT_TYPE.INSTRUCTOR){
              toast.error("You are an instructor")
              return;
         }

         if(token){
            dispatch(addToCart(course));
            return;
         }

         setConfirmationModal({
            text1: "you are not Logged in" , 
            text2: "please login to purchase the course",
            btn1Text: "Login",
            btn2Text: "Cancel",
            btn1Handler: ()=>navigate("/login"),
            btn2Handler: setConfirmationModal(null)
        })
    }

    const handleShare = () =>{
          copy(window.location.href);
          toast.success("Link copied to clipboard");
    }

     return (
        <div>
           <img 
              src={ThumbnailImage}
              className="max-h-[300px] min-h-[180px] w-[400px] rounded-xl"
           />
           <div>
              Rs. {CurrentPrice}
           </div>
           <div className="flex flex-col gap-y-6">
               <button className="bg-yellow-50"
                  onClick={
                    user && course?.studentsEnrolled.includes(user?._id) ? ()=> navigate("/dashboard/enrolled-courses")
                    : handleBuyCourse
                  }
               >
                   {
                      user && course?.studentsEnrolled.includes(user?._id) ? "Go to Course" : "Buy Now"
                   }
               </button>

               {
                  (!course?.studentsEnrolled.includes(user?._id)) && (
                      <button onClick={handleAddToCart}
                           className="text-richblack-900 bg-yellow-50"
                      >
                        Add to Cart
                      </button>
                  )
               }
           </div>

           <div>

              <p>30-Day Money-Back Guarantee</p>
              <p>This Course Includes : </p>
              <div className="flex flex-col gap-y-3">
                {
                    course?.instructions?.map((item , index)=>(
                        <p key={index} className="flex gap-2">
                            <span>
                                {item}
                            </span>
                        </p>
                    ))
                }
              </div>
           </div>

           <div>
              <button onClick={handleShare}>Share</button>
           </div>

           
        </div>
     )
}

export default CourseDetailsCard;

