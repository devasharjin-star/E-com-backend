import User from '../../../models/userModel.js'
import bcrypt from 'bcryptjs'
import {v2 as cloudinary} from 'cloudinary'

export const registerController = async (req, res) => {
    const {name,email,password,avatar}=req.body;

    try{
        const emailexist=await User.findOne({email:email})

        if(emailexist){
            return res.status(400).json({
                success:false,
                message:"user id already exist"
            })
        }
        const salt=await bcrypt.genSalt(10)
        const hashedpassword=await bcrypt.hash(password,salt)

        const uploadImage=await cloudinary.uploader.upload(avatar,{folder:"E-commerce"})

        const result=await User.create({
            name,
            email,
            password:hashedpassword,
            avatar:{
                public_id:uploadImage.public_id,
                url:uploadImage.secure_url
            }
        })

        if(result){
            res.status(200).json({
                user:result,
                success:true,
                message:"Registered Successfully"
            })
        }
    }catch(e){
        console.log(e)
        res.status(500).json({
            message:"something went wrong"
        })
    }
}