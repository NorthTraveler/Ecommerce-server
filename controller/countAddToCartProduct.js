const addToCartModel = require("../models/cartProduct")

async function countAddToCartProduct(req,res) {
    try{
        const userId = req.userId
        const count = await addToCartModel.countDocuments({userId:userId})
        return res.json(
            {
                data:{
                    count:count
                },
                message:"获取购物车成功",
                error:true,
                success:false
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
module.exports = countAddToCartProduct