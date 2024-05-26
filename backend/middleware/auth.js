import jwt from 'jsonwebtoken'

const authMiddleeare= async(req,res,next)=>{
    const {token} = req.headers;
    if(!token){
        return res.status(401).json({message:"Not Authorised Login Again"})
    }
    try {
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        next();
    } catch (error) {
        res.json({msg:"error"})
    }
}

export default authMiddleeare;