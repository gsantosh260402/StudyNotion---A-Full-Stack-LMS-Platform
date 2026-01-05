// SendOTP

const User = require("../models/User");
const OTP  = require("../models/Otp");
const otpGenerator = require('otp-generator');
const Profile = require("../models/Profile");
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const mailSender = require("../utils/mailSender");
require('dotenv').config();

exports.sendOTP = async(req , res) => {

    try {
        const {email} = req.body;

        // check if the user already exists

        const checkUserPresent = await User.findOne({email});

        // check if the User already exist , then return a response.

        if(checkUserPresent){
            return res.status(401).json({
            success : false , 
            message : 'User already registered',
            })
        }

        // Generate Otp
        var otp = otpGenerator.generate(6 , {
           upperCaseAlphabets:false,
           lowerCaseAlphabets:false,
           specialChars:false
        });

        console.log("OTP generated : " , otp);

        //check unique otp or not

        let result = await OTP.findOne({otp : otp});
        while(result){
            otp = otpGenerator.generate(6,{
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false
            });
            result = await OTP.findOne({otp:otp});
        }

        const otpPayload = {email , otp};
        
        //create an Entry for Otp in db

        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);
        res.status(200).json({
            success : true , 
            message : 'OTP Sent Successfully',
            otp
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success : false,
            message : error.message,
        })
    
    }


}

exports.signup = async(req , res)=>{
    try{

        //Data fetch from request body 

        const {firstName , lastName , accountType , email , password , confirmPassword , contactNumber , otp} = req.body;

        //validation
 
        if(!firstName ||!lastName || !email || !password || !confirmPassword || !otp){
            return res.status(403).json({
                success : false , 
                message : 'All fields are Mandatory'
            })
        }

        // validate if both passwords are same or not.

        if(password !==confirmPassword){
            return res.status(400).json({
                success : false , 
                message : 'Password and Confirm Password value does not match. pls try again !'
            })
        }

        // check if user is already  exist or not

        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success :false,
                message : 'User is already Registered',
            })
        }

        // find most recent otp stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
        console.log(recentOtp);
        if(recentOtp.length === 0){
            return res.status(400).json({
                success : false , 
                message : 'OTP not Found'
            })
        }else if(otp !== recentOtp[0].otp){
            // Invalid OTP
            return res.status(400).json({
                success : false , 
                message : 'Invalid OTP',
            });
        }

        // hashpassword

        const hashedPassword = await bcrypt.hash(password , 10);

        // entry create in DB

        const profileDetails = await Profile.create({
            gender : null , 
            dateOfBirth : null , 
            about : null , 
            contactNumber :null
        });

        const user = await User.create({
            firstName , 
            lastName , 
            email , 
            contactNumber , 
            password : hashedPassword,
            accountType,
            additionalDetails : profileDetails._id,
            token : "" , 
            image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        return res.status(200).json({
            success : true , 
            message : 'User is Registered Succesfully',
            data : user
        })  


    }catch(error){

        console.log(error)
        return res.status(500).json({
            success : false , 
            message : 'User cannot be registered . Please try again'
        })

    }
}

exports.login = async(req , res)=>{
    try{
        const {email  , password} = req.body;

        if(!email || !password){
            return res.status(403).jsom({
                 success : false , 
                 message : 'All fields are required , Please try again'
            });
        }

        // user exists or not

        const user = await User.findOne({email}).populate("additionalDetails");
        
        if(!user){
            return res.status(401).json({
                success : false , 
                message : "User is not registered , Please sign up first",
            })
        }

        // generate JWT , after password matching 
        
        if(await bcrypt.compare(password , user.password)){
            const payload = {
                email : user.email , 
                id : user._id,
                accountType : user.accountType
            }
            const token = JWT.sign(payload , process.env.JWT_SECRET , {
                  expiresIn:"2h",

            });

            // Save token to user document in Database
            user.token = token;
            user.password = undefined ; 

            const options = {
                expires: new Date(Date.now()+3*24*60*60*1000),
                httpOnly : true
            }
            res.cookie('token' , token , options).status(200).json({
                success : true , 
                token , 
                user , 
                message : 'Logged in Successfully'
            })
        }else{
            return res.status(401).json({
                success : false , 
                message : 'Password is incorrect'
            });
        }

    }catch(error){

        console.log(error);
        return res.status(500).json({
            success:false,
            message : 'Login Failure , Please try Again'
        })

    }
}

// change password

// exports.changePassword = async (req, res) => {
// 	try {
// 		// Get user data from req.user
// 		const userDetails = await User.findById(req.user.id);

// 		// Get old password, new password, and confirm new password from req.body
// 		const { oldPassword, newPassword, confirmNewPassword } = req.body;

// 		// Validate old password
// 		const isPasswordMatch = await bcrypt.compare(
// 			oldPassword,
// 			userDetails.password
// 		);
// 		if (!isPasswordMatch) {
// 			// If old password does not match, return a 401 (Unauthorized) error
// 			return res
// 				.status(401)
// 				.json({ success: false, message: "The password is incorrect" });
// 		}

// 		// Match new password and confirm new password
// 		if (newPassword !== confirmNewPassword) {
// 			// If new password and confirm new password do not match, return a 400 (Bad Request) error
// 			return res.status(400).json({
// 				success: false,
// 				message: "The password and confirm password does not match",
// 			});
// 		}

// 		// Update password
// 		const encryptedPassword = await bcrypt.hash(newPassword, 10);
// 		const updatedUserDetails = await User.findByIdAndUpdate(
// 			req.user.id,
// 			{ password: encryptedPassword },
// 			{ new: true }
// 		);

// 		// Send notification email
// 		try {
// 			const emailResponse = await mailSender(
// 				updatedUserDetails.email,
// 				passwordUpdated(
// 					updatedUserDetails.email,
// 					`Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
// 				)
// 			);
// 			console.log("Email sent successfully:", emailResponse.response);
// 		} catch (error) {
// 			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
// 			console.error("Error occurred while sending email:", error);
// 			return res.status(500).json({
// 				success: false,
// 				message: "Error occurred while sending email",
// 				error: error.message,
// 			});
// 		}

// 		// Return success response
// 		return res
// 			.status(200)
// 			.json({ success: true, message: "Password updated successfully" });
// 	} catch (error) {
// 		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
// 		console.error("Error occurred while updating password:", error);
// 		return res.status(500).json({
// 			success: false,
// 			message: "Error occurred while updating password",
// 			error: error.message,
// 		});
// 	}
// };




exports.changePassword = async (req, res) => {
	try {
		// Get user data from req.user
		const userDetails = await User.findById(req.user.id);

		// Get old password, new password, and confirm new password from req.body
		const { oldPassword, newPassword} = req.body;

		// Validate old password
		const isPasswordMatch = await bcrypt.compare(
			oldPassword,
			userDetails.password
		);
		if (!isPasswordMatch) {
			// If old password does not match, return a 401 (Unauthorized) error
			return res
				.status(401)
				.json({ success: false, message: "The password is incorrect" });
		}

		
		// Update password
		const encryptedPassword = await bcrypt.hash(newPassword, 10);
		const updatedUserDetails = await User.findByIdAndUpdate(
			req.user.id,
			{ password: encryptedPassword },
			{ new: true }
		);

		// Send notification email
		try {
			const emailResponse = await mailSender(
				updatedUserDetails.email,
                "Password Updated Successfully",     // <-- Title
                passwordUpdated(                     // <-- Body
                    updatedUserDetails.email,
                    `${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
                )
			);
			console.log("Email sent successfully:", emailResponse.response);
		} catch (error) {
			// If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
			console.error("Error occurred while sending email:", error);
			return res.status(500).json({
				success: false,
				message: "Error occurred while sending email",
				error: error.message,
			});
		}

		// Return success response
		return res
			.status(200)
			.json({ success: true, message: "Password updated successfully" });
	} catch (error) {
		// If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
		console.error("Error occurred while updating password:", error);
		return res.status(500).json({
			success: false,
			message: "Error occurred while updating password",
			error: error.message,
		});
	}
};