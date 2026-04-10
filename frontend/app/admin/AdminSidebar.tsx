'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, LayoutDashboard, Image, ClipboardList, Calendar } from 'lucide-react'

export default function AdminSidebar() {

  const [open, setOpen] = useState(false)

  return (
    <>
      {/* BOTÓN MENU */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-5 left-5 z-50 bg-blue-700 text-white p-2 rounded-lg shadow-lg hover:bg-blue-800"
      >
        <Menu size={22} />
      </button>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-800 to-blue-700 text-white p-6 z-50 transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}`}
      >

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold">Admin Panel</h2>
          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* NAV */}
        <nav className="space-y-3">

          <Link
            href="/admin/dashboard"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition"
            onClick={() => setOpen(false)}
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>

          <Link
            href="/admin/decorations"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition"
            onClick={() => setOpen(false)}
          >
            <Image size={18} />
            Decoraciones
          </Link>

          <Link
            href="/admin/reservations"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition"
            onClick={() => setOpen(false)}
          >
            <ClipboardList size={18} />
            Reservas
          </Link>

          <Link
            href="/admin/calendar"
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-blue-600 transition"
            onClick={() => setOpen(false)}
          >
            <Calendar size={18} />
            Calendario
          </Link>

        </nav>

      </aside>
    </>
  )
}