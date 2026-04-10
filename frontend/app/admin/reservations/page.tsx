'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'
import { FaEye, FaTrash, FaChevronDown } from 'react-icons/fa'
import ReservationModal from './components/ReservationModal'

interface Payment {
  amount: number
  status: string
}

interface Reservation {
  id: number
  nombres: string
  apellidos: string
  fecha: string
  direccion: string
  status: string
  total_price?: number
  Payments?: Payment[]
}

export default function AdminReservations() {

  const [reservations, setReservations] = useState<Reservation[]>([])
  const [selected, setSelected] = useState<Reservation | null>(null)

  useEffect(() => {
    apiFetch('/reservations').then((res) => {
      console.log("DATA BACKEND:", res)

      // 🔥 IMPORTANTE (arregla el vacío)
      if (Array.isArray(res)) {
        setReservations(res)
      } else if (res.data) {
        setReservations(res.data)
      } else {
        setReservations([])
      }
    })
  }, [])

  const deleteReservation = async (id: number) => {
    if (!confirm('¿Eliminar reserva?')) return
    await apiFetch(`/reservations/${id}`, { method: 'DELETE' })
    setReservations(prev => prev.filter(r => r.id !== id))
  }

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'pagado':
        return "bg-green-100 text-green-700 border border-green-300"
      case 'pendiente':
        return "bg-yellow-100 text-yellow-700 border border-yellow-300"
      case 'cancelado':
        return "bg-red-100 text-red-700 border border-red-300"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <div className="p-12 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">

      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Gestión de Reservas
      </h1>

      {/* HEADER */}
      <div className="grid grid-cols-12 px-10 py-5 text-lg font-bold text-gray-900 uppercase">
        <div className="col-span-1 text-center">#</div>
        <div className="col-span-2">Cliente</div>
        <div className="col-span-2">Fecha</div>
        <div className="col-span-3">Dirección</div>
        <div className="col-span-2">Pago</div>
        <div className="col-span-1 text-center">Estado</div>
        <div className="col-span-1 text-center">Acciones</div>
      </div>

      <div className="space-y-4">

        {reservations.map((r, index) => {

          const totalPaid =
            r.Payments?.reduce((acc, p) =>
              p.status === 'success' ? acc + Number(p.amount) : acc
            , 0) || 0

          const percentage = r.total_price
            ? Math.min((totalPaid / r.total_price) * 100, 100)
            : 0

          return (
            <div
              key={r.id}
              className="grid grid-cols-12 items-center px-10 py-5 rounded-2xl shadow-md bg-white"
            >
              <div className="col-span-1 text-center font-bold text-gray-400">
                {index + 1}
              </div>

              <div className="col-span-2 font-semibold text-gray-800">
                {r.nombres} {r.apellidos}
              </div>

              <div className="col-span-2 text-gray-600">
                {r.fecha}
              </div>

              <div className="col-span-3 text-gray-600">
                {r.direccion}
              </div>

              {/* 🔥 BARRA DE PAGO */}
              <div className="col-span-2">
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-green-500 h-3"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="text-xs mt-1">
                  S/ {totalPaid} / S/ {r.total_price || 0}
                </p>
              </div>

              <div className="col-span-1 text-center">
                <div className={`px-2 py-1 rounded-full text-xs ${getStatusStyles(r.status)}`}>
                  {r.status}
                </div>
              </div>

              <div className="col-span-1 flex justify-center gap-2">

                <button
                  onClick={() => setSelected(r)}
                  className="bg-indigo-500 text-white p-2 rounded"
                >
                  <FaEye size={14} />
                </button>

                <button
                  onClick={() => deleteReservation(r.id)}
                  className="bg-red-500 text-white p-2 rounded"
                >
                  <FaTrash size={14} />
                </button>

              </div>

            </div>
          )
        })}
      </div>

      {selected && (
        <ReservationModal
          reservation={selected}
          onClose={() => setSelected(null)}
        />
      )}

    </div>
  )
}