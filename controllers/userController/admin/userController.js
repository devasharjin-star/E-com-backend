import User from '../../../models/userModel.js'

export const getAllUser = async (req, res) => {
    const users = await User.find()

    res.status(200).json({
        message: true,
        users: users
    })
}

export const getSingleUser = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)

    if (!user) {
        res.status(400).json({
            success: false,
            message: "User ID does not exist"
        })
    }
    res.status(200).json({
        success: true,
        user
    })
}

export const updateUser = async (req, res) => {
    const { role } = req.body
    const id = req.params.id

    const user = await User.findByIdAndUpdate(id, role, { new: true })

    if (!user) {
        res.status(400).json({
            success: false,
            message: "User ID does not exist"
        })
    }

    res.status(200).json({
        success: true,
        message:'user role is updated',
        user
    })
}

export const deleteUser = async (req, res) => {
    const id=req.params.id

    const user=await User.findByIdAndDelete(id)

    if (!user) {
        res.status(400).json({
            success: false,
            message: "User ID does not exist"
        })
    }

    res.status(200).json({
        success: true,
        message:"User deleted successfully"
    })
}