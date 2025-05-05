const addToCartModel = require("../models/cartProduct")


async function updateAddToCartProduct(req,res) {
    try{
        const currentUserId = req.userId
        const addToCartProductId = req?.body?._id
        const quantity = req.body.quantity
        const updateProduct = await addToCartModel.updateOne({
            _id:addToCartProductId
        },{... (quantity && {quantity:quantity} )})
        res.json({
            message:"添加/减少商品成功",
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
module.exports =  updateAddToCartProduct