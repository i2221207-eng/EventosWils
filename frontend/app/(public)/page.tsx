'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'

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
  category: string
  active: boolean
  images?: DecorationImage[]
}

const API_URL = 'http://localhost:4000/api'
const BACKEND_URL = 'http://localhost:4000'

export default function HomePage() {

  const [decorations, setDecorations] = useState<Decoration[]>([])
  const [selectedDecoration, setSelectedDecoration] = useState<Decoration | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {

    const loadDecorations = async () => {

      try {

        const res = await fetch(`${API_URL}/decorations`)

        if (!res.ok)
          throw new Error('Error al cargar')

        const data = await res.json()

        setDecorations(
          data.filter((d: Decoration) => d.active !== false)
        )

      } catch (err: any) {

        setError(err.message)

      } finally {

        setLoading(false)

      }

    }

    loadDecorations()

  }, [])


  const galleryImages = useMemo(
    () =>
      decorations.flatMap(d => d.images ?? []).slice(0, 6),
    [decorations]
  )


  const getImageUrl = (decoration: Decoration) => {

    const path = decoration.images?.[0]?.image_url

    if (!path) return '/window.svg'

    return path.startsWith('http')
      ? path
      : `${BACKEND_URL}${path}`

  }


  return (

    <main className="bg-gradient-to-b from-purple-50 via-white to-white">

      {/* CATALOGO */}

      <section className="mx-auto max-w-7xl px-4 pt-12 pb-16">

        <h2 className="text-3xl font-bold mb-8">
          Catálogo
        </h2>

        {loading && <p>Cargando...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {decorations.map(decoration => (

            <article
              key={decoration.id}
              className="overflow-hidden rounded-2xl bg-white shadow hover:shadow-lg transition"
            >

              <button
                onClick={() => setSelectedDecoration(decoration)}
                className="block w-full"
              >

                <Image
                  src={getImageUrl(decoration)}
                  alt={decoration.name}
                  width={640}
                  height={420}
                  className="h-56 w-full object-cover"
                  unoptimized
                />

              </button>

              <div className="p-5 space-y-3">

                <h3 className="text-xl font-semibold">
                  {decoration.name}
                </h3>

                <div className="flex justify-between items-center">

                  <span className="text-lg font-bold text-purple-700">
                    S/ {Number(decoration.price).toFixed(2)}
                  </span>

                  <button
                    onClick={() => setSelectedDecoration(decoration)}
                    className="border border-purple-300 text-purple-700 px-3 py-2 rounded-lg hover:bg-purple-50"
                  >
                    Ver detalles
                  </button>

                </div>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* MODAL */}

      {selectedDecoration && (

        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
          onClick={() => setSelectedDecoration(null)}
        >

          <div
            className="bg-white max-w-2xl w-full rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >

            <Image
              src={getImageUrl(selectedDecoration)}
              alt={selectedDecoration.name}
              width={900}
              height={500}
              className="w-full h-64 object-cover"
              unoptimized
            />

            <div className="p-6 space-y-4">

              <h3 className="text-2xl font-bold">
                {selectedDecoration.name}
              </h3>

              <p className="text-gray-600">
                {selectedDecoration.description}
              </p>

              <p className="text-sm text-gray-500">
                Categoría: {selectedDecoration.category}
              </p>

              <div className="flex justify-between items-center pt-4 border-t">

                <span className="text-2xl font-bold text-purple-700">
                  S/ {Number(selectedDecoration.price).toFixed(2)}
                </span>


                {/* LINK checkout */}

                <Link
                  href={`/checkout/${selectedDecoration.id}`}
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700"
                >
                  Pagar
                </Link>


              </div>

            </div>

          </div>

        </div>

      )}

    </main>

  )

}