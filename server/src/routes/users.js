import express from 'express'
import userController from '../controllers/users'
import { validateUser } from '../utils/validation'

const router = express.Router()
router.post('/register', userController.create)
router.post('/login', userController.login)
router.get('/list', validateUser, userController.list)
router.put('/changePassword', validateUser, userController.changePassword)
router.delete('/delete', validateUser, userController.deleteUser)

export default router
