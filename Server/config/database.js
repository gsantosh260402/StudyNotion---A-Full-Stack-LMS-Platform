const mongoose = require('mongoose');
require('dotenv').config();

exports.connect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>(console.log('Database is runing Successfully')))
    .catch((error)=>{
        console.log(error);
        console.log('Error in connecting Database');
        process.exit(1);
    })
}
