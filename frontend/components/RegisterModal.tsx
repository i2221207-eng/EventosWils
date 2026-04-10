'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { apiFetch } from '@/lib/api'

interface Props {
  isOpen: boolean
  onClose: () => void
  switchToLogin: () => void
}

export default function RegisterModal({
  isOpen,
  onClose,
  switchToLogin
}: Props) {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleRegister = async () => {
    try {
      setLoading(true)

      await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ name, email, password })
      })

      alert('Cuenta creada correctamente')
      onClose()
      router.push('/dashboard')

    } catch (error: any) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Crear cuenta
        </h2>

        <input
          placeholder="Nombre completo"
          className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Correo electrónico"
          className="w-full mb-3 p-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-3 border rounded-xl focus:ring-2 focus:ring-orange-500"
          onChange={e => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Creando cuenta...' : 'Crear cuenta'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={switchToLogin}
            className="text-orange-600 font-semibold hover:underline"
          >
            Inicia sesión
          </button>
        </p>

      </div>
    </div>
  )
}
