import express from 'express'
import authMiddleware from '../middleware/authmiddleware.js'
import { addProduct, deleteProduct, getProducts, getSingleProduct, updateProduct } from '../controllers/productController/productController.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
import { reviewsController,viewReviews } from '../controllers/productController/productController.js'

const router = express.Router()

router.route('/products').post(authMiddleware, adminMiddleware('admin'), addProduct)
    .get(getProducts)
router.route('/product/:id').get(getSingleProduct)
    .put(authMiddleware, adminMiddleware('admin'), updateProduct)
    .delete(authMiddleware, adminMiddleware('admin'), deleteProduct)

//review
router.put('/productreview', authMiddleware, reviewsController)
router.get('/productrevies/:id',authMiddleware,adminMiddleware('admin'),viewReviews)

export default router;