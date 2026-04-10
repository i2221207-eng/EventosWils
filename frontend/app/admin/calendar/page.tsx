'use client'

import { useEffect, useState } from 'react'
import { apiFetch } from '@/lib/api'
import Calendar from '@/components/Calendar'

export default function AdminCalendar() {
  const [events, setEvents] = useState([])

  useEffect(() => {
    apiFetch('/reservations').then(res => {
      setEvents(
        res.map((r: any) => ({
          title: r.User?.name || 'Reserva',
          date: r.date
        }))
      )
    })
  }, [])

  return (
    <div>
      <h1>Calendario Admin</h1>
      <Calendar events={events} />
    </div>
  )
}
