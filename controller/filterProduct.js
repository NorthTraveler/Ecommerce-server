const productModel = require("../models/productModels");

async function filterProduct(req,res) {
    try{
        const categoryList = req?.body?.category || []
        
        const product = await productModel.find({
            category:{
                "$in" : categoryList
            }
        })
        // console.log(product)
        res.status(200).json({
            data:product,
            message:"搜索目录",
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
 module.exports = filterProduct