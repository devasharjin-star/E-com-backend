export const logoutController=async(req,res,next)=>{
    res.clearCookie('token',{
        httpOnly:true
     })

     res.status(200).json({
        message:"loged out successfully"
     })
}
