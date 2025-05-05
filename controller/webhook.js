const { response } = require("express")
const stripe = require("../config/stripe")

const endPointSecret ="whsec_b00bfea42c8fd938327edb849bff0e308b4d061a28510790683187caa30ed756"
async function webhook(req,res) {
    try{
        const sig = req?.headers["stripe-signature"]
        const payloadString = json.stringfy(req?.body)
        const header = stripe.webhooks.generateTestHeaderString({
            payload:payloadString,
            secret:endPointSecret
        })
        let event;
        try {
            event = stripe.webhooks.constructEvent(payloadString,header,endPointSecret)
        }catch(err){
            res.status(400).json({
                message:err.message || err,
                error:true,
                success:false
            })
        }
        response.status(200).send()
    }catch(err){
        res.status(400).json({
            message:err.message || err,
            error:true,
            success:false
        })
    }
}
module.exports = webhook