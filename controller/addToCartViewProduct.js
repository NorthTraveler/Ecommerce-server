const addToCartModel = require("../models/cartProduct");


async function addToCartViewProduct(req,res) {
    try{
        
        const currentUser = req.userId
        const allProduct = await addToCartModel.find({userId:currentUser}).populate("productId")
        // console.log("addCart",allProduct)
        res.status(200).json(
            {
                data:allProduct,
                message:"添加至购物视图",
                error:false,
                success:true
            }
        )
    }catch(err){
        res.status(400).json(
            {
                message:err.message || err,
                error:true,
                success:false
            }
        )
    }
}
module.exports = addToCartViewProduct