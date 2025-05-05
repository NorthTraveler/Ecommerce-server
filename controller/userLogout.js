const userModel = require('../models/userModels')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
async function userLogOutControll(req,res) {
    try{
        res.clearCookie("token")
        res.json(
            {
                data:[],
                message:"用户登出",
                error:false,
                success:true
            }
        )
    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports = userLogOutControll