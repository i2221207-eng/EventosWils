import axios from "axios"
import { Reservation, Decoration } from "../models/index.js"
import pusher from "../config/pusher.js"

export const createPayment = async (req, res) => {

  try {

    const { token, email, amount, reservation_id } = req.body

    console.log("BODY RECIBIDO:", req.body)

    // 🔥 VALIDACIÓN BÁSICA
    if (!token || !reservation_id) {
      return res.status(400).json({
        message: "Faltan datos para procesar el pago"
      })
    }

    // 🔍 BUSCAR RESERVA
    const reservation = await Reservation.findByPk(reservation_id)

    if (!reservation) {
      return res.status(404).json({
        message: "Reserva no encontrada"
      })
    }

    // 🔍 OBTENER DECORACIÓN (PRECIO REAL)
    const decoration = await Decoration.findByPk(reservation.decoration_id)

    if (!decoration) {
      return res.status(404).json({
        message: "Decoración no encontrada"
      })
    }

    // 🔥 USAR PRECIO REAL DESDE BD (NO DEL FRONTEND)
    const monto = Math.round(Number(decoration.price) * 100)

    console.log("💰 MONTO REAL DESDE BD:", monto)

    if (!monto || monto <= 0) {
      return res.status(400).json({
        message: "Monto inválido desde base de datos"
      })
    }

    // 🔥 CREAR CARGO EN CULQI
    const response = await axios.post(
      "https://api.culqi.com/v2/charges",
      {
        amount: monto,
        currency_code: "PEN",
        email: email || reservation.email || "cliente@demo.com",
        source_id: token
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.CULQI_SECRET_KEY}`,
          "Content-Type": "application/json"
        }
      }
    )

    console.log("✅ RESPUESTA CULQI:", response.data)

    // ✅ ACTUALIZAR ESTADO
    reservation.status = "pagado"
    await reservation.save()

    // 🔔 PUSHER
    await pusher.trigger(
      `user-${reservation.id}`,
      "reserva-confirmada",
      {
        message: "Pago realizado, reserva confirmada 🎉",
        reservation_id: reservation.id
      }
    )

    return res.json({
      message: "Pago exitoso",
      data: response.data
    })

  } catch (error) {

    console.log("❌ ERROR COMPLETO:", error)

    if (error.response) {
      console.log("❌ ERROR CULQI:", error.response.data)

      return res.status(error.response.status || 500).json({
        message: error.response.data.user_message || "Error en el pago",
        culqi_error: error.response.data
      })
    }

    return res.status(500).json({
      message: "Error interno del servidor"
    })

  }

}