import User from "../../models/userModel.js"
import bcrypt from 'bcryptjs'

export const registerController = async (req, res) => {
    const {name,email,password}=req.body;

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

        const result=await User.create({
            name,
            email,
            password:hashedpassword,
            avatar:{
                public_id:"temp",
                url:"temp"
            }
        })

        if(result){
            res.status(200).json({
                data:result
            })
        }
    }catch(e){
        console.log(e)
        res.status(500).json({
            message:"something went wrong"
        })
    }
}