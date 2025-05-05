const userModel = require('../models/userModels')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
async function userSignInControll(req,res) {
    try{
        const {email,password} = req.body
        console.log("req body",req.body)
        const user = await userModel.findOne({email})

        if(!user){
            throw new Error("用户不存在")
        }
        if(!email){
            throw new Error("请输入正确的邮箱")
        }
        if(!password){
            throw new Error("请输入密码")
        }

        const checkPassword = await bcrypt.compare(password,user.password)
        // console.log("密码验证:",checkPassword)
        if(checkPassword){
            const tokenData = {
                _id : user._id,
                email:user.email
            }
            const token = await jwt.sign({
                tokenData},'secret',{expiresIn:60*60*8}
            )
            const tokenOption= {
                httpOnly:true,
                secure:true,
            }
            res.cookie("token",token,tokenOption).json({
                message:"登陆成功",
                data:token,
                success:true,
                error:false
            })
        }else{
            throw new Error("请检查密码是否正确")
        }
    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports = userSignInControll