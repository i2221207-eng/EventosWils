'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    Culqi: any
    culqi: any
  }
}

export default function PagoPage({ params }: { params: { id: string } }) {

  const [ready, setReady] = useState(false)

  useEffect(() => {

    const waitCulqi = setInterval(() => {

      if (window.Culqi) {

        const key = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY

        if (!key) {
          alert("No se cargó la clave pública de Culqi")
          return
        }

        window.Culqi.publicKey = key

        setReady(true)
        clearInterval(waitCulqi)

      }

    }, 300)

    window.culqi = async function () {

      if (window.Culqi.token) {

        const token = window.Culqi.token.id
        const email = window.Culqi.token.email || "cliente@demo.com"

        try {

          const res = await fetch('http://localhost:4000/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              token,
              email,
              amount: 50000, // 🔥 IMPORTANTE
              reservation_id: params.id
            })
          })

          const data = await res.json()

          console.log(data)

          if (!res.ok) {
            alert(data.message || 'Error en el pago')
            return
          }

          alert('Pago realizado correctamente 🎉')
          window.location.href = '/'

        } catch (error) {

          console.error(error)
          alert('Error registrando pago')

        }

      }

      if (window.Culqi.error) {
        console.log(window.Culqi.error)
        alert(window.Culqi.error.user_message)
      }

    }

  }, [params.id])

  const pagar = () => {

    if (!window.Culqi) {
      alert('Culqi no cargó todavía')
      return
    }

    window.Culqi.settings({
      title: 'Reserva',
      currency: 'PEN',
      amount: 50000
    })

    window.Culqi.open()

  }

  return (

    <div className="flex items-center justify-center h-screen">

      <button
        onClick={pagar}
        disabled={!ready}
        className="bg-purple-600 text-white px-8 py-4 rounded-xl disabled:bg-gray-400"
      >
        Pagar con Culqi
      </button>

    </div>

  )
}