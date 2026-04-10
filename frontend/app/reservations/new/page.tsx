'use client'

import { useState } from 'react'
import { apiFetch } from '@/lib/api'
import { useRouter } from 'next/navigation'

export default function NewReservation() {
  const [date, setDate] = useState('')
  const [decorations, setDecorations] = useState<number[]>([])
  const router = useRouter()

  const submit = async () => {
    await apiFetch('/reservations', {
      method: 'POST',
      body: JSON.stringify({
        date,
        decorationIds: decorations
      })
    })

    router.push('/dashboard')
  }

  return (
    <div>
      <h1>Nueva Reserva</h1>

      <input type="date" onChange={e => setDate(e.target.value)} />

      <input
        placeholder="IDs decoraciones (1,2)"
        onChange={e =>
          setDecorations(e.target.value.split(',').map(Number))
        }
      />

      <button onClick={submit}>Reservar</button>
    </div>
  )
}
