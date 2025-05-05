const addToCartModel = require("../models/cartProduct");


async function addToCart(req,res) {
    try{
        const {productId} = req?.body
        const currentUser = req.userId
        const isProductAvailable = await addToCartModel.findOne({productId,userId:currentUser})
        if(isProductAvailable) {
            res.json(
                {
                    message:"购物车已有该商品",
                    error:true,
                    success:false
                }
            )
        }
        const payload = {
            productId:productId,
            quantity:1,
            userId:currentUser,
        }
        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()
        res.status(200).json(
            {
                data:saveProduct,
                message:"产品已加入购物车",
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
module.exports = addToCart