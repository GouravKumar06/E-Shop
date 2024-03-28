const mongoose = require('mongoose');
require('dotenv').config();

const connectDatabase = () =>{
    try{
        mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then((data)=>{
            console.log(`MongoDB connected successfully with ${data.connection.host}`);
        })

    }catch(error){
        console.log('database not connected');
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDatabase;