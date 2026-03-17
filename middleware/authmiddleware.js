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

    const user=await User.findById(decodedToken.id)
    req.user=user

    console.log(user)
    next()
    }catch(e){
        console.log(e)
    }
}

export default authMiddleware;