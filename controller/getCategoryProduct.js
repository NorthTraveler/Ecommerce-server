const uploadProductPermission = require("../middleware/permission");
const productModel = require("../models/productModels");

async function getCategoryProduct(req,res) {
    try{
        const productCategory = await productModel.distinct("category")
        const productByCategory = []
        for (const category of productCategory){
            const product = await productModel.findOne({category})
            if(product){
                productByCategory.push(product)
            }
        }
        res.status(200).json(
            {
                data:productByCategory,
                message:"货架产品获取成功",
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
 module.exports = getCategoryProduct