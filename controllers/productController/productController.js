import Product from "../../models/productModel.js";

export const addProduct = async (req, res) => {
    req.body.user = req.user.id
    const product = await Product.create(req.body)

    if (!product) {
        return res.status(400).json({
            success: true,
            message: "product details wrong"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}

export const getProducts = async (req, res) => {
    const totalProducts = await Product.countDocuments()
    const limit = req.query.limit || 4
    const totalpage = Math.ceil(totalProducts / limit)
    const currentpage = req.query.page || 1
    const skip = (currentpage - 1) * limit

    const { key, cat } = req.query
    const query = {}
    if (key) {
        query.name = {
            $regex: key,
            $options: "i"
        }
    }
    if (cat) {
        query.category = {
            $regex: req.query.cat,
            $options: 'i'
        }
    }
    const products = await Product.find(query).limit(limit).skip(skip)

    if (!products) {
        return res.status(400).json({
            success: true,
            message: "product details wrong"
        })
    }
    res.status(200).json({
        success: true,
        totalProducts,
        totalpage,
        currentpage,
        products
    })

}


export const getSingleProduct = async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (!product) {
        return res.status(400).json({
            success: true,
            message: "product details wrong"
        })
    }
    res.status(200).json({
        success: true,
        product
    })
}


export const updateProduct = async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );


    if (!product) {
        return res.status(400).json({
            success: true,
            message: "product details wrong"
        })
    }
    res.status(200).json({
        success: true,
        product
    })

}


export const deleteProduct = async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
        return res.status(400).json({
            success: true,
            message: "product details wrong"
        })
    }
    res.status(200).json({
        success: true,
        message: "product deleted successfully"
    })
}

export const reviewsController = async (req, res) => {
    try {
        const { productId, rating, comment } = req.body

        const review = {
            user: req.user.id,
            name: req.user.name,
            rating: Number(rating),
            comment
        }

        const product = await Product.findById(productId)

        if (!product) {
            res.status(400).json({
                success: false,
                message: 'product not found'
            })
        }

        const check = product.reviews.find(
            r => r.user?.toString() === req.user.id.toString()
        )
        if (check) {
            check.rating = Number(rating),
                check.comment = comment

        } else {
            product.reviews.push(review)
        }

        product.numOfReviews = product.reviews.length

        let sum = 0
        product.reviews.forEach((review) => {
            sum = sum + review.rating
        })
        product.ratings = Number(sum / product.reviews.length)

        await product.save({ validateBeforeSave: false })

        res.status(200).json({
            success: true,
            messaage: 'product updated successfully'
        })
    } catch (e) {
        console.log(e)
    }
}

export const viewReviews = async (req, res) => {
    try {
        const productid = req.params.id

        const product = await Product.findById(productid)

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'product not found'
            })
        }

        res.status(200).json({
            success: true,
            review: product.reviews
        })
    } catch (e) {
        console.log(e)
    }
}