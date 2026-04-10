'use client'

interface ReservationModalProps {
  reservation: any
  onClose: () => void
}

export default function ReservationModal({
  reservation,
  onClose
}: ReservationModalProps) {

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10">

        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Detalle de Reserva
        </h2>

        <div className="space-y-3 text-gray-700">

          <p><strong>Cliente:</strong> {reservation.nombres} {reservation.apellidos}</p>
          <p><strong>DNI:</strong> {reservation.dni}</p>
          <p><strong>Teléfono:</strong> {reservation.telefono}</p>
          <p><strong>Email:</strong> {reservation.email}</p>
          <p><strong>Fecha:</strong> {reservation.fecha}</p>
          <p><strong>Dirección:</strong> {reservation.direccion}</p>
          <p><strong>Estado:</strong> {reservation.status}</p>

        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 px-6 py-3 rounded-xl"
          >
            Cerrar
          </button>
        </div>

      </div>
    </div>
  )
}