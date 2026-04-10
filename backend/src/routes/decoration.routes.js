import { Router } from 'express'
import {
  createDecoration,
  getDecorations,
  getDecorationById,
  updateDecoration,
  deleteDecoration
} from '../controllers/decoration.controller.js'

const router = Router()

router.post('/', createDecoration)
router.get('/', getDecorations)
router.get('/:id', getDecorationById)
router.put('/:id', updateDecoration)
router.delete('/:id', deleteDecoration)

export default router
