const userModel = require("../models/userModels")

async function updateUser(req,res) {
    try{
        const sessionUser = req.userId
        const {name,email,role,userId}  = req.body
        const payload = {
            ...(email && {email:email}),
            ...(name && {name:name}),
            ...(role && {role:role})
        }
        const user = userModel.findById(sessionUser)
        console.log("user role",user.role)
        const updateUser = await userModel.findByIdAndUpdate(userId,payload)
        res.status(200).json(
            {
                data:updateUser,
                message:"用户更新成功",
                error:false,
                success:true
            }
        )
    }catch(err){
        console.log("用户更新失败:",err)
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports = updateUser