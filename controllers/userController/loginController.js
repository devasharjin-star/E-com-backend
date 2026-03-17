import bcrypt from "bcryptjs";
import User from "../../models/userModel.js"
import jwt from 'jsonwebtoken'

export const loginController = async (req, res) => {

    try{
    const { email, password } = req.body;

    const user = await User.findOne({ email: email })

    if (!user) {
        res.status(409).json({
            success: false,
            message: "user id does not exist"
        })
    }

    const checkpass = await bcrypt.compare(password, user.password)

    if (!checkpass) {
        res.status(400).json({
            success: false,
            message: "password mismatch"
        })
    }

    const token =await jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: '3d' }
    )


    res.cookie("token", token, { httpOnly: true })

    res.status(200).json({
        success:true,
        data:user,
        token
    })
}catch(e){
    console.log(e)
}
}