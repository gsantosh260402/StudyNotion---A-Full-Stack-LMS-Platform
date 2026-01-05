import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';

const Catalog = () => {

    const {catalogName} = useParams();
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");
    const [activeTab , setActiveTab] = useState("Most Popular");

    //Fetch all categories
    useEffect(()=>{
        const getTopCoursesList = () => {

        }
    })
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogPageData(categoryId);
                console.log("PRinting res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {
            getCategoryDetails();
        }
        
    },[categoryId]);


  return (
    <div className='text-white w-11/12 max-w-maxContent mx-auto'>

        <div>
            <p>{`Home / Catalog /`}
            <span>
                {catalogPageData?.data?.selectedCategory?.name}
            </span></p>
            <p> {catalogPageData?.data?.selectedCategory?.name} </p>
            <p> {catalogPageData?.data?.selectedCategory?.description}</p>
        </div>

        <div>
            {/* section1 */}
            <div>
            <div >Courses to get you started</div>
                <div className=' flex gap-x-3  border-b-4 border-richblack-50 relative pb-4'>
                    <div className={`${activeTab === 'Most Popular' ? " border-b-4 border-yellow-25  -mb-5 rounded-sm " : ""} cursor-pointer hover:text-richblack-50 transition-colors duration-200`}
                    onClick={() => setActiveTab("Most Popular")}>Most Popular</div>
                    <div className={`${activeTab === 'New' ? "border-b-4 border-yellow-25  -mb-5 rounded-sm " : ""}  cursor-pointer   hover:text-richblack-50 transition-colors duration-200`} onClick={() => setActiveTab("New")}>New</div>
                </div>
                <div className="mt-10">
                    <CourseSlider Courses={catalogPageData?.data?.selectedCategory?.courses} />
                </div>
            </div>  

            {/* section2 */}
            <div>
            <div>Top Courses in {catalogPageData?.data?.selectedCategory?.name}</div>
                <div>
                    <CourseSlider Courses={catalogPageData?.data?.differentCategory?.courses}/>
                </div>
            </div>

            {/* section3 */}
            <div>
                <div>Frequently Bought</div>
                <div className='py-8'>

                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>

                        {
                            catalogPageData?.data?.mostSellingCourses?.slice(0,4)
                            .map((course, index) => (
                                <Course_Card course={course} key={index} Height={"h-[300px]"}/>
                            ))
                        }

                    </div>

                </div>
            </div>

        </div>
    <Footer />
    </div>
  )
}

export default Catalog