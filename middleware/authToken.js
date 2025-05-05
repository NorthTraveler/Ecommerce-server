const jwt = require("jsonwebtoken")
async function authToken(req,res,next) {
    try{
        const token = req?.cookies.token || req.header
        // console.log("token",token)
        if(!token){
            return res.stats(200).json(
                {
                    message:"用户未登录",
                    data:[],
                    error:true,
                    success:false
                }
            )
        }
        jwt.verify(token,"secret",function(err,decoded){
            // console.log("jwterr",err)
            // console.log("jwtdecode",decoded)
            // console.log(decoded.tokenData._id)
            if(err){
                console.log("jwt错误",err)
            }
        

        if (decoded && decoded.tokenData && decoded.tokenData._id) {
        req.userid = decoded.tokenData._id;
        } else {
            return res.status(401).json({
                message: "JWT 格式错误",
                data: [],
                error: true,
                success: false
            });
        }
            // console.log(jwt.decode?._id)
            next()
        })
    }catch(err){
        res.status(400).json(
            {
                message:err.message || err,
                data:[],
                error:true,
                success:false
            }
        )
    }
}
module.exports = authToken