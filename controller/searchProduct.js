const productModel = require("../models/productModels");

async function SearchProduct(req,res) {
    try{
        const query = req.query.q
        // console.log(query)
        const regex =new RegExp(query,'i','g')
        // console.log(regex)
        const product = await productModel.find({
            "$or":[
                {
                    productName:regex
                },
                {
                    category:regex
                }
            ]
        })
        console.log(product)
        res.status(200).json({
            data:product,
            message:"搜索产品",
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
 module.exports = SearchProduct