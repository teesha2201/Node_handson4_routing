const jwt = require("jsonwebtoken");
const secret_key = 'prepbytes';

const auth = (req,res,next)=>{
    const BearerToken =req.headers["authorization"]
    console.log(BearerToken)
    if(BearerToken){
        const token = BearerToken.split(" ")[1];
        const validate = jwt.verify(token,secret_key);
        if(validate)
        {
            next();
        }
        // return res.send({msg:"User not authorized"})
    }
    return res.send({msg:"user not allowed"})
    // console.log('this is application level Middleware ');
    next();
}
module.exports = auth