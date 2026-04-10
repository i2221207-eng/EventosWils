'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { isAdmin, logout } from '@/lib/auth'

export default function Sidebar() {
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    setAdmin(isAdmin())
  }, [])

  return (
    <aside className="w-64 bg-white shadow h-screen p-4">
      <h2 className="text-xl font-bold mb-6">WILS</h2>

      <nav className="space-y-3">
        <Link href="/dashboard" className="block hover:text-blue-600">
          🏠 Dashboard
        </Link>

        <Link href="/calendar" className="block hover:text-blue-600">
          📆 Calendario
        </Link>

        {admin && (
          <>
            <Link
              href="/admin/dashboard"
              className="block hover:text-blue-600"
            >
              🧑‍💼 Admin
            </Link>

            <Link
              href="/admin/reservations"
              className="block hover:text-blue-600"
            >
              📋 Reservas
            </Link>
          </>
        )}

        <button
          onClick={logout}
          className="text-red-500 mt-6"
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  )
}
