const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

exports.auth = async (req, res, next) => {
    try{

        console.log("BEFORE ToKEN EXTRACTION");
        //extract token
        const token = req.header("Authorization").replace("Bearer ", "") || req.cookies.token || req.body.token;
        console.log(token);
        console.log("AFTER ToKEN EXTRACTION");

        //if token missing, then return response
        if(!token) {
            return res.status(401).json({
                success:false,
                message:'TOken is missing',
            });
        }

        //verify the token
        try{
            const decode =  jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch(err) {
            //verification - issue
            return res.status(401).json({
                success:false,
                message:'token is invalid',
            });
        }
        next();
    }
    catch(error) {  
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token',
        });
    }
}

//isStudent

exports.isStudent = async(req , res , next)=>{
     try{
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success : false , 
                message : 'This is a Protected , route for Students Only'
            })
        }

        next();
     }catch(error){
        return res.status(500).json({
            success : false , 
            message : 'User role cannot be verified , please try Again'
        })
     }

}


exports.isInstructor = async(req , res , next)=>{
     try{
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success : false , 
                message : 'This is a Protected , route for Instructors Only'
            })
        }

        next();
     }catch(error){
        return res.status(500).json({
            success : false , 
            message : 'User role cannot be verified , please try Again'
        })
     }

}


exports.isAdmin = async(req , res , next)=>{
     try{
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success : false , 
                message : 'This is a Protected , route for Admin Only'
            })
        }

        next();
     }
     catch(error){
        return res.status(500).json({
            success : false , 
            message : 'User role cannot be verified , please try Again'
        })
     }

}

