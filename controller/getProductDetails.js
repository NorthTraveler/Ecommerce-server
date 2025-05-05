const productModel = require("../models/productModels");

async function getProductDetails(req,res) {
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)
        // console.log(product)
        res.status(200).json({
            data:product,
            message:"产品获取成功",
            error:false,
            success:true,
        })
    }catch(err){
        res.status(400).json(
            {
                message:err.message || err,
                error:true,
                sucess:false
            }
        )
    }
 }
 module.exports = getProductDetails