'use client'

import { useState, ChangeEvent } from "react"

interface FormDataType {
  name: string
  description: string
  price: string
  category: string
  active: boolean
}

interface Props {
  onClose: () => void
  onSave: (form: FormDataType, images: FileList | null) => void
}

export default function CreateDecorationModal({ onClose, onSave }: Props) {

  const [form, setForm] = useState<FormDataType>({
    name: "",
    description: "",
    price: "",
    category: "",
    active: true
  })

  const [images, setImages] = useState<FileList | null>(null)
  const [preview, setPreview] = useState<string[]>([])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    setImages(files)

    const previews: string[] = []

    for (let i = 0; i < files.length; i++) {
      previews.push(URL.createObjectURL(files[i]))
    }

    setPreview(previews)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl p-10 rounded-3xl shadow-2xl">

        <h2 className="text-2xl font-bold mb-8">
          Nueva Decoración
        </h2>

        <div className="grid grid-cols-2 gap-6">

          {/* Nombre */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Nombre
            </label>
            <input
              value={form.name}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Precio
            </label>
            <input
              type="number"
              value={form.price}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Categoría
            </label>
            <input
              value={form.category}
              className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>

          {/* Activo */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-600">
              Estado
            </label>
            <select
              value={form.active ? "true" : "false"}
              className="w-full p-3 border rounded-xl"
              onChange={(e) =>
                setForm({ ...form, active: e.target.value === "true" })
              }
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

        </div>

        {/* Descripción */}
        <div className="mt-6">
          <label className="block mb-2 text-sm font-semibold text-gray-600">
            Descripción
          </label>
          <textarea
            value={form.description}
            className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
            rows={3}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>

        {/* Upload moderno */}
        <div className="mt-6">
          <label className="block mb-3 text-sm font-semibold text-gray-600">
            Imágenes
          </label>

          <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-2xl p-8 cursor-pointer hover:bg-purple-50 transition">
            <span className="text-purple-600 font-medium">
              Haz clic para seleccionar imágenes
            </span>

            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
          </label>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {preview.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt="preview"
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 rounded-xl hover:bg-gray-300 transition"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(form, images)}
            className="px-6 py-2 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition"
          >
            Guardar
          </button>
        </div>

      </div>
    </div>
  )
}
