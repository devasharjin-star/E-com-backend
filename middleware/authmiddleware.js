import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

const authMiddleware=async(req,res,next)=>{

    try{
    const token=req.cookies.token

    if(!token){
        return res.status(401).json({
            success:true,
            message:"Login to access"
        })
    }
    
    const decodedToken=await jwt.verify(token,process.env.JWT_SECRET_KEY)

    req.user=decodedToken

    
    next()
    }catch(e){
        console.log(e)
    }
}

export default authMiddleware;