'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

declare global {
  interface Window {
    Culqi: any
    culqi: any
  }
}

interface DecorationImage {
  id: number
  image_url: string
  is_main: boolean
}

interface Decoration {
  id: number
  name: string
  description: string
  price: number
  images?: DecorationImage[]
}

interface Province {
  id: number
  name: string
}

interface District {
  id: number
  name: string
}

const API_URL = 'http://localhost:4000/api'
const BACKEND_URL = 'http://localhost:4000'

export default function CheckoutPage() {

  const params = useParams()
  const router = useRouter()
  const decorationId = Number(params.decorationId)

  const [decoration, setDecoration] = useState<Decoration | null>(null)
  const [provinces, setProvinces] = useState<Province[]>([])
  const [districts, setDistricts] = useState<District[]>([])
  const [loading, setLoading] = useState(false)
  const [culqiReady, setCulqiReady] = useState(false)
  const [reservationId, setReservationId] = useState<number | null>(null)

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    dni: '',
    phone: '',
    email: '',
    event_date: '',
    province_id: '',
    district_id: '',
    event_address: ''
  })

  function getTomorrowDate() {
    const today = new Date()
    today.setDate(today.getDate() + 1)
    return today.toISOString().split('T')[0]
  }

  useEffect(() => {
    if (decorationId) {
      loadDecoration()
      loadProvinces()
    }
  }, [decorationId])

  useEffect(() => {

    const script = document.createElement('script')
    script.src = 'https://checkout.culqi.com/js/v4'
    script.async = true

    script.onload = () => {

      window.Culqi.publicKey = process.env.NEXT_PUBLIC_CULQI_PUBLIC_KEY
      setCulqiReady(true)

      window.culqi = async () => {

        if (window.Culqi.token) {

          if (!reservationId) {
            alert("No se creó la reserva")
            return
          }

          const token = window.Culqi.token.id
          const email = window.Culqi.token.email || "test@test.com"

          try {

            const precio = Number(decoration?.price)
            const amount = Math.round(precio * 100)

            const res = await fetch(`${API_URL}/payments`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                token,
                email,
                amount,
                reservation_id: reservationId
              })
            })

            const data = await res.json()

            if (res.ok) {
              alert('Pago realizado con éxito')
              router.push('/')
            } else {
              alert(data.message || 'Error registrando pago')
            }

          } catch {
            alert('Error enviando pago al servidor')
          }

        } else if (window.Culqi.error) {
          alert(window.Culqi.error.user_message)
        }

      }

    }

    document.body.appendChild(script)

  }, [reservationId, decoration])

  async function loadDecoration() {
    const res = await fetch(`${API_URL}/decorations/${decorationId}`)
    const data = await res.json()
    setDecoration(data)
  }

  async function loadProvinces() {
    const res = await fetch(`${API_URL}/provinces`)
    const data = await res.json()
    setProvinces(data)
  }

  async function loadDistricts(id: string) {
    try {
      const res = await fetch(`${API_URL}/districts/${id}`)
      const data = await res.json()
      setDistricts(Array.isArray(data) ? data : [])
    } catch {
      setDistricts([])
    }
  }

  function change(e: any) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))

    if (name === 'province_id') {
      loadDistricts(value)
      setForm(prev => ({ ...prev, district_id: '' }))
    }
  }

  function handleDniChange(e: any) {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 8)
      setForm(prev => ({ ...prev, dni: value }))
  }

  function handlePhoneChange(e: any) {
    const value = e.target.value.replace(/\D/g, '')
    if (value.length <= 9)
      setForm(prev => ({ ...prev, phone: value }))
  }

  function isValidEmail(email: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const getImageUrl = () => {

    if (!decoration?.images || decoration.images.length === 0)
      return '/window.svg'

    const mainImage =
      decoration.images.find(img => img.is_main) || decoration.images[0]

    if (!mainImage?.image_url)
      return '/window.svg'

    return mainImage.image_url.startsWith('http')
      ? mainImage.image_url
      : `${BACKEND_URL}${mainImage.image_url}`

  }

  async function buscarDNI() {

    if (form.dni.length !== 8) {
      alert('El DNI debe tener 8 dígitos')
      return
    }

    try {

      setLoading(true)

      const res = await fetch(`${API_URL}/dni/${form.dni}`)
      const data = await res.json()

      if (!data.nombres) {
        alert('DNI no encontrado')
        return
      }

      setForm(prev => ({
        ...prev,
        first_name: data.nombres,
        last_name: `${data.apellidoPaterno} ${data.apellidoMaterno}`
      }))

    } catch {
      alert('Error consultando DNI')
    } finally {
      setLoading(false)
    }

  }

  const formCompleto =
    form.first_name &&
    form.last_name &&
    form.dni.length === 8 &&
    form.phone.length >= 9 &&
    isValidEmail(form.email) &&
    form.event_date &&
    form.province_id &&
    form.district_id &&
    form.event_address

  // 🔥 CORREGIDO AQUÍ
  const irAPago = async () => {

    if (!formCompleto) {
      alert('Complete todos los campos correctamente')
      return
    }

    if (!culqiReady) {
      alert('Culqi aún no está listo.')
      return
    }

    const precio = Number(decoration?.price)

    if (!precio || precio <= 0) {
      alert("Error: precio no válido")
      return
    }

    try {

      setLoading(true)

      // ✅ CREAR RESERVA (igual que Flutter)
      const res = await fetch(`${API_URL}/reservations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          decoration_id: decorationId,
          dni: form.dni,
          nombres: form.first_name,
          apellidos: form.last_name,
          telefono: form.phone,
          email: form.email,
          direccion: form.event_address,
          fecha: form.event_date,
          province_id: form.province_id,
          district_id: form.district_id
        })
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || "Error creando reserva")
        return
      }

      setReservationId(data.id)

      window.Culqi.settings({
        title: 'Reserva Decoración',
        currency: 'PEN',
        description: decoration?.name,
        amount: Math.round(precio * 100)
      })

      window.Culqi.open()

    } catch {
      alert("Error creando reserva")
    } finally {
      setLoading(false)
    }

  }

  if (!decoration)
    return <div className="p-10">Cargando...</div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-10">

        <div className="bg-white p-10 rounded-3xl shadow-xl border">

          <h2 className="text-3xl font-bold mb-8">
            Información de Reserva
          </h2>

          <div className="space-y-5">

            <div className="flex gap-3">
              <input
                placeholder="DNI"
                value={form.dni}
                onChange={handleDniChange}
                maxLength={8}
                className="input-modern"
              />
              <button
                onClick={buscarDNI}
                disabled={loading}
                className="bg-black text-white px-5 rounded-xl"
              >
                {loading ? 'Buscando...' : 'Buscar'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input name="first_name" placeholder="Nombres" value={form.first_name} onChange={change} className="input-modern" />
              <input name="last_name" placeholder="Apellidos" value={form.last_name} onChange={change} className="input-modern" />
            </div>

            <input placeholder="Teléfono" value={form.phone} onChange={handlePhoneChange} className="input-modern" />
            <input placeholder="Correo" value={form.email} onChange={change} name="email" className="input-modern" />

            <input type="date" name="event_date" value={form.event_date} onChange={change} min={getTomorrowDate()} className="input-modern" />

            <select name="province_id" value={form.province_id} onChange={change} className="input-modern">
              <option value="">Seleccione provincia</option>
              {provinces.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </select>

            <select name="district_id" value={form.district_id} onChange={change} className="input-modern">
              <option value="">Seleccione distrito</option>
              {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>

            <input name="event_address" placeholder="Dirección del evento" value={form.event_address} onChange={change} className="input-modern" />

            <button
              onClick={irAPago}
              disabled={!formCompleto || loading}
              className="w-full mt-6 bg-purple-600 text-white py-4 rounded-xl disabled:bg-gray-400"
            >
              {loading ? 'Procesando...' : 'Confirmar y Pagar'}
            </button>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border">

          <Image
            src={getImageUrl()}
            alt={decoration.name}
            width={900}
            height={500}
            className="w-full h-72 object-cover"
            unoptimized
          />

          <div className="p-8 space-y-4">

            <h2 className="text-2xl font-bold">{decoration.name}</h2>

            <p className="text-gray-600">{decoration.description}</p>

            <div className="pt-6 border-t">
              <p className="text-sm text-gray-500">Total a pagar</p>
              <p className="text-4xl font-bold text-purple-600">
                S/ {Number(decoration.price).toFixed(2)}
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  )
}