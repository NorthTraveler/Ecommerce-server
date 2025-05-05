const userModel = require("../models/userModels")

async function allUsersController(req,res) {
    try{
        const allUser =  await userModel.find()
        res.status(200).json(
            {
                data:allUser,
                message:"获取全部用户成功",
                error:false,
                success:true
            }
        )
    }catch(err){
        console.log("alluser err",err)
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports = allUsersController