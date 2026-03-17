import express from 'express'
import { registerController } from '../controllers/userController/registerController.js'
import { loginController } from '../controllers/userController/loginController.js'
import { logoutController } from '../controllers/userController/logoutController.js'

const router=express.Router()

router.post('/register',registerController)
router.post('/login',loginController)
router.post('/logout',logoutController)

export default router;