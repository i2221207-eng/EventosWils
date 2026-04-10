import { Router } from 'express'
import { upload } from '../middlewares/upload.js'
import {
  uploadDecorationImages,
  getDecorationImages,
  deleteDecorationImage
} from '../controllers/decorationImage.controller.js'
import { authMiddleware, adminMiddleware } from '../middlewares/auth.middleware.js'

const router = Router()

// 🔥 OBTENER IMÁGENES
router.get(
  '/:decorationId/images',
  authMiddleware,
  getDecorationImages
)

// 🔥 SUBIR IMÁGENES
router.post(
  '/:decorationId/images',
  authMiddleware,
  adminMiddleware,
  upload.array('images', 10),
  uploadDecorationImages
)

// 🔥 ELIMINAR IMAGEN
router.delete(
  '/images/:imageId',
  authMiddleware,
  adminMiddleware,
  deleteDecorationImage
)

export default router
