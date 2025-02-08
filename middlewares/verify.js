
const jwt = require('jsonwebtoken');

async function verifyToken(req,res,next) {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if(!token){
            return res.status(400).json({
                error : "Authorization Error, redirecting to Sign up"
            })
        }
        user = jwt.verify(token , process.env.JWT_SECRET);
        req.user = user;
        next()
    }
    catch(err){
        console.log(err);
        return res.status(400).json({
            error : 'Authorization Error Occured!'
        })
    }
}

module.exports = {
    verifyToken
}