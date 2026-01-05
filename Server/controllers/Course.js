const Category = require('../models/Category');
const Course = require('../models/Course');
const Section = require('../models/Section');
const SubSection = require('../models/SubSection');
//const Tag = require('../models/Tag');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
const { convertSecondsToDuration } = require('../utils/secToDuration');
const CourseProgress = require("../models/CourseProgress")
// create course

exports.createCourse = async(req , res)=>{
    try{
        //fetch data
         let {courseName , courseDescription , whatYouWillLearn , price , tag , category , status , instructions} = req.body;
         
         const thumbnail = req.files.thumbnailImage;

         //validation

         if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !category){
            return res.status(400).json({
                success : false , 
                message : 'All fields are required'
            })
         }

         if (!status || status === undefined) {
			status = "Draft";
		}

         //check for instructor
         const userId = req.user.id;
         const instructorDetails = await User.findById(userId);

         //TODO: verify that userId and InstructorDetails._id are same or different

         console.log("Instructor Details " , instructorDetails);
         if(!instructorDetails){
            return res.status(400).json({
                success : false , 
                message : 'Instructor details not found',
            })
         }


         // check given tag is valid or not

         const categoryDetails = await Category.findById(category);

         if(!categoryDetails){

            return res.status(400).json({
                success : false , 
                message : 'Category details not found',
            })
         }

         // upload Image to clodinary.

         const thumbnailImage = await uploadImageToCloudinary(thumbnail , process.env.FOLDER_NAME)

         // create an entry for new course

         const newCourse = await Course.create({
              courseName , 
              courseDescription , 
              instructor : instructorDetails._id,
              whatYouWillLearn : whatYouWillLearn,
              price,
              tag : JSON.parse(tag),
              thumbNail : thumbnailImage.secure_url,
              category: categoryDetails._id,
              status: status,
			        instructions: JSON.parse(instructions),
              
        

         })

         // add the new course to the user schema of instructor

         await User.findByIdAndUpdate(
            {_id : instructorDetails._id},
            {
                $push : {
                    courses : newCourse._id,
                }
            },
            {new : true},
         )

         // update Category Schema
         await Category.findByIdAndUpdate(
            {_id : category},
            {
                $push : {
                    courses : newCourse._id,
                }
            },
            {new : true},
         )

         return res.status(200).json({
            success : true , 
            message : "Course Created Successfully",
            data : newCourse
         })

    }catch(error){
        console.error(error);
        return res.status(500).json({
            success : false , 
            message : "Failed to create Course",
            error : error.message,
        })
        
    }
}





exports.getAllCourses = async(req , res)=>{
    try{

        const allCourses = await Course.find({ status : "Published" }, 
                                                {courseName : true , 
                                                  price : true , 
                                                  thumbnail : true ,
                                                  instructor : true , 
                                                  ratingAndReviews:true,
                                                  studentsEnrolled:true
                                                })
                                                .populate('instructor')
                                                .exec();
        return res.status(200).json({
            success : true , 
            message : 'Data for all courses fetched successfully',
            data : allCourses
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false , 
            message : 'Cannot Fetch  course data',
            error : error.message
        })
    }
}

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
          select: "-videoUrl",
        },
      })
      .exec()

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}




exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
exports.deleteCourse = async(req , res) => {
    try{
        const {courseId} = req.body;
        const instructorId = req.user.id;

        const course = await Course.findById(courseId);
        // unenroll students from the course

        const studentsEnrolled = course.studentsEnrolled;

        for(const studentId of studentsEnrolled){
            await User.findByIdAndUpdate(studentId , {
                $pull : {
                    courses : courseId
                },
            })
        }

        // Delete sections and sub-section

        const courseSections = course.courseContent;

        for(const sectionId of courseSections){
            const section = await Section.findById(sectionId);
            if(section){
                 const subSections = section.subSection
                 for(const subSectionId of subSections){
                    await SubSection.findByIdAndDelete(subSectionId)
                 }
            }

            // Delete the section;

            await Section.findByIdAndDelete(sectionId);
        }
        await User.findByIdAndUpdate(instructorId ,  
            {$pull: {
				courses: courseId,
			}}
        )

        await Course.findByIdAndDelete(courseId);

        res.status(200).json({
			success:true,
			message:"Course deleted",
		});

    } catch(error){

        console.error("Error deleting section:", error);
		res.status(500).json({
			success: false,
			message: "Internal server error",
		});

    }
}

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbNail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
        //updates.hasOwnProperty(key)
      if (Object.prototype.hasOwnProperty.call(updates, key)) {
        if (key === "tag" || key === "instructions") {
          course[key] = JSON.parse(updates[key])
        } else {
          course[key] = updates[key]
        }
      }
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}


