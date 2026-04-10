'use client'

import { FaFacebookF, FaInstagram, FaWhatsapp, FaTiktok } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-blue-100 text-gray-800 mt-20">

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* EMPRESA */}
        <div>
          <h2 className="text-xl font-bold mb-4">
            Eventos Wils
          </h2>

          <p className="text-sm leading-relaxed">
            Especialistas en decoración de eventos sociales y corporativos.
          </p>
        </div>

        {/* CONTACTO */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Contacto
          </h3>

          <ul className="space-y-2 text-sm">
            <li>📍 Jauja, Junín - Perú</li>
            <li>📞 +51 987 654 321</li>
            <li>✉️ eventoswils@gmail.com</li>
          </ul>
        </div>

        {/* REDES */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Síguenos
          </h3>

          <div className="flex gap-4">

            <a className="bg-white p-3 rounded-full shadow hover:scale-110 transition">
              <FaFacebookF />
            </a>

            <a className="bg-white p-3 rounded-full shadow hover:scale-110 transition">
              <FaInstagram />
            </a>

            <a className="bg-white p-3 rounded-full shadow hover:scale-110 transition">
              <FaWhatsapp />
            </a>

            <a className="bg-white p-3 rounded-full shadow hover:scale-110 transition">
              <FaTiktok />
            </a>

          </div>
        </div>

      </div>

      <div className="border-t border-blue-200 text-center py-4 text-sm">
        © {new Date().getFullYear()} Eventos Wils
      </div>

    </footer>
  )
}