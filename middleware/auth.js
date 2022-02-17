const jwt=require(`jsonwebtoken`);
require(`dotenv`).config();

class Auth{
    verifyToken(req,res,next){
        if(req.headers.authorization){
            try {
                let token=req.headers.authorization.split(" ")[1];

                jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
                    if(err){
                        return  res.json({error:err.message})
                    }
                    req.user=decoded;
                    next()
                })
            }catch (e) {
                res.json({error:e.message});
            }
        }else{
            res.json({error:"no token provided"})
        }
    }


}

module.exports = new Auth()