import { Router } from 'express'
import content from '../middleware/content.js'
import * as auth from '../middleware/auth.js'
import admin from '../middleware/admin.js'
import { register, login, logout, extend, getUser, getAllUser, edituser, editCart, getCart, editLove, getLove, getLoveById } from '../controllers/users.js'

const router = Router()

router.post('/', content('application/json'), register)
router.post('/login', content('application/json'), auth.login, login)
router.delete('/logout', auth.jwt, logout)
router.patch('/extend', auth.jwt, extend)
router.get('/me', auth.jwt, getUser)
router.get('/all', auth.jwt, admin, getAllUser)
router.patch('/edituser', content('application/json'), auth.jwt, admin, edituser)
router.post('/cart', content('application/json'), auth.jwt, editCart)
router.get('/cart', auth.jwt, getCart)
router.post('/love', content('application/json'), auth.jwt, editLove)
router.get('/love', auth.jwt, getLove)
router.get('/love/:id', auth.jwt, getLoveById)

export default router
