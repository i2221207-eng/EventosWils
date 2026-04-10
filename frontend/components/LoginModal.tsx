'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { FcGoogle } from 'react-icons/fc'
import { FaFacebookF } from 'react-icons/fa'
import { signIn } from "next-auth/react"
import { apiFetch } from '@/lib/api'
import { saveAuth, getUser } from '@/lib/auth'

interface Props {
  isOpen: boolean
  onClose: () => void
  switchToRegister: () => void
}

export default function LoginModal({
  isOpen,
  onClose,
  switchToRegister
}: Props) {

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  if (!isOpen) return null

  const handleLogin = async () => {
  try {
    setLoading(true)

    const data = await apiFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })

    if (!data.token) {
      throw new Error("No se recibió token del servidor")
    }

    // 🔥 Guardar token
    saveAuth(data.token)

    onClose()

    // 🔥 Decodificar usuario desde token
    const user = getUser()

    if (user?.role === 'admin') {
      router.push('/admin')
    } else {
      router.push('/dashboard')
    }

  } catch (error: any) {
    alert(error.message)
  } finally {
    setLoading(false)
  }
}


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 backdrop-blur-sm">

      <div className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl relative animate-fadeIn">

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Bienvenido
        </h2>

        <p className="text-center text-gray-500 mb-6">
          Inicia sesión para continuar
        </p>

        {/* Email */}
        <input
          type="email"
          placeholder="Correo electrónico"
          className="w-full mb-3 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={e => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full mb-4 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
          onChange={e => setPassword(e.target.value)}
        />

        {/* Login button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? 'Ingresando...' : 'Iniciar sesión'}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-gray-400 text-sm">o inicia sesión con</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Social icons horizontal */}
        <div className="flex justify-center gap-6 mb-4">

          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="w-12 h-12 flex items-center justify-center rounded-full border shadow-sm hover:scale-110 transition"
          >
            <FcGoogle size={24} />
          </button>

          <button
            onClick={() => signIn("facebook", { callbackUrl: "/" })}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white shadow-sm hover:scale-110 transition"
          >
            <FaFacebookF size={18} />
          </button>

        </div>

        {/* Register link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tienes cuenta?{' '}
          <button
            onClick={switchToRegister}
            className="text-purple-600 font-semibold hover:underline"
          >
            Regístrate
          </button>
        </p>

      </div>
    </div>
  )
}
