import crypto from 'crypto'
import User from '../../../models/userModel.js'
import bcrypt from 'bcryptjs'

export const resetPasscontroller = async (req, res) => {
    try {
        const token = req.params.token

        const { password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            return res.status(400).json("password did not match")
        }


        const hashToken = crypto.createHash('sha256').update(token).digest('hex')

        const user = await User.findOne({
            resetPasswordToken: hashToken,
            resetPasswordExpires: { $gt: Date.now() }
        })



        if (!user) {
            return res.status(400).json("token invalid or expired")
        }

        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        user.password = hashedpassword
        user.resetPasswordExpire = undefined
        user.resetPasswordToken = undefined
        await user.save()
        res.status(200).json("password updated successfully")
    } catch (e) {
        console.log(e)
        res.status(500).json('something went wrong')
    }
}