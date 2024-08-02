const jwt=require("jsonwebtoken")


const verifyToken=(req,res,next)=>{
    //    const token=req.header('Authorization').replace("Bearer"," ")
    //                  or
    try{
        const token=req.header('Authorization').split(" ")[1]
       if(!token) return res.status(401).json({error:"Token required"})
             const decoded=jwt.verify(token, "secret_key")
             req.user=decoded
             next()
        
    }
        catch(err){
            res.status(401).json({error:"Invalid Token"})        }
}
module.exports={verifyToken}