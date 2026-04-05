import Order from "../../models/orderModel.js"
import Product from "../../models/productModel.js";

export const addOrder=async(req,res)=>{
    const {shippingAddress,orderItems,paymentInfo,itemPrice,taxPrice,
        shippingPrice,totalPrice}=req.body;
    
    const order=await Order.create({
        shippingAddress,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        user:req.user._id,
        paidAt:Date.now()
    })

    res.status(201).json({
        success:true,
        order
    })
}

export const getAllOrder=async(req,res)=>{
    const user=req.user._id

    const orders=await Order.find({user})

    if(!user){
       return res.status(404).json({
            success:false,
            message:'No orders found'
        })
    }
    res.status(200).json({
        success:true,
        orders
    })
}

export const getSingleOrder=async(req,res)=>{
    const id=req.params.id
    const order=await Order.findById(id)
    if(!order){
        res.status(400).json({
            success:false,
            message:'Order not found'
        })
    }
    res.status(200).json({
        success:true,
        order
    })
}

export const getAllOrderByAdmin=async(req,res)=>{
    const orders=await Order.find()

    if(!orders){
       return  res.status(400).json({
            success:false,
            message:'Order not found'
        })
    }
    res.status(200).json({
        success:true,
        orders
    })

}

export const deleteOrder=async(req,res)=>{
    const id=req.params.id
    const order=await Order.findById(id)

    if(!order){
        return res.status(400).json({
            success:false,
            message:'Order not found'
        })
    }

    if(order.orderStatus!=='Delivered'){
       return res.status(400).json({
            success:false,
            message:'order is under processing so cannot delete'
        })
    }
    await Order.deleteOne({_id:id})
    res.status(200).json({
        success:true,
        message:'order deleted successfully'
    })
}

export const updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findById(id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.orderStatus === "Delivered") {
            return res.status(400).json({
                success: false,
                message: "This order is already delivered"
            });
        }

        // 🔹 Update stock for all products
        await Promise.all(
            order.orderItems.map(async (item) => {

                const product = await Product.findById(item.product);

                if (!product) {
                    throw new Error("Product not found");
                }

                product.stock -= item.quantity;

                await product.save({ validateBeforeSave: false });
            })
        );

        // 🔹 Update order status
        order.orderStatus = req.body.status;

        if (order.orderStatus === "Delivered") {
            order.deliveredAt = Date.now();
        }

        await order.save();

        res.status(200).json({
            success: true,
            message: "Updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};