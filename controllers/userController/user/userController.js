import User from '../../../models/userModel.js'
import bcrypt from 'bcryptjs'

export const profile = async (req, res) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        user
    })
}


export const updatePassword = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body


    const user = await User.findById(req.user._id)

    const ischecked = await bcrypt.compare(oldPassword, user.password)

    if (!ischecked) {
       return res.status(400).json({
            message: "password wrong"
        })
    }
    if (newPassword !== confirmPassword) {
       return res.status(400).json({
            message: 'new password and confirm password mismatch'
        })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(newPassword, salt)

    user.password=hashedPassword
    await user.save()

    res.status(200).json({
        success:true,
        messsage:"password updated successfully",
        user
    })

}


export const updateProfile = async (req, res) => {
    const { name, email } = req.body
    const data = { name, email }
    const user = req.user._id
    const result = await User.findByIdAndUpdate(user, data, { new: true, runValidators: true })

    res.status(200).json({
        success: true,
        message: 'profile updated successfully',
        result
    })

}