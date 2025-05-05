const uploadProductPermission = require("../middleware/permission");
const productModel = require("../models/productModels");

async function getCategoryWiseProduct(req,res) {
    try{
        const {category} = req?.body || req?.query
        const product = await productModel.find({category})

        res.status(201).json(
            {
                data:product,
                message:`获取${category}成功`,
                error:false,
                success:true
            }
        )
    }catch(err){
        // console.log("产品添加失败:",err)
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
 module.exports = getCategoryWiseProduct