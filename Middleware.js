const jwt = require("jsonwebtoken");
const User = require("./Models/UserModel")
const authMiddleware = async(req,res,next)=>{

    const {authorization} = req.headers;

    const token = authorization.split(" ")[1];

    try {

        const decoded = await jwt.verify(token,"pravin");

        if(decoded){
            req.userId = decoded.user_id
            next()
        }
        else{

            res.send({msg:"Token is Not Valid"})
        }
        
    } catch (error) {
        
        res.send({msg:error})
    }
}

module.exports = authMiddleware