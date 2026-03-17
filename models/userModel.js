import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "please enter the name"]
    },
    email: {
        type: String,
        required: [true, "please enter the email"],
        unique: [true, "email should be unique"]
    },
    password: {
        type: String,
        required: [true, "please enter the password"]
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpires:Date
},{timestamps:true})

const User=mongoose.model('User',userSchema)

export default User;