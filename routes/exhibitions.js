import { Router } from 'express'
import content from '../middleware/content.js'
import admin from '../middleware/admin.js'
import upload from '../middleware/upload.js'
import { jwt } from '../middleware/auth.js'
import { createExhibitions, getAllExhibitions, getExhibition, getSellExhibitions, editExhibition } from '../controllers/exhibitions.js'

const router = Router()

router.post('/', content('multipart/form-data'), jwt, admin, upload, createExhibitions)
router.get('/', getSellExhibitions)
router.get('/all', jwt, admin, getAllExhibitions)
router.get('/:id', getExhibition)
router.patch('/:id', content('multipart/form-data'), jwt, admin, upload, editExhibition)

export default router
