const productModel = require("../models/productModels");

async function getProduct(req,res) {
    try{
        const allProduct = await productModel.find().sort({createdAt:-1})
        res.status(200).json({
            data:allProduct,
            message:"全部产品",
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
 module.exports = getProduct