const Course = require('../models/Course');
const Profile = require('../models/Profile');
const User = require('../models/User');
const {uploadImageToCloudinary} = require('../utils/imageUploader');
exports.updateProfile = async(req , res)=>{
    try{

        const {gender , dateOfBirth , contactNumber , about } = req.body;
        
        // get user Id
        const id = req.user.id;

        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success : false , 
                message : 'All fields are required'
            })
        }

        const userDetails = await User.findById(id);

        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId);
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.gender  = gender;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        await profileDetails.save();

        profileDetails.userId = id;

        return res.status(200).json({
            success : true , 
            message : 'Profile Updated Succesfully',
            profileDetails,
            userId : id
        })
        
    }catch(error){

        return res.status(400).json({
            success : false , 
            message : error.message
        })
    }
}

exports.deleteAccount = async(req , res)=>{
    try{

          const id = req.user.id;
          const accountType = req.user.accountType;

          if(accountType === "Instructor" || accountType === "Admin"){
            return res.status(400).json({
                status : false , 
                message : "Only Students can delete their account"
            })
          }
          const userDetails = await User.findById(id);
          if(!userDetails){
            return res.status(404).json({
                success : false , 
                message : 'User not found'
            })
          }

          await Profile.findByIdAndDelete({_id : userDetails.additionalDetails});

          //TODO : Unenroll user from all enrolled courses

          await Course.updateMany(
            { studentsEnrolled: id },
            { $pull: { studentsEnrolled: id } }
          );


          await User.findByIdAndDelete({_id : id});

          
          return res.status(200).json({
            success : true , 
            message : 'User Deleted Successfully'
             
          })

    }catch(error){
         return res.status(500).json({
            success : false , 
            message : 'User cannot be deleted'
         })
    }
}


exports.getAllUserDetails = async(req , res) => {
    try{

        const id = req.user.id;

        const userDetails = await User.findById(id).populate('additionalDetails').exec();
        return res.status(200).json({
            success : true , 
            message : 'User details fetched Successfully',  
            data : userDetails
        })

    }catch(error){
        return res.status(500).json({
            success : false , 
            message : error.message
        })

    }
}

exports.updateDisplayPicture = async (req, res) => {
    try {
      const displayPicture = req.files.displayPicture
      const userId = req.user.id
      const image = await uploadImageToCloudinary(
        displayPicture,
        process.env.FOLDER_NAME,
        1000,
        1000
      )
      console.log(image)
      const updatedProfile = await User.findByIdAndUpdate(
        { _id: userId },
        { image: image.secure_url },
        { new: true }
      )
      res.send({
        success: true,
        message: `Image Updated successfully`,
        data: updatedProfile,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};


  
exports.getEnrolledCourses = async (req, res) => {
    try {
      const userId = req.user.id
      const userDetails = await User.findOne({
        _id: userId,
      })
        .populate("courses")
        .exec()
      if (!userDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find user with id: ${userDetails}`,
        })
      }
      return res.status(200).json({
        success: true,
        data: userDetails.courses,
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
};