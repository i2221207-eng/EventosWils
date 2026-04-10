import {
  Reservation,
  Decoration,
  Payment,
  Province,
  District,
  DecorationImage
} from '../models/index.js'

import pusher from '../config/pusher.js'

/* =====================================
   CREAR RESERVA
===================================== */

export const createReservation = async (req, res) => {

  try {

    const {
      decoration_id,
      dni,
      nombres,
      apellidos,
      telefono,
      email,
      province_id,
      district_id,
      direccion,
      fecha
    } = req.body

    // 🔥 VALIDACIÓN DE CAMPOS
    if (
      !decoration_id ||
      !dni ||
      !nombres ||
      !apellidos ||
      !telefono ||
      !email ||
      !province_id ||
      !district_id ||
      !direccion ||
      !fecha
    ) {
      return res.status(400).json({
        message: 'Faltan datos para crear la reserva'
      })
    }

    // 🔥 VALIDAR DECORACIÓN
    const decoration = await Decoration.findByPk(decoration_id)
    if (!decoration) {
      return res.status(404).json({
        message: 'Decoración no encontrada'
      })
    }

    // 🔥 VALIDAR PROVINCIA
    const province = await Province.findByPk(province_id)
    if (!province) {
      return res.status(400).json({
        message: 'Provincia no existe'
      })
    }

    // 🔥 VALIDAR DISTRITO
    const district = await District.findByPk(district_id)
    if (!district) {
      return res.status(400).json({
        message: 'Distrito no existe'
      })
    }

    // 🔥 CREAR RESERVA
    const reservation = await Reservation.create({
      decoration_id,
      dni,
      nombres,
      apellidos,
      telefono,
      email,
      province_id,
      district_id,
      direccion,
      fecha,
      status: 'pendiente'
    })

    console.log("✅ Reserva creada:", reservation.id)

    // 🔥 PUSHER (NOTIFICACIÓN EN TIEMPO REAL)
    try {
      await pusher.trigger("reservas", "reserva-confirmada", {
        id: reservation.id,
        cliente: `${nombres} ${apellidos}`,
        mensaje: "Reserva creada correctamente"
      })

      console.log("📡 Evento enviado a Pusher")
    } catch (pusherError) {
      console.error("❌ Error enviando a Pusher:", pusherError)
    }

    res.status(201).json(reservation)

  } catch (error) {

    console.error("❌ ERROR CREATE RESERVATION:", error)

    res.status(500).json({
      message: 'Error al crear reserva',
      error: error.message
    })

  }

}



/* =====================================
   OBTENER TODAS
===================================== */

export const getReservations = async (req, res) => {

  try {

    const reservations = await Reservation.findAll({

      include: [

        {
          model: Decoration,
          include: [
            {
              model: DecorationImage,
              as: 'images'
            }
          ]
        },

        { model: Province },
        { model: District },
        { model: Payment }

      ],

      order: [['createdAt', 'DESC']]

    })

    res.json(reservations)

  } catch (error) {

    console.error("❌ ERROR GET RESERVATIONS:", error)

    res.status(500).json({
      message: 'Error al obtener reservas'
    })

  }

}



/* =====================================
   OBTENER UNA
===================================== */

export const getReservationById = async (req, res) => {

  try {

    const reservation = await Reservation.findByPk(req.params.id, {

      include: [

        {
          model: Decoration,
          include: [
            {
              model: DecorationImage,
              as: 'images'
            }
          ]
        },

        { model: Province },
        { model: District },
        { model: Payment }

      ]

    })

    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      })
    }

    res.json(reservation)

  } catch (error) {

    console.error("❌ ERROR GET BY ID:", error)

    res.status(500).json({
      message: 'Error al obtener reserva'
    })

  }

}



/* =====================================
   CANCELAR RESERVA
===================================== */

export const cancelReservation = async (req, res) => {

  try {

    const reservation = await Reservation.findByPk(req.params.id)

    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      })
    }

    reservation.status = 'cancelado'
    await reservation.save()

    res.json({
      message: 'Reserva cancelada correctamente'
    })

  } catch (error) {

    console.error("❌ ERROR CANCEL:", error)

    res.status(500).json({
      message: 'Error al cancelar reserva'
    })

  }

}



/* =====================================
   ELIMINAR
===================================== */

export const deleteReservation = async (req, res) => {

  try {

    const reservation = await Reservation.findByPk(req.params.id)

    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      })
    }

    await reservation.destroy()

    res.json({
      message: 'Reserva eliminada'
    })

  } catch (error) {

    console.error("❌ ERROR DELETE:", error)

    res.status(500).json({
      message: 'Error al eliminar reserva'
    })

  }

}



/* =====================================
   ACTUALIZAR ESTADO
===================================== */

export const updateReservationStatus = async (req, res) => {

  try {

    const reservation = await Reservation.findByPk(req.params.id)

    if (!reservation) {
      return res.status(404).json({
        message: 'Reserva no encontrada'
      })
    }

    reservation.status = req.body.status
    await reservation.save()

    const updatedReservation = await Reservation.findByPk(reservation.id, {

      include: [

        {
          model: Decoration,
          include: [
            {
              model: DecorationImage,
              as: 'images'
            }
          ]
        },

        { model: Province },
        { model: District },
        { model: Payment }

      ]

    })

    // 🔥 TAMBIÉN NOTIFICAR CAMBIO DE ESTADO
    await pusher.trigger("reservas", "reserva-actualizada", {
      id: reservation.id,
      status: reservation.status
    })

    res.json(updatedReservation)

  } catch (error) {

    console.error("❌ ERROR UPDATE STATUS:", error)

    res.status(500).json({
      message: 'Error al actualizar estado'
    })

  }

}

export const getReservationsByDni = async (req, res) => {

  try {

    const { dni } = req.params

    const reservations = await Reservation.findAll({
      where: { dni },
      order: [['createdAt', 'DESC']]
    })

    return res.json(reservations)

  } catch (error) {

    console.error("❌ ERROR GET BY DNI:", error)

    return res.status(500).json({
      message: 'Error al obtener reservas'
    })

  }

}