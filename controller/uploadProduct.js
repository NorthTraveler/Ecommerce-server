const uploadProductPermission = require("../middleware/permission")
const productModel = require("../models/productModels")

async function uploadProduct(req,res) {
    try{
        const sessionUserId = req.userid
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("当前用户无上传权限")
        }
        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()
        res.status(201).json(
            {
                data:saveProduct,
                message:"产品添加成功",
                error:false,
                success:true
            }
        )
    }catch(err){
        console.log("产品添加失败:",err)
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}

module.exports = uploadProduct