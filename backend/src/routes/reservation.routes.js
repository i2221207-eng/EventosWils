import { Router } from 'express'

import {
  createReservation,
  getReservations,
  getReservationById,
  cancelReservation,
  deleteReservation,
  updateReservationStatus,
  getReservationsByDni
} from '../controllers/reservation.controller.js'

const router = Router()

router.post('/', createReservation)

router.get('/', getReservations)

router.get('/dni/:dni', getReservationsByDni)

router.get('/:id', getReservationById)

router.put('/:id/cancel', cancelReservation)

router.put('/:id/status', updateReservationStatus)

router.delete('/:id', deleteReservation)

export default router