'use client'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

type Props = {
  events: any[]
}

export default function Calendar({ events }: { events: any[] }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
        height="auto"
      />
    </div>
  )
}
