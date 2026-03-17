import mongoose from "mongoose";
import User from "./userModel.js";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    description: {
        type: String,
        required: [true, "please enter product description"]
    },
    price: {
        type: Number,
        required: [true, "please enter product price"]
    },
    ratings: {
        type: Number,
        default: 0
    },
    image: [
        {
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }
    ],
    category: {
        type: String,
        required: [true,"please enter the category"]
    },
    stock:{
        type: Number,
        required: [true,"please enter product stack"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            name:{type:String,required:true},
            rating:{type:Number,required:true},
            comment:{type:String,required:true}
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Product = mongoose.model('Product', productSchema)

export default Product;