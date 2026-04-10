'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Search } from 'lucide-react'

const API_URL = 'http://localhost:4000/api'

export default function MisReservasPage() {

  const router = useRouter()

  const [dni, setDni] = useState('')
  const [reservations, setReservations] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const buscarReservas = async () => {

    if (dni.length !== 8) {
      alert('Ingrese un DNI válido')
      return
    }

    try {

      setLoading(true)

      const res = await fetch(`${API_URL}/reservations/dni/${dni}`)
      const data = await res.json()

      if (!res.ok) {
        alert(data.message || 'Error')
        return
      }

      setReservations(data)

    } catch {
      alert('Error al buscar reservas')
    } finally {
      setLoading(false)
    }

  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pagado':
        return 'bg-green-100 text-green-700'
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-700'
      case 'cancelado':
        return 'bg-red-100 text-red-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">

      <div className="max-w-5xl mx-auto">

        {/* BOTÓN VOLVER */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-purple-700 hover:text-purple-900"
        >
          <ArrowLeft size={18} />
          Volver
        </button>

        <div className="bg-white p-8 rounded-3xl shadow-lg">

          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Mis Reservas
          </h1>

          {/* BUSCADOR */}
          <div className="flex gap-3 mb-8">

            <div className="flex items-center border rounded-xl px-3 flex-1 focus-within:ring-2 focus-within:ring-purple-400">
              <Search size={18} className="text-gray-400" />
              <input
                placeholder="Ingrese su DNI"
                value={dni}
                onChange={(e) => setDni(e.target.value)}
                className="w-full p-3 outline-none"
              />
            </div>

            <button
              onClick={buscarReservas}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 rounded-xl transition"
            >
              {loading ? 'Buscando...' : 'Buscar'}
            </button>

          </div>

          {/* RESULTADOS */}
          <div className="space-y-5">

            {reservations.length === 0 && !loading && (
              <div className="text-center text-gray-500 py-10">
                No se encontraron reservas
              </div>
            )}

            {reservations.map((r, i) => (

              <div
                key={i}
                className="bg-gray-50 border rounded-2xl p-6 shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-3">

                  <h2 className="font-bold text-lg text-gray-800">
                    {r.nombres} {r.apellidos}
                  </h2>

                  <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(r.status)}`}>
                    {r.status}
                  </span>

                </div>

                <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">

                  <p><b>DNI:</b> {r.dni}</p>
                  <p><b>Fecha:</b> {r.fecha}</p>
                  <p><b>Teléfono:</b> {r.telefono}</p>
                  <p><b>Email:</b> {r.email}</p>

                </div>

                <p className="mt-3 text-gray-700">
                  <b>Dirección:</b> {r.direccion}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  )
}