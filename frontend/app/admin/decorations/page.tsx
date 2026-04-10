'use client'

import { useEffect, useState, ChangeEvent } from "react"
import ImagesModal from "./components/ImagesModal"
import { FaEdit, FaTrash, FaEye } from "react-icons/fa"

interface Decoration {
  id: number
  name: string
  description: string
  price: string
  category: string
  active: number
}

interface FormType {
  name: string
  description: string
  price: string
  category: string
  active: boolean
}

export default function DecorationsPage() {

  const [decorations, setDecorations] = useState<Decoration[]>([])
  const [showCreate, setShowCreate] = useState(false)
  const [editing, setEditing] = useState<Decoration | null>(null)
  const [viewImages, setViewImages] = useState<Decoration | null>(null)

  const getToken = () => localStorage.getItem("token")

  useEffect(() => {
    fetch("http://localhost:4000/api/decorations", {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
      .then(res => res.json())
      .then(data => setDecorations(data))
  }, [])

  const handleDelete = async (id: number) => {
    if (!confirm("¿Seguro que deseas eliminar esta decoración?")) return

    await fetch(`http://localhost:4000/api/decorations/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` }
    })

    setDecorations(prev => prev.filter(d => d.id !== id))
  }

  const handleCreate = async (form: FormType, images: FileList | null) => {

    const res = await fetch("http://localhost:4000/api/decorations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`
      },
      body: JSON.stringify(form)
    })

    const newDecoration = await res.json()

    if (images && images.length > 0) {
      const formData = new FormData()
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i])
      }

      await fetch(
        `http://localhost:4000/api/decorations/${newDecoration.id}/images`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${getToken()}` },
          body: formData
        }
      )
    }

    setDecorations(prev => [...prev, newDecoration])
    setShowCreate(false)
  }

  const handleUpdate = async (updated: Decoration) => {

    const res = await fetch(
      `http://localhost:4000/api/decorations/${updated.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`
        },
        body: JSON.stringify(updated)
      }
    )

    const data = await res.json()

    setDecorations(prev =>
      prev.map(d => d.id === data.id ? data : d)
    )

    setEditing(null)
  }

  return (
    <div className="p-12 bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen">

      <div className="flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Gestión de Decoraciones
        </h1>

        <button
          onClick={() => setShowCreate(true)}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition"
        >
          + Nueva Decoración
        </button>
      </div>

      {/* HEADER MEJORADO */}
<div className="grid grid-cols-12 px-8 mb-6 text-lg font-bold text-gray-900 uppercase tracking-wide">

  <div className="col-span-1 text-center"></div>
  <div className="col-span-3">Nombre</div>
  <div className="col-span-2">Precio</div>
  <div className="col-span-2">Categoría</div>
  <div className="col-span-2 text-center">Estado</div>
  <div className="col-span-2 text-center">Acciones</div>
</div>


      <div className="space-y-6">

  {decorations.map((dec, index) => {

    const isInactive = !dec.active

    return (
      <div
        key={dec.id}
        className={`
          grid grid-cols-12 items-center
          px-8 py-6 rounded-3xl
          shadow-lg hover:shadow-2xl
          transition-all duration-300 hover:scale-[1.01]
          ${isInactive
            ? "bg-gradient-to-r from-red-100 to-red-200"
            : index % 2 === 0
              ? "bg-white"
              : "bg-gray-50"}
        `}
      >

        {/* NUMERO */}
        <div className="col-span-1 text-center text-3xl font-bold text-gray-300">
          {index + 1}
        </div>

        {/* NOMBRE */}
        <div className="col-span-3 text-xl font-semibold text-gray-800">
          {dec.name}
        </div>

        {/* PRECIO */}
        <div className="col-span-2 text-lg text-gray-700 font-medium">
          S/ {dec.price}
        </div>

        {/* CATEGORÍA */}
        <div className="col-span-2 text-lg text-gray-600">
          {dec.category}
        </div>

        {/* ESTADO */}
        <div className="col-span-2 flex justify-center">
          <span
            className={`
              px-5 py-2 rounded-full text-sm font-semibold
              ${dec.active
                ? "bg-green-200 text-green-800"
                : "bg-red-300 text-red-900"}
            `}
          >
            {dec.active ? "Activo" : "Inactivo"}
          </span>
        </div>

        {/* ACCIONES */}
        <div className="col-span-2 flex justify-center gap-4">

          <button
            onClick={() => setViewImages(dec)}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-xl shadow transition hover:scale-110"
          >
            <FaEye size={16} />
          </button>

          <button
            onClick={() => setEditing(dec)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-xl shadow transition hover:scale-110"
          >
            <FaEdit size={16} />
          </button>

          <button
            onClick={() => handleDelete(dec.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-xl shadow transition hover:scale-110"
          >
            <FaTrash size={16} />
          </button>

        </div>

      </div>
    )
  })}

</div>


      {showCreate && (
        <CreateModal
          onClose={() => setShowCreate(false)}
          onSave={handleCreate}
        />
      )}

      {editing && (
        <EditModal
          decoration={editing}
          onClose={() => setEditing(null)}
          onSave={handleUpdate}
        />
      )}

      {viewImages && (
        <ImagesModal
          decoration={viewImages}
          onClose={() => setViewImages(null)}
        />
      )}

    </div>
  )
}





// ================= CREATE MODAL =================

function CreateModal({ onClose, onSave }: any) {

  const [form, setForm] = useState<FormType>({
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Nueva Decoración
        </h2>

        <div className="space-y-5">

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Nombre
            </label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Precio
            </label>
            <input
              type="number"
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Categoría
            </label>
            <input
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Estado
            </label>
            <select
              value={form.active ? "true" : "false"}
              className="w-full border p-3 rounded-xl"
              onChange={(e) =>
                setForm({
                  ...form,
                  active: e.target.value === "true"
                })
              }
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Descripción
            </label>
            <textarea
              rows={3}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-purple-400 outline-none"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Upload moderno igual que Edit */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-600">
              Agregar imágenes
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-purple-300 rounded-2xl p-6 cursor-pointer hover:bg-purple-50 transition">
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

            {preview.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {preview.map((img, index) => (
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

        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button
            onClick={() => onSave(form, images)}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Guardar
          </button>
        </div>

      </div>
    </div>
  )
}



// ================= EDIT MODAL =================

function EditModal({ decoration, onClose, onSave }: any) {

  const [form, setForm] = useState<FormType>({
    name: decoration.name,
    description: decoration.description,
    price: decoration.price,
    category: decoration.category,
    active: Boolean(decoration.active)
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

  const handleUpdate = async () => {

    // 1️⃣ Actualizar datos (JSON)
    const res = await fetch(
      `http://localhost:4000/api/decorations/${decoration.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form)
      }
    )

    const updated = await res.json()

    // 2️⃣ Subir imágenes nuevas si existen
    if (images && images.length > 0) {

      const formData = new FormData()

      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i])
      }

      await fetch(
  `http://localhost:4000/api/decorations/${decoration.id}/images`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    },
    body: formData
  }
)

    }

    onSave(updated)
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl w-full max-w-xl shadow-2xl">

        <h2 className="text-2xl font-bold mb-6">
          Editar Decoración
        </h2>

        <div className="space-y-5">

          {/* Nombre */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Nombre
            </label>
            <input
              value={form.name}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
            />
          </div>

          {/* Precio */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Precio
            </label>
            <input
              type="number"
              value={form.price}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) =>
                setForm({ ...form, price: e.target.value })
              }
            />
          </div>

          {/* Categoría */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Categoría
            </label>
            <input
              value={form.category}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />
          </div>

          {/* Estado */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Estado
            </label>
            <select
              value={form.active ? "true" : "false"}
              className="w-full border p-3 rounded-xl"
              onChange={(e) =>
                setForm({
                  ...form,
                  active: e.target.value === "true"
                })
              }
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-600">
              Descripción
            </label>
            <textarea
              value={form.description}
              rows={3}
              className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />
          </div>

          {/* Upload bonito */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-600">
              Agregar nuevas imágenes
            </label>

            <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-300 rounded-2xl p-6 cursor-pointer hover:bg-blue-50 transition">
              <span className="text-blue-600 font-medium">
                Haz clic para seleccionar imágenes
              </span>

              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>

            {preview.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {preview.map((img, index) => (
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

        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="bg-gray-300 px-5 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Cancelar
          </button>

          <button
            onClick={handleUpdate}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Actualizar
          </button>
        </div>

      </div>
    </div>
  )
}
