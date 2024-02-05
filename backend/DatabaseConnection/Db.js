const mongoose = require('mongoose');
const dbconfig = {
    mongoURL : 
    "mongodb+srv://Devendra1997kumar:RJansm83UKsSGSZT@cluster0.es8qtfh.mongodb.net/HotelBooking?retryWrites=true&w=majority"

};
const connectDB = async ()=>{
    try {
        await mongoose.connect(dbconfig.mongoURL,{
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Connect with MongoDB")
    }
    catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
      }
};
module.exports = connectDB;

