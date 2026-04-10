import { Router } from 'express'
import { buscarDNI } from '../controllers/dni.controller.js'

const router = Router()

router.get('/:numero', buscarDNI)

export default router