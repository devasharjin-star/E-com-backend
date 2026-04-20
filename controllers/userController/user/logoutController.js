export const logoutController=async(req,res,next)=>{
   try {
       res.clearCookie('token',{
        httpOnly:true
     })

     res.status(200).json({
        message:"loged out successfully"
     })
   } catch (error) {
      console.log(error)
   }
}
