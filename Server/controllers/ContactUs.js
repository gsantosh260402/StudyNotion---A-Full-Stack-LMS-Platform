const mailSender = require('../utils/mailSender');

require('.dotenv').config();

exports.contactUs = async(req , res)=>{
    try{

        const {FirstName , LastName , email , number , message} = req.body;

        const  mailResponse = await mailSender(process.env.MAIL_USER , `${FirstName} Contacted You`, message);

        const  mailToStudent = await mailSender(email , 'You have contacted Study Notion' , 'We will get back to you');

        return res.status(200).json({
                success : true , 
                message : 'You have contacted Successfully'
            })


    }catch(error){

        return res.status(500).json({
            success : false , 
            message : error.message,
        })

    }
}