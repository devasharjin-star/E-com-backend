import express from 'express'
import { addOrder,getAllOrder,getSingleOrder,getAllOrderByAdmin,deleteOrder, updateOrderStatus} from '../controllers/orderController/orderController.js'
import authMiddleware from '../middleware/authmiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'

const router=express.Router()

router.post('/order/add',authMiddleware,addOrder)

router.get('/orders/get',authMiddleware,getAllOrder)
router.get('/order/:id',authMiddleware,getSingleOrder)
router.get('/admin/order',authMiddleware,adminMiddleware('admin'),getAllOrderByAdmin)
router.delete('/admin/order/:id',authMiddleware,adminMiddleware('admin'),deleteOrder)
router.put('/admin/order/:id',authMiddleware,adminMiddleware('admin'),updateOrderStatus)


export default router