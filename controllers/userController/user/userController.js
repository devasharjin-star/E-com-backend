import User from '../../../models/userModel.js'
import bcrypt from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'

export const profile = async (req, res) => {
    try{
    const user = await User.findById(req.user._id)

    res.status(200).json({
        success: true,
        user
    })
}catch(e){
    res.status(401).json({
        success:false,
        message:'something went wrong'
    })
}
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
    try {
        const { name, email, avatar } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // update name & email
        if (name) user.name = name;
        if (email) user.email = email;

        // update avatar
        if (avatar) {
            // delete old image
            if (user.avatar?.public_id) {
                await cloudinary.uploader.destroy(user.avatar.public_id);
            }

            // upload new image (base64)
            const result = await cloudinary.uploader.upload(avatar, {
                folder: "E-Commerce",
                width: 150,
                crop: "scale"
            });

            user.avatar = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};