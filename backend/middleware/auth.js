const jwt= require('jsonwebtoken')

const key= process.env.JWT_KEY;

const authenticate=(req,res)=>{
    try {
        const token=req.token;
        if(!token){
            res.status(401).send({'message':'Please Login or SignUp'});
        }
        jwt.verify(token,key,(err,decoded)=>{
            if(err){
                res.status(401).send({'message':'Please Login or SignUp'})
            }else{
                console.log(decoded);
                req.user=decoded;
                next();
            }
        })
    } catch (error) {
        
    }
}

module.exports=authenticate;