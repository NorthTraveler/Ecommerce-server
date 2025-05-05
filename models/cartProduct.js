const mongoose = require("mongoose")

const addToCart = new mongoose.Schema({
    productId:{
        ref:'product',
        type: mongoose.Schema.Types.ObjectId,
    },
    quantity:Number,
    userId:String,
},{
    timestamps:true
}

)
const addToCartModel = mongoose.model("addToCart",addToCart)
module.exports =  addToCartModel