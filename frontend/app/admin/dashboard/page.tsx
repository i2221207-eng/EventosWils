'use client'

import { useEffect, useState } from 'react'
import { isAdmin } from '@/lib/auth'
import { useRouter } from 'next/navigation'
import { Calendar, ClipboardList, Users } from 'lucide-react'

const API_URL = 'http://localhost:4000/api'

export default function AdminDashboard() {

  const router = useRouter()

  const [stats, setStats] = useState({
    totalReservas: 0,
    pendientes: 0,
    pagadas: 0,
    canceladas: 0
  })

  useEffect(() => {
    if (!isAdmin()) {
      router.push('/login')
      return
    }

    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      const res = await fetch(`${API_URL}/reservations`)
      const data = await res.json()

      const total = data.length
      const pendientes = data.filter((r: any) => r.status === 'pendiente').length
      const pagadas = data.filter((r: any) => r.status === 'pagado').length
      const canceladas = data.filter((r: any) => r.status === 'cancelado').length

      setStats({
        totalReservas: total,
        pendientes,
        pagadas,
        canceladas
      })

    } catch (error) {
      console.error('Error cargando dashboard', error)
    }
  }

  const porcentaje = (valor: number) => {
    if (stats.totalReservas === 0) return 0
    return (valor / stats.totalReservas) * 100
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-10">

      <h1 className="text-4xl font-bold mb-10 text-gray-800">
        Panel Administrativo
      </h1>

      {/* CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-2xl shadow">
          <p className="text-gray-500 text-sm">Total Reservas</p>
          <h2 className="text-3xl font-bold">{stats.totalReservas}</h2>
        </div>

        <div className="bg-yellow-100 p-6 rounded-2xl shadow">
          <p className="text-sm">Pendientes</p>
          <h2 className="text-3xl font-bold">{stats.pendientes}</h2>
        </div>

        <div className="bg-green-100 p-6 rounded-2xl shadow">
          <p className="text-sm">Pagadas</p>
          <h2 className="text-3xl font-bold">{stats.pagadas}</h2>
        </div>

        <div className="bg-red-100 p-6 rounded-2xl shadow">
          <p className="text-sm">Canceladas</p>
          <h2 className="text-3xl font-bold">{stats.canceladas}</h2>
        </div>

      </div>

      {/* BARRAS */}
      <div className="bg-white p-8 rounded-3xl shadow mb-10">

        <h2 className="text-xl font-semibold mb-6">
          Estado de Reservas
        </h2>

        {/* Pendientes */}
        <div className="mb-4">
          <p className="text-sm mb-1">Pendientes</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-yellow-400 h-4 rounded-full"
              style={{ width: `${porcentaje(stats.pendientes)}%` }}
            />
          </div>
        </div>

        {/* Pagadas */}
        <div className="mb-4">
          <p className="text-sm mb-1">Pagadas</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-green-500 h-4 rounded-full"
              style={{ width: `${porcentaje(stats.pagadas)}%` }}
            />
          </div>
        </div>

        {/* Canceladas */}
        <div>
          <p className="text-sm mb-1">Canceladas</p>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className="bg-red-500 h-4 rounded-full"
              style={{ width: `${porcentaje(stats.canceladas)}%` }}
            />
          </div>
        </div>

      </div>

      {/* ACCESOS RÁPIDOS */}
      <div className="grid md:grid-cols-3 gap-6">

        <div
          onClick={() => router.push('/admin/calendar')}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition"
        >
          <Calendar className="mb-3 text-purple-600" />
          <h3 className="font-bold text-lg">Calendario</h3>
          <p className="text-sm text-gray-500">
            Visualizar fechas ocupadas
          </p>
        </div>

        <div
          onClick={() => router.push('/admin/reservations')}
          className="bg-white p-6 rounded-2xl shadow hover:shadow-lg cursor-pointer transition"
        >
          <ClipboardList className="mb-3 text-purple-600" />
          <h3 className="font-bold text-lg">Reservas</h3>
          <p className="text-sm text-gray-500">
            Gestionar reservas
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <Users className="mb-3 text-purple-600" />
          <h3 className="font-bold text-lg">Clientes</h3>
          <p className="text-sm text-gray-500">
            Próximamente
          </p>
        </div>

      </div>

    </div>
  )
}