const userModel = require('../models/userModels')
const bcrypt = require("bcrypt")
async function userSignUpControll(req,res) {
    try{
        const {email,password,name} = req.body
        // console.log("req body",req.body)
        const user = await userModel.findOne({email})

        if(user){
            throw new Error("用户已注册")
        }
        if(!email){
            throw new Error("请输入正确的邮箱")
        }
        if(!password){
            throw new Error("请输入密码")
        }
        if(!name){
            throw new Error("请输入名称")
        }
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password,salt)
        if(!hashPassword){
            throw new Error("密码验证失败")
        }
        const payload = {
            ...req.body,
            role:"GENERAL",
            password:hashPassword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()
        res.status(201).json({
            data:saveUser,
            success:true,
            error:false,
            message:"账号创建成功"
        })
    }catch(err){
        res.json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports = userSignUpControll