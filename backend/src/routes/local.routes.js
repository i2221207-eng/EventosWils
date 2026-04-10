import { Router } from 'express'
import {
  createLocal,
  getLocals,
  getLocalById,
  updateLocal,
  deleteLocal
} from '../controllers/local.controller.js'

const router = Router()

router.post('/', createLocal)
router.get('/', getLocals)
router.get('/:id', getLocalById)
router.put('/:id', updateLocal)
router.delete('/:id', deleteLocal)

export default router
