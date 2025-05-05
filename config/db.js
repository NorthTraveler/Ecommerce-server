const mongoose = require("mongoose")
require('dotenv').config
async function connectDB() {
    try{
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://Wuhao:wh13213682290@cluster0.qknqmm9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connect Successful")
    }catch(err){
        console.log(err)
    }
}
module.exports = connectDB