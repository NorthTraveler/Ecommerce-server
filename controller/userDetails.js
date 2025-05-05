const userModel = require("../models/userModels")

async function userDetailsController(req,res) {
    try{
        // console.log("id",req.userid)
        const user = await userModel.findById(req.userid)
        // console.log("user:",user)
        res.status(200).json(
            {
                data:user,
                message:"获取用户成功",
                error:false,
                success:true
            }
        )
    }catch(err){
        console.log("用户获取失败:",err)
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports = userDetailsController