const uploadProductPermission = require("../middleware/permission");
const productModel = require("../models/productModels");

async function updateProduct(req,res) {
    try{
        // console.log(req.userid)
        const sessionUserId = req.userid
        if(!uploadProductPermission(sessionUserId)){
            throw new Error("当前用户无上传权限")
        }
        const {_id,...resBody} = req.body
        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)
        console.log(updateProduct)
        res.status(201).json(
            {
                data:updateProduct,
                message:"产品更新成功",
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
 module.exports = updateProduct