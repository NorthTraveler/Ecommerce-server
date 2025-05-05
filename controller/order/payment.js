const { current } = require("@reduxjs/toolkit")
const userModel = require("../../models/userModels")
const { response } = require("express")
const stripe = require("../../config/stripe")

async function paymentController(req,res) {
    try{
        const {cartItems} = req?.body
        // console.log(cartItems)
        const user = await userModel.findOne({_id:req.userId})
        // console.log(user)
        const params = {
            submit_type:"pay",
            mode:"payment",
            payment_method_types:["card"],
            billing_address_collection:"auto",
            shipping_options:[
                {
                    shipping_rate:"shr_1RJAM6FLzCnIQegWjhemBlT9"
                }
            ],
            customer_email:user?.email,
            line_items:cartItems.map((item,index) =>{
                return {
                    price_data:{
                        currency:"cny",
                        product_data:{
                            name:item.productId.productName,
                            images:item.productId.productImage,
                            metadata:{
                                productId:item._id
                            }
                        },
                        unit_amount:item.productId.sellingPrice*100
                    },
                    adjustable_quantity:{
                        enabled:true,
                        minimum:1
                    },
                    quantity:item.quantity
                }
            }),  
            success_url:"http://localhost:3000/success",
            cancel_url:"http://localhost:3000/cancel",
        }
        // console.log(params)
        const session = await stripe.checkout.sessions.create(params)
        res.status(303).json(session)
    }catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports = paymentController