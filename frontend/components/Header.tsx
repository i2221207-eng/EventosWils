'use client'

import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import LoginModal from './LoginModal'
import RegisterModal from './RegisterModal'
import Link from 'next/link'

const navLinks = [
  
  { label: 'Mis reservas', href: '/mis-reservas' }
]

export default function Header() {

  const [authModal, setAuthModal] =
    useState<'login' | 'register' | null>(null)

  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false)

  return (
    <>

      <header className="sticky top-0 z-40 border-b border-purple-100 bg-white/95 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          {/* LOGO */}
          <Link href="/" className="text-2xl font-bold text-purple-700">
            Wils
          </Link>

          {/* NAV DESKTOP */}
          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map(link => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-slate-700 transition hover:text-purple-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* BOTONES */}
          <div className="hidden items-center gap-3 md:flex">

            <button
              onClick={() => setAuthModal('login')}
              className="rounded-xl border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700 transition hover:bg-purple-50"
            >
              Iniciar sesión
            </button>

            <Link
              href="/catalogo"
              className="rounded-xl bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-purple-700"
            >
              Reservar ahora
            </Link>

          </div>

          {/* MOBILE BTN */}
          <button
            onClick={() =>
              setMobileMenuOpen(prev => !prev)
            }
            className="rounded-lg border border-purple-200 p-2 text-purple-700 md:hidden"
          >
            {mobileMenuOpen
              ? <X size={20} />
              : <Menu size={20} />
            }
          </button>

        </div>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (

          <div className="space-y-4 border-t border-purple-100 bg-white px-4 py-4 md:hidden">

            <nav className="flex flex-col gap-3">
              {navLinks.map(link => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-medium text-slate-700"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2">

              <button
                onClick={() => {
                  setAuthModal('login')
                  setMobileMenuOpen(false)
                }}
                className="rounded-xl border border-purple-200 px-4 py-2 text-sm font-semibold text-purple-700"
              >
                Iniciar sesión
              </button>

              <Link
                href="/catalogo"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-purple-600 px-4 py-2 text-center text-sm font-semibold text-white"
              >
                Reservar ahora
              </Link>

            </div>

          </div>

        )}

      </header>

      {/* MODALES */}
      <LoginModal
        isOpen={authModal === 'login'}
        onClose={() => setAuthModal(null)}
        switchToRegister={() => setAuthModal('register')}
      />

      <RegisterModal
        isOpen={authModal === 'register'}
        onClose={() => setAuthModal(null)}
        switchToLogin={() => setAuthModal('login')}
      />

    </>
  )

}