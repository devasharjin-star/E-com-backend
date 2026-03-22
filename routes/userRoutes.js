import express from 'express'
import { registerController } from '../controllers/userController/user/registerController.js'
import { loginController } from '../controllers/userController/user/loginController.js'
import { logoutController } from '../controllers/userController/user/logoutController.js'
import { forgotPassController } from '../controllers/userController/user/forgotPassController.js'
import { resetPasscontroller } from '../controllers/userController/user/resetPassController.js'
import authMiddleware from '../middleware/authmiddleware.js'
import adminMiddleware from '../middleware/adminMiddleware.js'
import { profile, updatePassword, updateProfile } from '../controllers/userController/user/userController.js'
import {getAllUser,getSingleUser,updateUser,deleteUser} from '../controllers/userController/admin/userController.js'

const router=express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/logout',logoutController)
router.post('/forgot',forgotPassController)
router.post('/reset/:token',authMiddleware,resetPasscontroller)

//profile
router.get('/profile',authMiddleware,profile)
router.put('/password',authMiddleware,updatePassword)
router.put('/profile',authMiddleware,updateProfile)

//admin 
router.get('/admin/user',authMiddleware,adminMiddleware('admin'),getAllUser)
router.get('/admin/user/:id',authMiddleware,adminMiddleware('admin'),getSingleUser)
router.put('/admin/user/:id',authMiddleware,adminMiddleware('admin'),updateUser)
router.delete('/admin/user/:id',authMiddleware,adminMiddleware('admin'),deleteUser)

export default router;