const addToCartModel = require("../models/cartProduct")


async function deletCartProduct(req,res) {
    try{
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id
        
        const updateProduct = await addToCartModel.deleteOne({
            _id:addToCartProductId
        })
        res.json({
            message:"删除商品成功",
            data:updateProduct,
            error:false,
            success:true
        })
    }catch(error){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
    })}
}
module.exports =  deletCartProduct