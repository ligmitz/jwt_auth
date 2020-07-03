const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('auth-token');
    if(!token) return res.status(401).send('Access Denied');
    
    try{
        const verify = jwt.verify(token,process.env.JWT_TOKEN);
        req.user = verify;
        next();
    }catch(err){
        res.send('Invalid Token'),status(400);
    }
}