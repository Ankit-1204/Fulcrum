const jwt= require('jsonwebtoken')

const key= process.env.JWT_KEY;

const authenticate=(req,res,next)=>{
    try {
        const token=req.headers['authorization'];
        console.log('hello')
        if(!token){
            console.log('no token')
            res.status(401).send({'message':'Please Login or SignUp'});
        }
        jwt.verify(token,key,(err,decoded)=>{
            if(err){
                console.log(err)
                res.status(401).send({'message':'Please Login or SignUp'})
            }
            console.log(decoded);
            req.user=decoded;
            next();
            
        })
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).send({ message: 'Authentication error' });
    }
}

module.exports=authenticate;