import bcrypt from "bcryptjs";
import User from '../../../models/userModel.js'
import jwt from 'jsonwebtoken'

export const loginController = async (req, res) => {

    try{
    const { email, password } = req.body;

    const user = await User.findOne({ email: email })

    if (!user) {
       return res.status(409).json({
            success: false,
            message: "user id does not exist"
        })
    }

    const checkpass = await bcrypt.compare(password, user.password)

    if (!checkpass) {
        return res.status(400).json({
            success: false,
            message: "password mismatch"
        })
    }

    const token = jwt.sign(
        {
            id: user.id,
            name:user.name,
            role: user.role
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '3d' }
    )


    res.cookie("token", token, { httpOnly: true })

   res.status(200).json({
    success: true,
    user: user,                  
    token
})
}catch(e){
    console.log(e)
    res.status(500).json({
        message:"server error"
    })
}
}